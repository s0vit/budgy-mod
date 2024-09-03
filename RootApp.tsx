import React from 'react';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { RootStackNavigation } from './app/screens/Navigation/RootStackNavigation.tsx';

export const RootApp = () => {
  const [FontsLoaded] = useFonts({
    interThin: Inter_100Thin,
    interExtraLight: Inter_200ExtraLight,
    interLight: Inter_300Light,
    inter: Inter_400Regular,
    interMedium: Inter_500Medium,
    interSemiBold: Inter_600SemiBold,
    interBold: Inter_700Bold,
    interExtraBold: Inter_800ExtraBold,
    interBlack: Inter_900Black,
  });

  if (!FontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('./assets/budgy-background.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyles}
      >
        <View
          style={{
            ...styles.appContainer,
          }}
        >
          <RootStackNavigation />
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
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

// export const RootApp = () => {
//   const [FontsLoaded] = useFonts({
//     interThin: Inter_100Thin,
//     interExtraLight: Inter_200ExtraLight,
//     interLight: Inter_300Light,
//     inter: Inter_400Regular,
//     interMedium: Inter_500Medium,
//     interSemiBold: Inter_600SemiBold,
//     interBold: Inter_700Bold,
//     interExtraBold: Inter_800ExtraBold,
//     interBlack: Inter_900Black,
//   });
//
//   const { top } = useSafeAreaInsets();
//   const user = useAppSelector(selectUser);
//
//   if (!FontsLoaded) {
//     return null;
//   }
//
//   return (
//     <SafeAreaProvider>
//       <ImageBackground
//         source={require('./assets/budgy-background.jpg')}
//         style={styles.backgroundImage}
//         imageStyle={styles.imageStyles}
//       >
//         <View
//           style={{
//             ...styles.appContainer,
//             paddingTop: top,
//           }}
//         >
//           <Tab.Navigator
//             sceneContainerStyle={{ backgroundColor: 'transparent' }}
//             screenOptions={({ route }) => {
//               return {
//                 tabBarStyle: {
//                   backgroundColor: 'rgba(255,255,255,0.5)',
//                 },
//                 tabBarIcon: ({ focused, color, size }) =>
//                   createTabBarIcons({
//                     focused,
//                     color,
//                     size,
//                     route,
//                   }),
//                 headerShown: false,
//               };
//             }}
//           >
//             {!user ? (
//               <Tab.Screen name="Login" component={LoginScreen} options={{}} />
//             ) : (
//               <>
//                 <Tab.Screen name="Expenses" component={ExpensesListScreen} />
//                 <Tab.Screen
//                   name="Add"
//                   component={() => null}
//                   options={{
//                     tabBarButton: (props) => (
//                       <AddTabButton {...props} onPress={() => props.navigation.navigate('AddExpense')}>
//                         <Ionicons name="add" size={30} color="white" />
//                       </AddTabButton>
//                     ),
//                   }}
//                 />
//               </>
//             )}
//           </Tab.Navigator>
//         </View>
//       </ImageBackground>
//     </SafeAreaProvider>
//   );
// };
//
// const styles = StyleSheet.create({
//   appContainer: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   imageStyles: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//     opacity: 0.5,
//   },
// });
