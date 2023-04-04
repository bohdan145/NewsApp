import {CATEGORIES} from '@app/constants';
import {rem} from '@app/utils';
import {useTheme} from '@react-navigation/native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  selectedEl: string;
  onSelect: (el: string) => void;
}

function NewsCategories({
  style = {},
  onSelect,
  selectedEl,
  ...scrollProps
}: Props) {
  const positions = useRef<{[x: string]: number}>({}).current;
  const [categories] = useState(CATEGORIES);
  const list = useRef<ScrollView>(null);
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  useEffect(() => {
    list.current?.scrollTo({x: positions[selectedEl]});
  }, [positions, selectedEl]);

  return (
    <>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.title, {color: colors.text}]}>
        Categories
      </Text>
      <ScrollView
        ref={list}
        horizontal
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.wrapper, style]}
        style={{marginHorizontal: rem(-15)}}
        {...scrollProps}>
        <View style={{flexDirection: 'row'}}>
          {categories.map(el => {
            const active = el.value === selectedEl;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onLayout={({nativeEvent}) => {
                  const offset = (width - nativeEvent.layout.width) / 2;
                  positions[el.value] = nativeEvent.layout.x - offset;
                }}
                onPress={() => {
                  onSelect(el.value);
                }}
                style={[styles.item, active && styles.activeItem]}
                key={el.label}>
                <Text
                  style={{
                    fontSize: rem(16),
                    textAlign: 'center',
                    color: active ? '#fff' : '#222',
                  }}>
                  {el.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

export default memo(NewsCategories);

const styles = StyleSheet.create({
  title: {
    fontSize: rem(18),
    fontWeight: '600',
    color: '#222',
  },
  wrapper: {
    flexGrow: 1,
    paddingTop: rem(15),
    paddingBottom: rem(20),
    paddingHorizontal: rem(15),
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: rem(15),
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: rem(10),
    minWidth: rem(100),
  },
  activeItem: {
    backgroundColor: '#333',
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
});
