import {newsApi} from '@app/api';
import NewsCard from '@app/components/NewsCard';
import NewsCategories from '@app/components/NewsCategories';
import {Article} from '@app/types';
import {rem} from '@app/utils';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const renderItem: ListRenderItem<Article> = ({item, extraData}) => (
  <NewsCard item={item} category={extraData} />
);

const HomeScreen = () => {
  const [section, setSection] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    isError,
  } = useInfiniteQuery({
    queryKey: [section || 'news'],
    queryFn: ({pageParam}) =>
      newsApi.getNews({
        page: pageParam || 1,
        ...(section.length && {section}),
      }),
    getNextPageParam: lastPage =>
      lastPage.currentPage <= lastPage.pages
        ? lastPage.currentPage + 1
        : undefined,
  });
  const newsData = useMemo(
    () => data?.pages.flatMap(el => el.results),
    [data?.pages],
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const onEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={[styles.centerWrapper, {height: 40}]}>
          <ActivityIndicator />
        </View>
      );
    }

    return null;
  };

  const onSelect = useCallback((val: string) => {
    setSection(val);
  }, []);

  if (isError) {
    return (
      <View style={styles.centerWrapper}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={newsData}
        extraData={section}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        estimatedItemSize={rem(250)}
        contentContainerStyle={styles.listContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={[styles.centerWrapper, {height: 300}]}>
            <ActivityIndicator size="small" />
          </View>
        }
        ListHeaderComponent={
          <NewsCategories onSelect={onSelect} selectedEl={section} />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
