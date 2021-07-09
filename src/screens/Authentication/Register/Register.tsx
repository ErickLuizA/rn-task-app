import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Divider, Title, useTheme } from 'react-native-paper'
import Container from '../../../components/Container'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import useSubmit from './useSubmit'
import handleGoogleLogin from '../common/handleGoogleLogin'
import GoogleButton from '../common/GoogleButton'
import Input from '../../../components/Input'

const width = Dimensions.get('screen').width

export default function Register() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState({
    nameError: '',
    emailError: '',
    passwordError: '',
  })

  function handleNavigation() {
    navigation.navigate('Login')
  }

  function useForm() {
    useSubmit({ name, email, password, setError })
  }

  return (
    <Container>
      <Title
        style={[styles.title, { color: colors.secondary }]}
        testID="registerTitle">
        Create your free account to join us!
      </Title>
      <GoogleButton onPress={() => handleGoogleLogin} />
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

      <TouchableOpacity
        testID="submitRegisterButton"
        onPress={useForm}
        style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={[styles.text, { color: colors.text }]}>
          Already have a account?
        </Text>
        <TouchableOpacity onPress={handleNavigation} testID="sendToLogin">
          <Text style={[{ color: colors.secondary }, styles.login]}>
            {' '}
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Light',
    marginBottom: 40,
    fontSize: 26,
    width: width / 1.5,
    marginRight: 'auto',
    paddingHorizontal: 20,
  },

  googleButtonText: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 20,
    width: width / 1.25,
    justifyContent: 'space-evenly',
    borderRadius: 5,
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

  login: {
    fontFamily: 'Roboto-Italic',
  },
  error: {
    color: '#f00',
    textAlign: 'left',
    width: width / 1.25,
  },
})
