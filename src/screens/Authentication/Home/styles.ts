import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default StyleSheet.create({
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
