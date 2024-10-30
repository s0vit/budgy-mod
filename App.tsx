import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import { RootApp } from './RootApp.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  registerTranslation('en', enGB);
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <RootApp />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
