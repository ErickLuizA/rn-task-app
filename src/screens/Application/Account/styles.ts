import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },

  group: {
    alignSelf: 'flex-start',
    marginVertical: 20,
  },

  label: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
  },

  text: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },

  button: {
    paddingVertical: 12,
    width: '100%',
    marginVertical: 10,
    borderRadius: 4,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    backgroundColor: '#b00',
    paddingVertical: 20,
    borderRadius: 8,
    color: '#fff',
  },
})
