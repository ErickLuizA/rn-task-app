import React from 'react'
import { Dimensions } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { PhonemanIcon, PhonemanIconDark } from '../../../utils/icons'

import Container from '../../../components/Container'
import Button from '../../../components/Button'

const WIDTH = Dimensions.get('screen').width

import styles from './styles'

export default function Home() {
  const { colors, dark } = useTheme()

  const { navigate } = useNavigation()

  return (
    <Container>
      {dark ? (
        <PhonemanIconDark width={WIDTH / 2} height={WIDTH / 2} />
      ) : (
        <PhonemanIcon width={WIDTH / 2} height={WIDTH / 2} />
      )}

      <Text style={[{ color: colors.text }, styles.text]} testID="text">
        Now you know{' '}
        <Text style={[{ color: colors.secondary }, styles.italicText]}>
          whtodo
        </Text>
      </Text>

      <Button onPress={() => navigate('Login')} text="LOGIN" />

      <Button onPress={() => navigate('Register')} text="REGISTER" />
    </Container>
  )
}
