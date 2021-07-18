import React from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles'
import { useReduxDispatch, useReduxSelector } from '../../../redux/store'
import { toggleTheme } from '../../../redux/slices/themeSlice'

export default function Settings() {
  const { colors } = useTheme()

  const { navigate } = useNavigation()

  const dispatch = useReduxDispatch()

  const { dark } = useReduxSelector(state => state.theme)

  function handleTheme() {
    dispatch(toggleTheme())
  }

  function handleLogout() {}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigate('Account')}
        style={[{ backgroundColor: colors.primary }, styles.button]}>
        <MaterialIcons name="account-box" size={40} color={colors.secondary} />

        <Text style={[styles.buttonText, { color: colors.secondary }]}>
          Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleTheme}
        style={[{ backgroundColor: colors.primary }, styles.button]}
        testID="theme">
        {dark ? (
          <MaterialIcons
            name="brightness-7"
            size={40}
            color={colors.secondary}
          />
        ) : (
          <MaterialIcons
            name="brightness-3"
            size={40}
            color={colors.secondary}
          />
        )}

        <Text style={[styles.buttonText, { color: colors.secondary }]}>
          Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={[{ backgroundColor: colors.primary }, styles.button]}
        testID="logout">
        <MaterialIcons name="logout" size={40} color={colors.secondary} />
        <Text style={[styles.buttonText, { color: colors.secondary }]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}
