import React, { useState } from 'react'
import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Paragraph, Snackbar, Title, useTheme } from 'react-native-paper'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { auth } from '../../../firebase/config'

import Container from '../../../components/Container'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { AuthIcon } from '../../../utils/icons'

import styles from './styles'

const width = Dimensions.get('screen').width

export default function Forgot() {
  const { colors } = useTheme()

  const { navigate } = useNavigation()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const [visible, setVisible] = useState(false)

  async function handleSubmit() {
    setError('')

    if (email.length === 0) {
      return setError('Please enter a valid e-mail')
    }

    try {
      await auth.sendPasswordResetEmail(email)

      toggleSnackBar()

      setInterval(() => navigate('Login'), 3000)
    } catch (e) {
      setError('Please enter a valid e-mail')
    }
  }

  function toggleSnackBar() {
    setVisible(state => !state)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <Container>
          <AuthIcon width={width / 1.25} height={width / 1.25} />

          <Title
            style={[styles.title, { color: colors.secondary }]}
            testID="forgotTitle">
            Forgot your password?
          </Title>

          <Paragraph style={[styles.text, { color: colors.text }]}>
            We just need your registered e-mail to send you password reset
            instructions
          </Paragraph>

          <Input
            setState={setEmail}
            inputName="email"
            input={email}
            error={error}
          />

          <Button onPress={handleSubmit} big text="RESET PASSWORD" />

          <View style={styles.row}>
            <Text style={[styles.registerText, { color: colors.text }]}>
              Don&apos;t have a account?{' '}
            </Text>

            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text style={[{ color: colors.secondary }, styles.register]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <Snackbar
            testID="snackbar"
            visible={visible}
            onDismiss={toggleSnackBar}>
            Go check your e-mail!
          </Snackbar>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
