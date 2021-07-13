import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { useTheme, Button as PaperButton, Text } from 'react-native-paper'

const width = Dimensions.get('screen').width

interface IButtonProps {
  text: string
  onPress(): void
  big?: boolean
  loading?: boolean
}

export default function Button({
  text,
  onPress,
  big,
  loading = false,
}: IButtonProps) {
  const { colors } = useTheme()

  return (
    <PaperButton
      loading={loading}
      onPress={onPress}
      style={[
        big ? styles.bigButton : styles.button,
        { backgroundColor: colors.primary },
      ]}>
      <Text style={[styles.buttonText, { color: colors.secondary }]}>
        {text}
      </Text>
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    width: width / 1.5,
    marginVertical: 10,
    borderRadius: 4,
  },

  bigButton: {
    paddingVertical: 12,
    width: '100%',
    marginVertical: 10,
    borderRadius: 4,
  },

  buttonText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 18,
  },
})
