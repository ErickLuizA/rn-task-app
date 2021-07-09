import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Button from './Button'

interface INotFoundProps {
  onPress: () => void
  label: string
}

export default function NotFound({ onPress, label }: INotFoundProps) {
  const { colors } = useTheme()

  return (
    <View style={styles.imgView}>
      <Text style={[styles.notTaskText, { color: colors.text }]}>
        No task found
      </Text>
      <Button text={label} big onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  imgView: {
    alignItems: 'center',
  },

  notTaskText: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
})
