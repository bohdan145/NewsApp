import {generateRandomColor, rem} from '@app/utils';
import {localStorage} from '../../../App';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Badge: React.FC<{text: string}> = ({text}) => {
  const [bgColor] = useState(() => {
    const value =
      localStorage.getString(`badge-${text}`) || generateRandomColor();
    localStorage.set(`badge-${text}`, value);
    return value;
  });
  return (
    <View
      style={[
        styles.wrapper,
        {backgroundColor: bgColor, shadowColor: bgColor},
      ]}>
      <Text style={{color: '#fff'}}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  wrapper: {
    padding: rem(6),
    paddingHorizontal: rem(15),
    marginBottom: 10,
    borderRadius: 15,
    alignSelf: 'flex-start',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
