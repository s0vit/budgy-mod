import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../shared/constants/colors.ts';

type TInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  extraStyles?: Record<string, unknown>;
  isSecureText?: boolean;
  helperText?: string;
  errors?: string[];
  isError?: boolean;
};

const Input = ({
  placeholder,
  value,
  onChangeText,
  extraStyles,
  isSecureText,
  helperText,
  errors,
  isError,
}: TInputProps) => {
  const errorState = (errors && errors?.length > 0) || isError;
  const helperFinalText = errors?.join('\n') || helperText;

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, errorState && styles.errorInput, extraStyles]}
        secureTextEntry={isSecureText}
      />
      {/*show helper text if it exists or errors*/}
      {(helperText || errors) && (
        <View>
          {helperFinalText && (
            <Text style={[styles.helperText, errorState && styles.errorHelperText]}>{helperFinalText}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white100,
    borderWidth: 1,
    borderColor: colors.black100,
    borderRadius: 5,
    padding: 10,
    margin: 10,
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
