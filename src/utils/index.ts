import {Dimensions} from 'react-native';

export const rem = (size: number) => {
  return Math.floor(size * (Dimensions.get('window').width / 375));
};

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
