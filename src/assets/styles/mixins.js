
import { Dimensions, PixelRatio } from 'react-native';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
console.log('window width', WINDOW_WIDTH);
const guidelineBaseWidth = 320;

// export const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size;
// export const scaleFont = size => size * PixelRatio.getFontScale(); // Returns the scaling factor for font sizes.
console.log('pixel ratio', PixelRatio.getFontScale());
console.log('scaleSize', PixelRatio.getFontScale());
