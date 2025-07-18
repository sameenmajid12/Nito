import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
import TagItem from "../common/TagItem";
import ProfileSectionHeader from "../profile/ProfileSectionHeader";
import { View, Text, StyleSheet } from "react-native";
function UserTags({ otherUser }) {
  const { user, updateUser } = useUser();
  const commonsTags = otherUser.tags.filter((tag) => user.tags.includes(tag));
  const otherTags = otherUser.tags.filter((tag) => !user.tags.includes(tag));
  const addTag = (tag) => {
    const tags = user.tags.push(tag);
    updateUser(tags)
  };
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"Tags"}></ProfileSectionHeader>
      <View style={styles.tagsOuterContainer}>
        <View>
          <Text style={styles.subheader}>Common</Text>
          <View style={styles.tagsInnerContainer}>
            {commonsTags.map((commonTag, index) => {
              return <TagItem myTag={true} tag={commonTag} index={index} />;
            })}
          </View>
        </View>
        <View>
          <Text style={styles.subheader}>Other</Text>
          <View style={styles.tagsInnerContainer}>
            {otherTags.map((otherTag, index) => {
              return (
                <TagItem
                  myTag={false}
                  tag={otherTag}
                  addTag={addTag}
                  index={index + commonsTags.length}
                ></TagItem>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    rowGap: 15,
  },
  subheader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    color: colors.textLight,
  },
  tagsOuterContainer: {
    rowGap:10
  },
  tagsInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 5,
    rowGap: 5,
    width: "100%",
  },
});
export default UserTags;
