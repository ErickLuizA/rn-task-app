import { Alert } from 'react-native'
import Google from 'expo-auth-session/providers/google'
import { auth, firebase } from '../../../firebase/config'

export default async function handleGoogleLogin() {
  const [_, response, __] = Google.useIdTokenAuthRequest({
    clientId: process.env.WEB_CLIENT_ID,
  })

  try {
    if (response?.type == 'success') {
      const { id_token } = response.params

      const googleCredential =
        firebase.auth.GoogleAuthProvider.credential(id_token)

      await auth.signInWithCredential(googleCredential)
    }
  } catch (e) {
    Alert.alert(e.message)
  }
}
