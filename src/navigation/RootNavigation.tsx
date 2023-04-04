import HomeScreen from '@app/screens/HomeScreen';
import NewsPage from '@app/screens/NewsPage';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'News',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="NewsPage"
            component={NewsPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation;
