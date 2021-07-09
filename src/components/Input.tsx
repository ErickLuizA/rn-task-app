import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'

interface IInputProps {
  input: string
  inputName: string
  error: string
  setState(input: string): void
  color?: boolean
}

const width = Dimensions.get('screen').width

export default function Input({
  input,
  inputName,
  error,
  setState,
  color,
}: IInputProps) {
  const { colors } = useTheme()

  return (
    <>
      <TextInput
        testID={`${inputName}Input`}
        value={input}
        error={Boolean(error)}
        theme={{
          colors: {
            placeholder: colors.secondary,
            text: colors.grayText,
          },
        }}
        textContentType={
          inputName === 'password'
            ? 'password'
            : inputName === 'email'
            ? 'emailAddress'
            : 'name'
        }
        onChangeText={text => setState(text)}
        label={`Enter your ${inputName}`}
        mode="flat"
        style={[
          styles.input,
          {
            backgroundColor: color
              ? colors.purpleInput
              : colors.inputBackground,
          },
        ]}
      />
      {Boolean(error) && (
        <Text testID="nameError" style={styles.error}>
          {error}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    width: width / 1.25,
    marginVertical: 10,
    color: 'red',
  },
  error: {
    color: '#f00',
    textAlign: 'left',
    width: width / 1.25,
  },
})
