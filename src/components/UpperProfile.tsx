import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useReduxSelector } from '../redux/store'

interface IUpperProfileProps {
  openPhoto: () => void
}

export default function UpperProfile({ openPhoto }: IUpperProfileProps) {
  const { user } = useReduxSelector(state => state.auth)

  const { colors } = useTheme()

  return (
    <SafeAreaView
      style={[{ backgroundColor: colors.profileBackground }, styles.container]}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={openPhoto}>
          {user.photoURL ? (
            <Avatar.Image
              source={{
                uri: user.photoURL,
              }}
              size={80}
            />
          ) : (
            <Avatar.Icon icon="account" size={80} />
          )}
        </TouchableOpacity>

        <Text style={[styles.text, { color: colors.text }]}>
          Hello,{' '}
          <Text style={[styles.text, { color: colors.secondary }]}>
            {user.displayName}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  avatarContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },

  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    padding: 10,
  },
})
