import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  NewsPage: {id: string; category: string};
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type NewsPageRouteProp = RouteProp<RootStackParamList, 'NewsPage'>;
type NewsPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewsPage'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type NewsPageProps = {
  route: NewsPageRouteProp;
  navigation: NewsPageNavigationProp;
};

export type {HomeScreenProps, NewsPageProps, RootStackParamList};
