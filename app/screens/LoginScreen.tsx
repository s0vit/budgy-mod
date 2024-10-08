import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store.ts';
import * as SecureStore from 'expo-secure-store';
import { useAuthControllerLoginMutation } from '../api/budgyApi.ts';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { setUser } from '../entities/user/model/userSlice.ts';
import { colors } from '../shared/constants/colors.ts';
import { TErrorType } from '../api/api.ts';
import Card from '../ui-kit/Card.tsx';
import Input from '../ui-kit/Input.tsx';
import TitleText from '../ui-kit/TitleText.tsx';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [login, { data, error, isLoading }] = useAuthControllerLoginMutation();

  const emailEnterHandler = useCallback(
    (email: string) => {
      setEmailErrors([]);
      setEmail(email);
    },
    [setEmail, setEmailErrors],
  );

  const passwordEnterHandler = useCallback(
    (password: string) => {
      setPasswordErrors([]);
      setPassword(password);
    },
    [setPassword, setPasswordErrors],
  );

  const loginHandler = useCallback(() => {
    if (!email || !password || isLoading) return;
    login({ loginInputDto: { email: email, password } });
  }, [email, password, isLoading, login]);

  useEffect(() => {
    if (data) {
      SecureStore.setItem('userCredentials', JSON.stringify({ email, password }));
      dispatch(setUser(data));
    }
  }, [data, dispatch, email, password]);

  useEffect(() => {
    if (error) {
      const castedError = error as TErrorType;
      SecureStore.deleteItemAsync('userCredentials');
      if (castedError.data.meta) {
        if (castedError.data.meta.email) {
          setEmailErrors(castedError.data.meta.email);
        }
        if (castedError.data.meta.password) {
          setPasswordErrors(castedError.data.meta.password);
        }
        if (castedError.data.meta.message) {
          setEmailErrors(castedError.data.meta.message);
        }
      }
    }
  }, [error]);

  //try to log in with email and password from keychain
  useEffect(() => {
    try {
      const credentials = SecureStore.getItem('userCredentials');
      if (credentials) {
        const { email, password } = JSON.parse(credentials);
        setEmail(email);
        setPassword(password);
        login({ loginInputDto: { email, password } });
      }
    } catch (error) {
      console.error("SecureStore couldn't be accessed!", error);
    }
  }, [login]);
  const isButtonDisabled = !email || !password || isLoading || emailErrors.length > 0 || passwordErrors.length > 0;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TitleText title={isLoading ? 'Loading...' : 'Hello'} />
          <Card extraStyles={{ width: '80%' }}>
            <Input placeholder="Email" value={email} onChangeText={emailEnterHandler} errors={emailErrors} />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={passwordEnterHandler}
              errors={passwordErrors}
              isSecureText
              withEyeIcon
            />
            <Pressable
              onPress={loginHandler}
              android_ripple={{ color: colors.accentDark }}
              style={({ pressed }) => [
                styles.loginButton,
                (pressed && styles.loginButtonPressed) || (isButtonDisabled && styles.loginButtonDisabled),
              ]}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.accent,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  loginButtonPressed: {
    backgroundColor: colors.accentDark,
  },
  loginButtonDisabled: {
    backgroundColor: colors.white60,
  },
  loginButtonText: {
    color: colors.white100,
    textAlign: 'center',
    fontFamily: 'interBold',
    fontSize: 16,
  },
});
