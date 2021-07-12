import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Title, useTheme, Text, Snackbar } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-auth-session/providers/google'

import { useReduxDispatch, useReduxSelector } from '../../../redux/store'
import {
  dismissGoogleError,
  loginWithEmail,
  loginWithGoogle,
} from '../../../redux/slices/authSlice'

import Container from '../../../components/Container'
import GoogleButton from '../../../components/GoogleButton'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import styles from './styles'

export default function Login() {
  const { colors } = useTheme()

  const { navigate } = useNavigation()

  const dispatch = useReduxDispatch()

  const { loading, loginError, googleError } = useReduxSelector(
    state => state.auth
  )

  const [, , promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.WEB_CLIENT_ID,
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    emailError: '',
    passwordError: '',
  })

  function handleSubmit() {
    setError({
      emailError: '',
      passwordError: '',
    })

    if (email.length === 0) {
      return setError({
        emailError: 'You need to fill this field',
        passwordError: '',
      })
    }

    if (password.length === 0) {
      return setError({
        emailError: '',
        passwordError: 'You need to fill this field',
      })
    }

    dispatch(loginWithEmail(email, password))
  }

  async function handleGoogleLogin() {
    const result = await promptAsync()

    if (result?.type == 'success') {
      const { id_token } = result.params

      dispatch(loginWithGoogle(id_token))
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <Container>
          <Title
            style={[styles.title, { color: colors.secondary }]}
            testID="loginTitle">
            WELCOME BACK
          </Title>

          <GoogleButton onPress={handleGoogleLogin} />

          <View style={styles.row}>
            <Divider style={styles.divider} />
            <Text style={[{ color: colors.text }, styles.or]}>or</Text>
            <Divider style={styles.divider} />
          </View>

          <Input
            input={email}
            inputName="email"
            error={error.emailError}
            setState={setEmail}
          />

          <Input
            input={password}
            inputName="password"
            error={error.passwordError}
            setState={setPassword}
          />

          {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

          <TouchableOpacity
            onPress={() => navigate('Forgot')}
            testID="forgotButton">
            <Text style={[styles.forgot, { color: colors.secondary }]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>

          <Button onPress={handleSubmit} text="LOGIN" big loading={loading} />

          <View style={styles.row}>
            <Text style={[styles.text, { color: colors.text }]}>
              Don&apos;t have a account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigate('Register')}
              testID="sendToRegister">
              <Text style={[{ color: colors.secondary }, styles.register]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <Snackbar
            visible={Boolean(googleError)}
            onDismiss={() => dispatch(dismissGoogleError())}>
            {googleError}
          </Snackbar>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
