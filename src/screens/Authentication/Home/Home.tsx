import React from 'react'
import { Text, Dimensions, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import Container from '../../../components/Container'
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import Button from '../../../components/Button'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Home() {
  const { colors } = useTheme()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  function handleNavigation(props: string) {
    navigation.navigate(props)
  }

  return (
    <Container>
      <Text style={[{ color: colors.text }, styles.text]} testID="text">
        {' '}
        Now you know
        <Text style={[{ color: colors.secondary }, styles.italicText]}>
          {' '}
          whtodo{' '}
        </Text>
      </Text>
      <Button onPress={() => handleNavigation('Login')} text="LOGIN" />
      <Button onPress={() => handleNavigation('Register')} text="REGISTER" />
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    width: width / 1.5,
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },

  text: {
    fontSize: 24,
    marginVertical: height / 16,
    fontFamily: 'Roboto-Regular',
  },

  italicText: {
    fontFamily: 'Roboto-LightItalic',
  },
})
