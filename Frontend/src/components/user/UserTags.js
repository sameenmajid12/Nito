import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
import TagItem from "../common/TagItem";
import ProfileSectionHeader from "../profile/ProfileSectionHeader";
import { View, Text, StyleSheet } from "react-native";
function UserTags({ otherUser }) {
  const { user, updateUser } = useUser();
  const commonTags = otherUser.tags.filter((tag) => user.tags.includes(tag));
  const otherTags = otherUser.tags.filter((tag) => !user.tags.includes(tag));
  const noCommons = commonTags.length === 0;
  const noOthers = otherTags.length === 0;
  const addTag = (tagToAdd) => {
    const updatedTags = [...user.tags, tagToAdd];
    updateUser({ tags: updatedTags });
  };
  return (
    <View style={styles.mainContainer}>
      <ProfileSectionHeader header={"Tags"}></ProfileSectionHeader>
      <View style={styles.tagsOuterContainer}>
        {!noCommons && (
          <View>
            {!noOthers && <Text style={styles.subheader}>Common</Text>}
            <View style={styles.tagsInnerContainer}>
              {commonTags.map((commonTag) => {
                return <TagItem key={commonTag} myTag={true} tag={commonTag} />;
              })}
            </View>
          </View>
        )}
        {!noOthers && (
          <View>
            {!noCommons && <Text style={styles.subheader}>Other</Text>}
            <View style={styles.tagsInnerContainer}>
              {otherTags.map((otherTag) => {
                return (
                  <TagItem
                    key={otherTag}
                    myTag={false}
                    tag={otherTag}
                    addTag={addTag}
                  ></TagItem>
                );
              })}
            </View>
          </View>
        )}
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
    rowGap: 10,
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
