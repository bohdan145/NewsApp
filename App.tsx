import {RootNavigation} from '@app/navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {MMKV} from 'react-native-mmkv';

const queryClient = new QueryClient();
export const localStorage = new MMKV();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}
export default App;
