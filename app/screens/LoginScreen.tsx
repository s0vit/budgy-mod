import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store.ts';
import * as SecureStore from 'expo-secure-store';
import { useAuthControllerLoginMutation, useAuthControllerRefreshMutation } from '../api/budgyApi.ts';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { setUser } from '../entities/user/model/userSlice.ts';
import { TErrorType } from '../api/api.ts';
import Card from '../ui-kit/Card.tsx';
import Input from '../ui-kit/Input.tsx';
import TitleText from '../ui-kit/TitleText.tsx';
import { jwtDecode } from 'jwt-decode';
import Button from '../ui-kit/Button.tsx';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [login, { data, error, isLoading }] = useAuthControllerLoginMutation();
  const [refresh, { data: refreshData, error: refreshError, isLoading: isRefreshLoading }] =
    useAuthControllerRefreshMutation();

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
      SecureStore.setItem('refreshToken', JSON.stringify({ refreshToken: data.refreshToken }));
      console.log('data', data);
      dispatch(setUser(data));
    }
  }, [data, dispatch, email, password]);

  useEffect(() => {
    if (refreshData) {
      dispatch(setUser(refreshData));
      SecureStore.setItem('refreshToken', JSON.stringify({ refreshToken: refreshData.refreshToken }));
    }
  }, [dispatch, refreshData]);

  useEffect(() => {
    if (error || refreshError) {
      const castedError = (error as TErrorType) || (refreshError as TErrorType);
      SecureStore.deleteItemAsync('refreshToken');
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
  }, [error, refreshError]);

  //try to log in with refreshToken from keychain
  useEffect(() => {
    try {
      const credentials = SecureStore.getItem('refreshToken');
      if (credentials) {
        console.log('credentials', credentials);
        const { exp } = jwtDecode(credentials);
        if (exp && exp * 1000 < Date.now()) {
          SecureStore.deleteItemAsync('refreshToken');
          return;
        }
        const { refreshToken } = JSON.parse(credentials);
        refresh({ refreshInputDto: { refreshToken } });
      }
    } catch (error) {
      SecureStore.deleteItemAsync('refreshToken');
      console.error("SecureStore couldn't be accessed!", error);
    }
  }, [refresh]);
  const isButtonDisabled =
    !email || !password || isLoading || emailErrors.length > 0 || passwordErrors.length > 0 || isRefreshLoading;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TitleText title={isLoading || isRefreshLoading ? 'Loading...' : 'Hello'} />
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
            <Button onPress={loginHandler} isDisabled={isButtonDisabled}>
              Login
            </Button>
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
});
