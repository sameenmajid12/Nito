import { StyleSheet, Text, View } from "react-native";
import FAQItem from "./FAQItem";
import { colors, FONT_SIZE_M } from "../../styles";
const faqs = [
  {
    question: "What is Nito?",
    answer: "Nito is an anonymous texting app exclusively for college students. The goal is to help you meet new people on campus by removing the initial fear of judgment."
  },
  {
    question: "How does Nito work?",
    answer: "After signing up with your school email, you'll be paired with another student who shares similar interests. For the first 30 minutes, your conversation is completely anonymous. After that, both of you have the option to either reveal your identities or skip to the next person."
  },
  {
    question: "What does 'Nito' mean?",
    answer: "Nito is short for 'Incognito,' which highlights the app's focus on anonymous communication."
  },
  {
    question: "Why do I need to use my college email to sign up?",
    answer: "Using a college email is required to verify that all users are students at the same university, creating a safe, exclusive community."
  },
  {
    question: "Is my identity truly anonymous during the 30-minute chat?",
    answer: "Yes. Your information is only shared with another user after you both decide to reveal your identities at the end of a pairing."
  },
  {
    question: "What happens if I reveal myself?",
    answer: "When you reveal yourself, the information you've added to your profile (such as your full name, bio, tags, and profile picture) becomes visible to the person you revealed to."
  },
  {
    question: "Can I un-reveal myself?",
    answer: "You can't 'un-reveal' yourself. However, if you no longer want a person to have access to your information, you can unfriend or block them."
  },
  {
    question: "How often do I get a new pairing?",
    answer: "New pairings are made every 35 minutes. You have 30 minutes to chat, and a 5-minute window is given for both users to either reveal or skip."
  },
  {
    question: "How are pairs determined?",
    answer: "Pairs are determined by your tags. You're more likely to be paired with someone who has similar tags to you."
  },
  {
    question: "Can I choose who I'm paired with?",
    answer: "No, you can't choose who you're paired with."
  },
  {
    question: "What if I don't like my pairing?",
    answer: "If you don't like a pairing, you can either ignore or block that user."
  },
  {
    question: "Can I go back to a previous chat if I skipped it?",
    answer: "When you skip a pairing, the conversation is archived. You can only access archived conversations with a Nito+ premium subscription."
  },
  {
    question: "What is Nito+?",
    answer: "Nito+ is a premium subscription that lets you view archived conversations and go back to reveal yourself if you missed the 5-minute window. We're currently working on new premium features as well!"
  },
];
function FAQList() {
  return (
    <View style={styles.listWrapper}>
      <Text style={styles.header}>FAQs</Text>
      <View style={styles.faqsWrapper}>
        {faqs.map((faq, index) => {
          return (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          );
        })}
        <FAQItem />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontFamily: "Nunito-Bold",
    color: colors.primaryDark,
    fontSize: FONT_SIZE_M,
  },
  faqsWrapper: {
    rowGap: 10,
  },
});
export default FAQList;