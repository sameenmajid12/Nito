
import { StyleSheet } from 'react-native';
import colors from './colors'; 

const FONT_FAMILY_REGULAR = 'Nunito-Regular';
const FONT_FAMILY_MEDIUM = 'Nunito-Medium';
const FONT_FAMILY_SEMIBOLD = 'Nunito-SemiBold';
const FONT_FAMILY_BOLD = 'Nunito-Bold';


const FONT_SIZE_XXL = 34; // e.g., "You have a match!"
const FONT_SIZE_XL = 28;  // e.g., Screen titles like "Home", "Profile"
const FONT_SIZE_L = 22;   // e.g., Section headers like "Your Connections"
const FONT_SIZE_M = 18;   // e.g., General headings, important text
const FONT_SIZE_S = 16;   // e.g., Body text, input labels
const FONT_SIZE_XS = 14;  // e.g., Smaller details, captions, placeholder text
const FONT_SIZE_XXS = 12; // e.g., Very small text, timestamps

const LINE_HEIGHT_XXL = FONT_SIZE_XXL * 1.2;
const LINE_HEIGHT_XL = FONT_SIZE_XL * 1.3;
const LINE_HEIGHT_L = FONT_SIZE_L * 1.4;
const LINE_HEIGHT_M = FONT_SIZE_M * 1.5;
const LINE_HEIGHT_S = FONT_SIZE_S * 1.5;
const LINE_HEIGHT_XS = FONT_SIZE_XS * 1.4;
const LINE_HEIGHT_XXS = FONT_SIZE_XXS * 1.3;


const FONT_WEIGHT_REGULAR = '400';
const FONT_WEIGHT_MEDIUM = '500'; 
const FONT_WEIGHT_SEMIBOLD = '600'; 
const FONT_WEIGHT_BOLD = '700';  


const textStyles = StyleSheet.create({
  body: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_S,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: FONT_FAMILY_MEDIUM, 
    fontSize: FONT_SIZE_XS,
    lineHeight: LINE_HEIGHT_XS,
    color: colors.textSecondary,
  },
  placeholder: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_S,
    color: colors.textPlaceholder,
  },
  error: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_XXS,
    lineHeight: LINE_HEIGHT_XXS,
    color: colors.error,
  },

  h1: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_XXL,
    lineHeight: LINE_HEIGHT_XXL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: colors.textPrimary,
  },
  h2: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_XL,
    lineHeight: LINE_HEIGHT_XL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: colors.textPrimary,
  },
  h3: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: FONT_SIZE_L,
    lineHeight: LINE_HEIGHT_L,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    color: colors.textPrimary,
  },
  h4: {
    fontFamily: FONT_FAMILY_MEDIUM, 
    fontSize: FONT_SIZE_M,
    lineHeight: LINE_HEIGHT_M,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: colors.textPrimary,
  },

  buttonTextPrimary: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_M,
    fontWeight: FONT_WEIGHT_BOLD,
    color: colors.white,
  },
  buttonTextSecondary: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_M,
    fontWeight: FONT_WEIGHT_BOLD,
    color: colors.purple,
  },
  link: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_XS,
    color: colors.purple,
    textDecorationLine: 'underline',
  },
  smallText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_XXS,
    lineHeight: LINE_HEIGHT_XXS,
    color: colors.textLight,
  },
  chatBubbleText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_S,
    color: colors.white,
  },
  chatBubbleTextReceived: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_S,
    color: colors.textPrimary,
  },
});

export {
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM,
  FONT_FAMILY_SEMIBOLD,
  FONT_FAMILY_BOLD,
  FONT_SIZE_XXL,
  FONT_SIZE_XL,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  LINE_HEIGHT_XXL,
  LINE_HEIGHT_XL,
  LINE_HEIGHT_L,
  LINE_HEIGHT_M,
  LINE_HEIGHT_S,
  LINE_HEIGHT_XS,
  LINE_HEIGHT_XXS,
  FONT_WEIGHT_REGULAR,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_SEMIBOLD,
  FONT_WEIGHT_BOLD,
  textStyles,
};