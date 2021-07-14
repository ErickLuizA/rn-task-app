import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height

export default StyleSheet.create({
  textInput: {
    fontSize: 26,
    height: height,
    textAlignVertical: 'top',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
})
