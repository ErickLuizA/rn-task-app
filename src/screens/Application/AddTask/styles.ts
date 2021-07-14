import { StyleSheet, Dimensions } from 'react-native'

const width = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 26,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
    padding: 10,
  },

  button: {
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cce',
    borderRadius: 4,
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },

  menu: {
    alignSelf: 'flex-start',
    width: width / 1.1,
  },

  submitButton: {
    paddingVertical: 20,
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
  },

  submitButtonText: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  error: {
    color: '#f00',
    textAlign: 'left',
    width: width / 1.25,
  },
})
