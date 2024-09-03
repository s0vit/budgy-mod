import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../shared/constants/colors.ts';
import { ROOT_STACK_ROUTES, StackNavigation } from './Navigation/types.tsx';

export const AddTabButton = ({ children }: PropsWithChildren) => {
  const { navigate } = useNavigation<StackNavigation>();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigate(ROOT_STACK_ROUTES.ADD_EXPENSE_MODAL)}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.success,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  button: {
    position: 'absolute',
    left: '44%',
    bottom: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
