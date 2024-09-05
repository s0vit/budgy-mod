import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../shared/constants/colors.ts';
import Ionicons from '@expo/vector-icons/Ionicons';

type TInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  extraStyles?: Record<string, unknown>;
  isSecureText?: boolean;
  helperText?: string;
  errors?: string[] | string;
  isError?: boolean;
  withEyeIcon?: boolean;
};

const Input = ({
  placeholder,
  value,
  onChangeText,
  extraStyles,
  isSecureText,
  withEyeIcon,
  helperText,
  errors,
  isError,
}: TInputProps) => {
  const errorState = (errors && errors?.length > 0) || isError;
  const helperFinalText = Array.isArray(errors) ? errors?.join('\n') : errors || helperText;
  const [isSecure, setIsSecure] = useState(isSecureText);

  return (
    <View>
      <View style={[styles.inputWithIconWrapper, errorState && styles.errorInput, extraStyles]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          secureTextEntry={isSecure}
        />
        {withEyeIcon && (
          <Ionicons
            name={isSecure ? 'eye-off' : 'eye'}
            size={24}
            color={colors.black100}
            onPress={() => setIsSecure(!isSecure)}
          />
        )}
      </View>
      {helperFinalText && (
        <Text style={[styles.helperText, errorState && styles.errorHelperText]}>{helperFinalText}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputWithIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black100,
    borderRadius: 5,
    margin: 5,
    backgroundColor: colors.white100,
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 10,
    width: '90%',
  },
  errorInput: {
    borderColor: colors.error,
  },
  helperText: {
    color: colors.black100,
    fontSize: 12,
    fontFamily: 'inter',
    marginHorizontal: 10,
  },
  errorHelperText: {
    color: colors.error,
  },
});
