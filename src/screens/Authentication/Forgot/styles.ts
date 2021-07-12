import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 26,
    paddingHorizontal: 10,
  },

  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    width: width / 1.25,
    marginVertical: 15,
    textAlign: 'left',
  },

  registerText: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    marginVertical: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  register: {
    fontFamily: 'Roboto-Italic',
  },
})
