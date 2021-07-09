import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { Snackbar, useTheme } from 'react-native-paper'
import React, { useContext, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import Container from '../../../components/Container'
import UpperProfile from '../../../components/UpperProfile'
import { AuthContext } from '../../../context/AuthContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../../../components/Button'
import { auth } from '../../../firebase/config'

const { height, width } = Dimensions.get('screen')

export default function Account() {
  const { goBack, navigate } =
    useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { colors } = useTheme()
  const { user, load } = useContext(AuthContext)
  const [snack, setSnack] = useState(false)

  const open = () => {
    goBack()
  }

  const openPhoto = () => {
    navigate('PhotoModal')
  }

  const handleDelete = () => {
    Alert.alert('Are you sure?', 'This will delete your account', [
      {
        text: 'Ok',
        onPress: () =>
          user
            ?.delete()
            .then(() => load())
            .then(() => true),
      },
      { text: 'Cancel', onPress: () => true },
    ])
  }

  const handleSubmit = async () => {
    try {
      if (user?.email) {
        await auth.sendPasswordResetEmail(user.email)
      }
      setSnack(true)
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <>
      <UpperProfile openPhoto={openPhoto} account openDrawer={open} />
      <Container>
        <View style={styles.group}>
          <Text style={[styles.label, { color: colors.secondary }]}>Name</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {user?.displayName}{' '}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={[styles.label, { color: colors.secondary }]}>
            E-mail
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {user?.email}{' '}
          </Text>
        </View>
        <Button onPress={handleSubmit} big text="RESET PASSWORD" />
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>

        <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
          Go check your e-mail
        </Snackbar>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  group: {
    alignSelf: 'flex-start',
    top: -height / 8,
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
    width: width / 1.25,
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
