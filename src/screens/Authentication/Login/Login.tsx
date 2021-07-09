import React from 'react'
import { Text, StyleSheet, Dimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Container from '../../../components/Container'
import { useNavigation } from '@react-navigation/native'
import { Divider, Title, useTheme } from 'react-native-paper'
import useSubmit from './useSubmit'
import handleGoogleLogin from '../common/handleGoogleLogin'
import GoogleButton from '../common/GoogleButton'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

const width = Dimensions.get('screen').width

export default function Login() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState({
    emailError: '',
    passwordError: '',
  })

  function handleNavigation() {
    navigation.navigate('Register')
  }

  function useForm() {
    useSubmit({ email, password, setError })
  }

  function handleForgotPass() {
    navigation.navigate('Forgot')
  }

  return (
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

      <TouchableOpacity onPress={handleForgotPass} testID="forgotButton">
        <Text style={[styles.forgot, { color: colors.secondary }]}>
          Forgot your password?
        </Text>
      </TouchableOpacity>
      <Button onPress={useForm} text="LOGIN" big />
      <View style={styles.row}>
        <Text style={[styles.text, { color: colors.text }]}>
          Don&apos;t have a account?
        </Text>
        <TouchableOpacity onPress={handleNavigation} testID="sendToRegister">
          <Text style={[{ color: colors.secondary }, styles.register]}>
            {' '}
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  forgot: {
    fontFamily: 'Roboto-MediumItalic',
    marginVertical: 15,
  },
  title: {
    fontFamily: 'Roboto-Light',
    marginBottom: 40,
    fontSize: 26,
    width: width / 1.5,
    marginRight: 'auto',
    paddingHorizontal: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 2,
    width: width / 3,
    marginHorizontal: 10,
  },

  or: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    width: width / 1.25,
    backgroundColor: '#fafafa',
    marginVertical: 10,
  },

  button: {
    paddingVertical: 20,
    width: width / 1.25,
    marginTop: 10,
    borderRadius: 5,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },

  text: {
    fontFamily: 'Roboto-Regular',
  },

  register: {
    fontFamily: 'Roboto-Italic',
  },
  error: {
    color: '#f00',
    textAlign: 'left',
    width: width / 1.25,
  },
})
