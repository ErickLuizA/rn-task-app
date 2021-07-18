import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'

import { useReduxSelector } from '../../../../redux/store'

export default function UpperProfile() {
  const { user } = useReduxSelector(state => state.auth)

  const { colors } = useTheme()

  const userPhoto = user.providerData[0].photoURL ?? user.photoURL

  const validUserPhoto = userPhoto.includes('content://') ? false : true

  return (
    <View
      style={[styles.container, { backgroundColor: colors.profileBackground }]}>
      {validUserPhoto ? (
        <Avatar.Image
          source={{
            uri: userPhoto,
          }}
          size={80}
        />
      ) : (
        <Avatar.Icon icon="account" size={80} />
      )}

      <Text style={[styles.text, { color: colors.text }]}>
        Hello,{' '}
        <Text style={[styles.text, { color: colors.secondary }]}>
          {user.displayName}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    padding: 10,
  },
})
