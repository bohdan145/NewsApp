import {newsApi, NewsResponse} from '@app/api';
import AnimatedImage from '@app/components/AnimatedImage';
import {NewsPageProps} from '@app/navigation/types';
import {InfiniteData, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml, {MixedStyleDeclaration} from 'react-native-render-html';
import {styles} from './styles';
import BackButton from '@app/components/BackButton';
import {rem} from '@app/utils';
import {LinearGradient} from 'react-native-gradients';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useTheme} from '@react-navigation/native';

const colorList = [
  {offset: '0%', color: '#000', opacity: '1'},
  {offset: '50%', color: '#000', opacity: '0.5'},
  {offset: '100%', color: '#000', opacity: '0'},
];

const NewsPage = ({route, navigation}: NewsPageProps) => {
  const {id, category} = route.params;
  const [ready, setReady] = useState(false);
  const headerHeight = useRef(1);
  const scrollingY = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const queryClient = useQueryClient();
  const {data, isLoading} = useQuery({
    queryKey: [category || 'news', id],
    queryFn: () => newsApi.getNewsById(id),
    initialData: () => {
      const newsData: InfiniteData<NewsResponse['response']> | undefined =
        queryClient.getQueryData([category || 'news']);
      if (newsData) {
        return {
          content: newsData.pages
            ?.flatMap(el => el.results)
            .find(el => el.id === id),
        };
      }
      return undefined;
    },
  });

  const {width} = useWindowDimensions();
  const {colors} = useTheme();
  const contentReady = !!data?.content?.fields.body && ready && !isLoading;
  const imgUrl = data?.content?.fields.thumbnail;
  const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> = useMemo(
    () => ({
      li: {
        marginTop: -15,
        color: 'red',
      },
      h1: {
        color: colors.text,
      },
      h2: {
        color: colors.text,
      },
      h3: {
        color: colors.text,
      },
      h4: {
        color: colors.text,
      },
      p: {
        color: colors.text,
        opacity: 0.8,
      },
      span: {
        color: colors.text,
        opacity: 0.8,
      },
      blockquote: {
        color: colors.text,
        opacity: 0.8,
      },
    }),
    [colors.text],
  );

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollingY,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    headerHeight.current = nativeEvent.layout.height;
  };

  const onContentReady = () => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => setReady(true), 400);
  }, []);

  return (
    <Animated.ScrollView
      onScroll={onScrollEvent}
      scrollEventThrottle={16}
      contentContainerStyle={styles.container}>
      {Platform.OS === 'ios' && (
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 5,
            backgroundColor: colors.card,
            width: '100%',
            height: getStatusBarHeight(true),
            opacity: scrollingY.interpolate({
              inputRange: [1, headerHeight.current],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [{translateY: scrollingY}],
          }}
        />
      )}
      <View onLayout={onLayout} style={styles.imgWrapper}>
        <Animated.View
          flex={1}
          style={{
            opacity: scrollingY.interpolate({
              inputRange: [0, headerHeight.current],
              outputRange: [1, 0.7],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: scrollingY.interpolate({
                  inputRange: [
                    -headerHeight.current / 2,
                    0,
                    headerHeight.current,
                  ],
                  outputRange: [1.8, 1, 1.2],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: Animated.multiply(scrollingY, 0.5),
              },
            ],
          }}>
          {imgUrl && <AnimatedImage uri={imgUrl} style={styles.img} />}
        </Animated.View>

        <View style={styles.headerWrapper}>
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient colorList={colorList} angle={90} />
          </View>
          {data?.content?.sectionName && (
            <View style={styles.tag}>
              <Text style={styles.tagName}>{data?.content?.sectionName}</Text>
            </View>
          )}
          <Text style={styles.title}>{data?.content?.webTitle}</Text>
        </View>
        <View style={styles.backBtn}>
          <BackButton size={rem(18)} onPress={navigation.goBack} />
        </View>
      </View>
      <View style={[styles.contentWrapper, {backgroundColor: colors.card}]}>
        {contentReady ? (
          <Animated.View style={{opacity: contentOpacity}}>
            <RenderHtml
              contentWidth={width}
              source={{html: data.content?.fields.body}}
              onHTMLLoaded={onContentReady}
              tagsStyles={tagsStyles}
            />
          </Animated.View>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator color="#222" />
            <Text style={{marginTop: 5}}>Loading...</Text>
          </View>
        )}
      </View>
    </Animated.ScrollView>
  );
};

export default NewsPage;
