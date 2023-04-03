import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';

const BackButton: React.FC<{onPress: () => void; size?: number}> = ({
  onPress,
  size = 24,
}) => {
  const xml =
    '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="298" height="512" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"></path></svg>';
  return (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      onPress={onPress}>
      <SvgXml xml={xml} width={size} height={size} fill="#222" />
    </TouchableOpacity>
  );
};

export default BackButton;
