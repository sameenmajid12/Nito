import { useUser } from "../../contexts/UserContext";
import { colors, FONT_SIZE_S, FONT_SIZE_XS } from "../../styles";
import TagItem from "../common/TagItem";
import ProfileSectionHeader from "../profile/ProfileSectionHeader";
import { View, Text, StyleSheet } from "react-native";
function UserTags({ otherUser }) {
  const { user, updateUser } = useUser();
  const commonTags = otherUser.tags?.filter((tag) => user.tags.includes(tag));
  const otherTags = otherUser.tags?.filter((tag) => !user.tags.includes(tag));
  const hasCommonTags = commonTags?.length > 0;
  const hasOtherTags = otherTags?.length > 0;
  const addTag = (tagToAdd) => {
    const updatedTags = [...user.tags, tagToAdd];
    updateUser({ tags: updatedTags });
  };
  return (
    <View style={styles.sectionWrapper}>
      <ProfileSectionHeader header={"Tags"}></ProfileSectionHeader>
      <View style={styles.tagsContentContainer}>
        {hasCommonTags && (
          <View>
            {hasOtherTags && <Text style={styles.subheader}>Common</Text>/* If there are no other tags only the common tags are seen so we dont need the header */}
            <View style={styles.tagsCategoryContainer}>
              {commonTags.map((commonTag) => {
                return <TagItem key={commonTag} myTag={true} tag={commonTag} />;
              })}
            </View>
          </View>
        )}
        {hasOtherTags && (
          <View>
            {hasCommonTags && <Text style={styles.subheader}>Other</Text>/*Same reason as above*/}
            <View style={styles.tagsCategoryContainer}>
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
  sectionWrapper: {
    rowGap: 15,
  },
  subheader: {
    fontFamily: "Nunito-SemiBold",
    fontSize: FONT_SIZE_S,
    color: colors.textLight,
  },
  tagsContentContainer: {
    rowGap: 10,
  },
  tagsCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 5,
    rowGap: 5,
    width: "100%",
  },
});
export default UserTags;
