 // Fonts types and sizes
import { scaleFont } from './mixins';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'

// FONT FAMILY
export const FONT_FAMILY_REGULAR = Roboto_400Regular;
export const FONT_FAMILY_BOLD = Roboto_900Black;

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '800';

// FONT SIZE
export const FONT_SIZE_18 = 18;
export const FONT_SIZE_16 = 16;
export const FONT_SIZE_14 = 14;
export const FONT_SIZE_12 = 12;

// LINE HEIGHT
export const LINE_HEIGHT_19 = 19;
export const LINE_HEIGHT_20 = 20;
export const LINE_HEIGHT_16 = 16;

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
