import React, { PropsWithChildren } from 'react';
import { colors } from '../shared/constants/colors.ts';
import { Pressable, StyleSheet, Text } from 'react-native';

type TButtonProps = {
  onPress: () => void;
  extraStyles?: Record<string, unknown>;
  isDisabled?: boolean;
};

const Button = ({ onPress, extraStyles, isDisabled, children }: PropsWithChildren<TButtonProps>) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.accentDark }}
      style={({ pressed }) => [
        styles.button,
        (pressed && styles.buttonPressed) || (isDisabled && styles.buttonDisabled),
        extraStyles,
      ]}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: colors.accentDark,
  },
  buttonDisabled: {
    backgroundColor: colors.white60,
  },
  buttonText: {
    color: colors.white100,
    textAlign: 'center',
    fontFamily: 'interBold',
    fontSize: 16,
  },
});
