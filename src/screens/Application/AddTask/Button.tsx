import React, { ReactChild } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    width: width / 1.5,
    marginVertical: 10,
    borderRadius: 5,
  },

  wideButton: {
    paddingVertical: 10,
    width: width / 1.25,
    marginVertical: 10,
    borderRadius: 5,
  },

  bigButton: {
    paddingVertical: 25,
    width: width / 1.25,
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})

interface IButton {
  text?: string
  conditionalText?: boolean
  onPress(): void
  big?: boolean
  children?: ReactChild
  color?: boolean
  wide?: boolean
}

const Button = ({
  text,
  onPress,
  big,
  conditionalText,
  children,
  color,
  wide,
}: IButton) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      testID={'button' + text}
      style={[
        big ? styles.bigButton : wide ? styles.wideButton : styles.button,
        { backgroundColor: color ? colors.purpleInput : colors.primary },
      ]}>
      {conditionalText ? (
        <View style={styles.row}>{children}</View>
      ) : (
        <Text style={[styles.buttonText, { color: colors.secondary }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
