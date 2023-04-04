import {RootStackParamList} from '@app/navigation/types';
import {Article} from '@app/types';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React, {memo, useLayoutEffect, useRef} from 'react';
import {TouchableOpacity, Image, Text, View, Animated} from 'react-native';
import {styles} from './styles';
import Badge from '../Badge';

interface Props {
  item: Article;
  category: string;
}

const NewsCard: React.FC<Props> = ({item, category = ''}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animated = useRef(new Animated.Value(0)).current;
  const publicationDate = new Date(item.webPublicationDate);
  const {colors} = useTheme();

  useLayoutEffect(() => {
    animated.setValue(0);
    Animated.spring(animated, {
      toValue: 1,
      useNativeDriver: true,
      mass: 0.8,
    }).start();
  }, [animated, item.id]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('NewsPage', {id: item.id, category})}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            backgroundColor: colors.card,
            opacity: animated,
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}>
        <Image
          source={{uri: item.fields?.thumbnail, cache: 'force-cache'}}
          style={styles.image}
        />
        <View style={styles.contentWrapper}>
          <Badge key={item.sectionName} text={item.sectionName} />
          <Text style={[styles.title, {color: colors.text}]}>
            {item.webTitle}
          </Text>
          <View style={styles.date}>
            <Text style={{color: colors.text}}>
              {publicationDate.toLocaleTimeString([], {timeStyle: 'short'})}
            </Text>
            <Text style={{color: colors.text}}>
              {publicationDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(NewsCard);
