import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import { RootApp } from './RootApp.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';

export default function App() {
  console.log('App');
  registerTranslation('en', enGB);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <RootApp />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
