import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Divider, Title, useTheme, Text, Snackbar } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-auth-session/providers/google'

import { useReduxDispatch, useReduxSelector } from '../../../redux/store'
import {
  dismissGoogleError,
  loginWithGoogle,
  registerWithEmail,
} from '../../../redux/slices/authSlice'

import Container from '../../../components/Container'
import GoogleButton from '../../../components/GoogleButton'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

import styles from './styles'

export default function Register() {
  const { colors } = useTheme()

  const { navigate } = useNavigation()

  const dispatch = useReduxDispatch()

  const { loading, registerError, googleError } = useReduxSelector(
    state => state.auth
  )

  const [, , promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.WEB_CLIENT_ID,
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  })

  function handleSubmit() {
    setError({
      nameError: '',
      emailError: '',
      passwordError: '',
    })

    if (name.length === 0) {
      return setError({
        nameError: 'You need to fill this field',
        emailError: '',
        passwordError: '',
      })
    }

    if (email.length === 0) {
      return setError({
        nameError: '',
        emailError: 'You need to fill this field',
        passwordError: '',
      })
    }

    if (password.length === 0) {
      return setError({
        nameError: '',
        emailError: '',
        passwordError: 'You need to fill this field',
      })
    }

    dispatch(registerWithEmail(name, email, password))
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
            testID="registerTitle">
            Create your free account to join us!
          </Title>

          <GoogleButton onPress={handleGoogleLogin} />

          <View style={styles.row}>
            <Divider style={styles.divider} />
            <Text style={[{ color: colors.text }, styles.or]}>or</Text>
            <Divider style={styles.divider} />
          </View>

          <Input
            input={name}
            inputName="name"
            setState={setName}
            error={error.nameError}
          />

          <Input
            input={email}
            inputName="email"
            setState={setEmail}
            error={error.emailError}
          />

          <Input
            input={password}
            inputName="password"
            setState={setPassword}
            error={error.passwordError}
          />

          {registerError ? (
            <Text style={styles.error}>{registerError}</Text>
          ) : null}

          <Button
            onPress={handleSubmit}
            text="REGISTER"
            big
            loading={loading}
          />

          <View style={styles.row}>
            <Text style={[styles.text, { color: colors.text }]}>
              Already have a account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigate('Login')}
              testID="sendToLogin">
              <Text style={[{ color: colors.secondary }, styles.login]}>
                Login
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
