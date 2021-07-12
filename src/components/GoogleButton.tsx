import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'

import { GoogleIcon } from '../utils/icons'

interface IGoogleButtonProps {
  onPress: () => void
}

const width = Dimensions.get('screen').width

export default function ({ onPress }: IGoogleButtonProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      testID="googleButton"
      onPress={onPress}
      style={[
        styles.googleButton,
        { backgroundColor: colors.inputBackground },
      ]}>
      <>
        <GoogleIcon />
        <Text style={[styles.googleButtonText, { color: colors.secondary }]}>
          LOGIN WITH GOOGLE
        </Text>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  googleButtonText: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 20,
    width: width / 1.25,
    justifyContent: 'space-evenly',
    borderRadius: 4,
  },
})
