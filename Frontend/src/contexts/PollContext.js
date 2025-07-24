import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
import axios from "axios";

const PollContext = createContext();

export const PollProvider = ({ children }) => {
  const [poll, setPoll] = useState(null);
  const [isLoadingPoll, setIsLoadingPoll] = useState(true);
  const checkIfVoted = (user) => {
    return user.votedPolls?.some((v) => v.poll === poll?._id);
  };
  const getVoteAnswer = (user) => {
    const answerOptionNum = user.votedPolls.find(
      (v) => v.poll === poll?._id
    ).selectedOptionNum;
    const answerData = poll.options[answerOptionNum].text;
    return { answerOptionNum, answerData };
  };
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dailypoll`);
        setPoll(response.data.poll);
      } catch (e) {
      } finally {
        setIsLoadingPoll(false);
      }
    };
    fetchPoll();
  }, []);
  return (
    <PollContext.Provider
      value={{ poll, isLoadingPoll, setPoll, checkIfVoted, getVoteAnswer }}
    >
      {children}
    </PollContext.Provider>
  );
};
export const usePoll = () => useContext(PollContext);
