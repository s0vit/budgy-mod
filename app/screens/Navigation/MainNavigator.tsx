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
import { ImageBackground, StyleSheet, View, Text } from 'react-native';

type IconNames =
  | 'home'
  | 'information-circle'
  | 'list-circle'
  | 'list-circle-outline'
  | 'information-circle-outline'
  | 'home-outline';
type TCreateTabBarIcons = (props: {
  focused: boolean;
  color: string;
  size: number;
  route: { name: string };
}) => JSX.Element;

const createTabBarIcons: TCreateTabBarIcons = ({ focused, color, size, route }) => {
  let iconName: IconProps<IconNames>['name'] = 'home';

  if (route.name === 'Expenses') {
    iconName = focused ? 'information-circle' : 'information-circle-outline';
  } else if (route.name === 'Add') {
    iconName = focused ? 'list-circle' : 'list-circle-outline';
  } else if (route.name === 'Login') {
    iconName = focused ? 'home' : 'home-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const MainTabNavigator = () => {
  const user = useAppSelector(selectUser);
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../../assets/budgy-background.jpg')}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyles}
    >
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent', paddingTop: top }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => createTabBarIcons({ focused, color, size, route }),
          headerShown: false,
        })}
      >
        {!user ? (
          <Tab.Screen name={BOTTOM_TAB_ROUTES.LOGIN} component={LoginScreen} />
        ) : (
          <>
            <Tab.Screen name={BOTTOM_TAB_ROUTES.EXPENSES} component={ExpensesListScreen} />
            <Tab.Screen
              name={BOTTOM_TAB_ROUTES.ADD}
              options={{
                tabBarButton: (props) => (
                  <AddTabButton {...props}>
                    <Ionicons name="add" size={30} color="white" />
                  </AddTabButton>
                ),
              }}
            >
              {() => null}
            </Tab.Screen>
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
