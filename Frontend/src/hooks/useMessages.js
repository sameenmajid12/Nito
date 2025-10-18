import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@env";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useSocket } from "../contexts/SocketContext";
import { Animated, Keyboard } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useAlert } from "../contexts/AlertContext";
import * as Clipboard from 'expo-clipboard';
import { File, Directory, Paths } from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { useImageCache } from "../contexts/MessageImageContext";
function useMessages(conversation) {
  const { token } = useAuth();
  const { user, setUser } = useUser();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [newMessageImage, setNewMessageImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addAlert } = useAlert();
  const { getUrl } = useImageCache();
  const [newMessageImageDimensions, setNewMessageImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const otherUser =
    conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1;
  const getMessages = async (before) => {
    if (before) {
      setIsLoadingMore(true);
    } else {
      setIsLoadingInitial(true);
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/conversation/${conversation._id}/messages?before=${before || ""
        }&limit=${20}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const { conversationMessages } = response.data;
        if (conversationMessages.length < 20) {
          setHasMore(false);
        }
        if (before) {
          setMessages((prev) => [...prev, ...conversationMessages]);
        } else {
          setMessages(conversationMessages);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (!before) {
        setIsLoadingInitial(false);
        setHasLoadedInitial(true);
      }
    }
  };
  const loadOlderMessages = () => {
    if (!hasMore || isLoadingMore || messages.length === 0) return;
    const oldestMessageDate = messages[messages.length - 1].createdAt;
    getMessages(oldestMessageDate);
  };
  useEffect(() => {
    if (conversation && !hasLoadedInitial) {
      getMessages();
    }
  }, [conversation, hasLoadedInitial]);

  const copyToClipboard = async (messageText) => {
    await Clipboard.setStringAsync(messageText);
    addAlert("success", "Copied to clipboard");
    closeMessageOptions();
  };
  const optionsBackgroundOpacity = useRef(new Animated.Value(0)).current;
  const openMessageOptions = (message) => {
    setSelectedMessage(message);
    Keyboard.dismiss();
    Animated.timing(optionsBackgroundOpacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true
    }).start()
  }
  const closeMessageOptions = () => {
    Animated.timing(optionsBackgroundOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => setSelectedMessage(null))
  }
  useEffect(() => {
    const getSelectedImage = async () => {
      const imageUrl = await getUrl(selectedMessage._id);
      if (!imageUrl) {
        closeMessageOptions();
        return;
      }
      setSelectedImage(imageUrl);
    }
    if (selectedMessage?.type === "image") {
      getSelectedImage();
    }
  }, [selectedMessage]);
  useEffect(() => {
    const userNum = user._id === conversation.user1._id ? "user1" : "user2";
    if (
      conversation.lastMessage?._id !==
      conversation.lastReadMessages[userNum]?._id &&
      conversation.lastMessage?.sender !== user._id
    ) {
      const data = {
        conversationId: conversation._id,
        receiverId: otherUser._id,
      };
      socket.emit("markConversationAsRead", data);
      setUser((prev) => {
        if (conversation._id === user.currentPair.conversation?._id) {
          return {
            ...prev,
            currentPair: {
              ...prev.currentPair,
              conversation: {
                ...prev.currentPair.conversation,
                lastReadMessages: {
                  ...prev.currentPair.conversation?.lastReadMessages,
                  [userNum]: conversation.lastMessage,
                },
              },
            },
          };
        }
        const conversationIndex = prev.savedConversations.findIndex(
          (convo) => convo._id === conversation._id
        );
        if (conversationIndex === -1) return prev;
        const updatedConversation = {
          ...prev.savedConversations[conversationIndex],
          lastReadMessages: {
            ...prev.savedConversations[conversationIndex].lastReadMessages,
            [userNum]: conversation.lastMessage,
          },
        };
        const newConversations = [...prev.savedConversations];
        newConversations[conversationIndex] = updatedConversation;
        return { ...prev, savedConversations: newConversations };
      });
    }
  }, [messages, conversation]);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (message) => {
      if (message.conversation !== conversation._id) {
        return;
      }
      console.log("Received new message for current chat");

      setMessages((prevMessages) => {
        if (prevMessages.some((m) => m._id === message._id)) {
          return prevMessages;
        }
        const indexToReplace = prevMessages.findIndex(
          (m) => m._id === message.clientId
        );
        if (indexToReplace !== -1) {
          const newMessages = [...prevMessages];
          newMessages[indexToReplace] = message;
          return newMessages;
        } else {
          return [message, ...prevMessages];
        }
      });
    };
    const handleMessageDeletion = (message) => {
      console.log("Receive message deletion for current chat");
      if (message.conversation !== conversation._id) return;
      closeMessageOptions();
      setMessages((prev) => prev.filter((m) => m._id !== message._id));
      addAlert("success", "Message deleted")
    }
    socket.on("deleteMessage", handleMessageDeletion);
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("deleteMessage", handleMessageDeletion);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, conversation]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !user?._id) {
      return;
    }
    const clientId = uuidv4();
    const messageToSend = {
      receiverId: otherUser._id,
      conversationId: conversation._id,
      text: newMessage.trim(),
      clientId,
    };
    const tempMessage = {
      _id: clientId,
      sender: user._id,
      receiver: otherUser._id,
      conversation: conversation._id,
      text: newMessage.trim(),
    };
    socket.emit("sendMessage", messageToSend);
    setMessages((prevMessages) => [tempMessage, ...prevMessages]);
    setNewMessage("");
  };
  const sendImageMessage = async (image, conversationId, receiverId) => {
    try {
      console.log("Sending image message to backend");
      const maxDimensions = 250;
      const scale = maxDimensions / Math.max(image.width, image.height);
      const scaledWidth = scale * image.width;
      const scaledHeight = scale * image.height;
      const formData = new FormData();
      const clientId = uuidv4();

      formData.append("image", {
        name: image.name,
        uri: image.uri,
        type: image.type,
      });
      formData.append(
        "dimensions",
        JSON.stringify({
          width: scaledWidth,
          height: scaledHeight,
        })
      );
      formData.append("receiverId", receiverId);
      formData.append("clientId", clientId);
      const tempMessage = {
        _id: clientId,
        sender: user._id,
        receiver: receiverId,
        conversation: conversationId,
        imageKey: "placeholder",
        imageDimensions: {
          width: scaledWidth,
          height: scaledHeight,
        },
        type: "image",
      };
      setMessages((prev) => [tempMessage, ...prev]);

      await axios.post(
        `${API_BASE_URL}/conversation/${conversationId}/uploadImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  async function saveImageMessage() {
    try {
      if (!selectedImage) return;

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "We need access to your photos to save images.");
        return;
      }

      const destinationDir = new Directory(Paths.cache, "images");
      destinationDir.create({ idempotent: true });
      const filename = `downloadedImage_${Date.now()}.jpg`;
      const destinationFile = new File(Paths.cache, filename);

      const file = await File.downloadFileAsync(selectedImage, destinationFile);

      const asset = await MediaLibrary.createAssetAsync(file.uri);
      await MediaLibrary.createAlbumAsync("MyApp", asset, false);

      addAlert("success", "Image saved");
      closeMessageOptions();
    } catch (err) {
      console.error("Error saving image:", err);
      addAlert("error", "Failed to save image");
      closeMessageOptions();
    }
  }
  const deleteMessage = (messageId) => {
    const receiverId = otherUser._id;
    const userId = user._id;
    const conversationId = conversation._id;
    socket.emit("deleteMessage", { messageId, userId, receiverId, conversationId });
  }

  return {
    messages,
    isLoadingInitial,
    setNewMessage,
    newMessage,
    sendMessage,
    sendImageMessage,
    loadOlderMessages,
    hasLoadedInitial,
    hasMore,
    isLoadingMore,
    setIsLoadingMore,
    newMessageImage,
    setNewMessageImage,
    newMessageImageDimensions,
    setNewMessageImageDimensions,
    deleteMessage,
    selectedMessage,
    openMessageOptions,
    closeMessageOptions,
    optionsBackgroundOpacity,
    copyToClipboard,
    selectedImage,
    setSelectedImage,
    saveImageMessage
  };
}

export default useMessages;
