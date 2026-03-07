import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const CHANGE_BY_MOBILE_DPI = (size: number): number => {
  const scale = width / 375; // based on iPhone 6
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
