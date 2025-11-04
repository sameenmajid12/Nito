
import { StyleSheet,} from 'react-native';
import colors from './colors'; 
import { scaleSize } from './scale';

const FONT_FAMILY_REGULAR = 'Nunito-Regular';
const FONT_FAMILY_MEDIUM = 'Nunito-Medium';
const FONT_FAMILY_SEMIBOLD = 'Nunito-SemiBold';
const FONT_FAMILY_BOLD = 'Nunito-Bold';

const FONT_SIZE_XXL = scaleSize(32);
const FONT_SIZE_XL = scaleSize(24);
const FONT_SIZE_L = scaleSize(20);
const FONT_SIZE_M = scaleSize(16);
const FONT_SIZE_S = scaleSize(14);
const FONT_SIZE_XS = scaleSize(12);
const FONT_SIZE_XXS = scaleSize(10);

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
  inputLabel: {
    fontFamily: FONT_FAMILY_SEMIBOLD, 
    fontSize: FONT_SIZE_S,
    lineHeight: LINE_HEIGHT_XS,
    color: colors.textPrimary,
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
  },
  h2: {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_XL,
    lineHeight: LINE_HEIGHT_XL,
    fontWeight: FONT_WEIGHT_BOLD,
  },
  h3: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: FONT_SIZE_L,
    lineHeight: LINE_HEIGHT_L,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    color:colors.textLight
  },
  h4: {
    fontFamily: FONT_FAMILY_MEDIUM, 
    fontSize: FONT_SIZE_M,
    lineHeight: LINE_HEIGHT_M,
    fontWeight: FONT_WEIGHT_MEDIUM,
  },

  buttonTextPrimary: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: FONT_SIZE_S,
    fontWeight: FONT_WEIGHT_BOLD,
    color: colors.white,
  },
  buttonTextSecondary: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: FONT_SIZE_S,
    fontWeight: FONT_FAMILY_MEDIUM,
    color: colors.primaryDark,
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