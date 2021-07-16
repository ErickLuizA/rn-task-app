import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('screen').width

export default StyleSheet.create({
  button: {
    width: width / 1.2,
    paddingVertical: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
  },

  menu: {
    alignSelf: 'flex-start',
    width: width / 1.1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Medium',
    marginVertical: 10,
    marginLeft: 10,
  },
})
