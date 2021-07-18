import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { Snackbar, useTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useReduxSelector } from '../../../redux/store'
import { auth } from '../../../firebase/config'

import UpperProfile from './components/UpperProfile'
import Button from '../../../components/Button'

import styles from './styles'

export default function Account() {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { user } = useReduxSelector(state => state.auth)

  const [snack, setSnack] = useState(false)
  const [failureSendEmail, setFailureSendEmail] = useState(false)
  const [failureDelete, setFailureDelete] = useState(false)

  const handleDelete = () => {
    Alert.alert('Are you sure?', 'This will delete your account', [
      {
        text: 'Ok',
        onPress: async () => {
          try {
            auth.currentUser.delete()
          } catch (error) {
            setFailureDelete(true)
          }
        },
      },
      { text: 'Cancel', onPress: () => true },
    ])
  }

  const handleSubmit = async () => {
    try {
      await auth.sendPasswordResetEmail(user.email)

      setSnack(true)
    } catch (e) {
      setFailureSendEmail(true)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <UpperProfile openPhoto={() => navigate('PhotoModal')} />
      <View style={styles.container}>
        <View style={styles.group}>
          <Text style={[styles.label, { color: colors.secondary }]}>Name</Text>

          <Text style={[styles.text, { color: colors.text }]}>
            {user.displayName}{' '}
          </Text>
        </View>

        <View style={styles.group}>
          <Text style={[styles.label, { color: colors.secondary }]}>
            E-mail
          </Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {user.email}{' '}
          </Text>
        </View>

        <Button onPress={handleSubmit} big text="RESET PASSWORD" />

        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
        Go check your e-mail
      </Snackbar>

      <Snackbar
        visible={failureSendEmail}
        onDismiss={() => setFailureSendEmail(false)}>
        Error while trying to send e-mail reset
      </Snackbar>

      <Snackbar
        visible={failureDelete}
        onDismiss={() => setFailureDelete(false)}>
        Error while trying to delete account
      </Snackbar>
    </View>
  )
}
