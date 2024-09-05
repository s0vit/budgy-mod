import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store.ts';
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
import Input from '../ui-kit/Input/Input.tsx';

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
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      const castedError = error as TErrorType;
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

  const isButtonDisabled = !email || !password || isLoading || emailErrors.length > 0 || passwordErrors.length > 0;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{isLoading ? 'Loading...' : 'Hello'}</Text>
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
  title: {
    fontSize: 24,
    width: '80%',
    textAlign: 'center',
    fontFamily: 'interBlack',
    backgroundColor: colors.white100,
    padding: 10,
    color: colors.accentDark,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.black100,
    marginBottom: 50,
    overflow: 'hidden',
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
