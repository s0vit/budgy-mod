import Ionicons from '@expo/vector-icons/Ionicons';
import { AddTabButton } from '../AddTabButton.tsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../../store/store.ts';
import { selectUser } from '../../entities/user/model/userSlice.ts';
import ExpensesListScreen from '../ExpensesListScreen.tsx';
import LoginScreen from '../LoginScreen.tsx';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BOTTOM_TAB_ROUTES, BottomTabParamList } from './types.tsx';
import { ImageBackground, StyleSheet } from 'react-native';
import {
  useCategoryControllerGetAllQuery,
  usePaymentSourceControllerGetAllQuery,
  useUserConfigControllerGetConfigQuery,
} from '../../api/budgyApi.ts';
import ProfileScreen from '../ProfileScreen.tsx';
import CategoriesScreen from '../CategoriesScreen.tsx';

type IconNames =
  | 'home'
  | 'home-outline'
  | 'cash'
  | 'cash-outline'
  | 'list'
  | 'list-outline'
  | 'person'
  | 'person-outline'
  | 'account'
  | 'account-outline'
  | 'cart'
  | 'cart-outline'
  | 'card'
  | 'card-outline';

type TCreateTabBarIcons = (props: {
  focused: boolean;
  color: string;
  size: number;
  route: { name: BOTTOM_TAB_ROUTES };
}) => JSX.Element;

const createTabBarIcons: TCreateTabBarIcons = ({ focused, color, size, route }) => {
  let iconName: IconProps<IconNames>['name'] = 'home';

  switch (route.name) {
    case BOTTOM_TAB_ROUTES.EXPENSES:
      iconName = focused ? 'cash' : 'cash-outline';
      break;
    case BOTTOM_TAB_ROUTES.ADD:
      iconName = focused ? 'list' : 'list-outline';
      break;
    case BOTTOM_TAB_ROUTES.LOGIN:
      iconName = focused ? 'home' : 'home-outline';
      break;
    case BOTTOM_TAB_ROUTES.PROFILE:
      iconName = focused ? 'person' : 'person-outline';
      break;
    case BOTTOM_TAB_ROUTES.CATEGORIES:
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case BOTTOM_TAB_ROUTES.SOURCES:
      iconName = focused ? 'card' : 'card-outline';
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const NullComponent = () => null;
const Tab = createBottomTabNavigator<BottomTabParamList>();

export const MainTabNavigator = () => {
  const user = useAppSelector(selectUser);
  const { top } = useSafeAreaInsets();

  useUserConfigControllerGetConfigQuery(undefined, { skip: !user });
  useCategoryControllerGetAllQuery(undefined, { skip: !user });
  usePaymentSourceControllerGetAllQuery(undefined, { skip: !user });

  return (
    <ImageBackground
      source={require('../../../assets/budgy-background.jpg')}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyles}
    >
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent', paddingTop: top }}
        initialRouteName={user ? BOTTOM_TAB_ROUTES.EXPENSES : BOTTOM_TAB_ROUTES.LOGIN}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => createTabBarIcons({ focused, color, size, route }),
          headerShown: false,
        })}
      >
        {!user ? (
          <Tab.Screen name={BOTTOM_TAB_ROUTES.LOGIN} component={LoginScreen} />
        ) : (
          <>
            <Tab.Screen name={BOTTOM_TAB_ROUTES.SOURCES} component={ProfileScreen} />
            <Tab.Screen name={BOTTOM_TAB_ROUTES.EXPENSES} component={ExpensesListScreen} />
            <Tab.Screen name={BOTTOM_TAB_ROUTES.PROFILE} component={ProfileScreen} />
            <Tab.Screen name={BOTTOM_TAB_ROUTES.CATEGORIES} component={CategoriesScreen} />

            <Tab.Screen
              name={BOTTOM_TAB_ROUTES.ADD}
              component={NullComponent}
              options={{
                tabBarButton: (props) => (
                  <AddTabButton {...props}>
                    <Ionicons name="add" size={30} color="white" />
                  </AddTabButton>
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  imageStyles: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.5,
  },
});
