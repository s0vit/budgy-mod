import React from 'react';
import { MainTabNavigator } from './MainNavigator.tsx';
import { AddExpenseModal } from '../Modals/AddExpenseModal.tsx';
import { createStackNavigator } from '@react-navigation/stack';
import { ROOT_STACK_ROUTES, RootStackParamList } from './types.tsx';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'transparent' } }}>
      <RootStack.Screen name={ROOT_STACK_ROUTES.MAIN} component={MainTabNavigator} options={{ headerShown: false }} />
      <RootStack.Screen
        name={ROOT_STACK_ROUTES.ADD_EXPENSE_MODAL}
        component={AddExpenseModal}
        options={{ presentation: 'modal', headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
