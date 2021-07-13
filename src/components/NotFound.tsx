import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import { NotFoundIcon, NotFoundIconDark } from '../utils/icons'
import Button from './Button'

interface INotFoundProps {
  onPress: () => void
  label: string
}

const WIDTH = Dimensions.get('screen').width

export default function NotFound({ onPress, label }: INotFoundProps) {
  const { colors, dark } = useTheme()

  return (
    <View style={styles.container}>
      {dark ? (
        <NotFoundIconDark width={WIDTH / 2} height={WIDTH / 2} />
      ) : (
        <NotFoundIcon width={WIDTH / 2} height={WIDTH / 2} />
      )}
      <Text style={[styles.notTaskText, { color: colors.text }]}>
        No task found
      </Text>
      <Button text={label} big onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  notTaskText: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
})
