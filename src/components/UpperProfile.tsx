import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../context/AuthContext'

const width = Dimensions.get('screen').width

interface IUpperProfileProps {
  openDrawer: () => void
  account?: boolean
  openPhoto?: () => void
}

export default function UpperProfile({
  openDrawer,
  account,
  openPhoto,
}: IUpperProfileProps) {
  const { user } = useContext(AuthContext)
  const { colors } = useTheme()

  return (
    <SafeAreaView
      testID="profileContainer"
      style={[{ backgroundColor: colors.profileBackground }, styles.container]}>
      {!account ? (
        <TouchableOpacity
          testID="menu"
          style={styles.menu}
          onPress={openDrawer}>
          <Icon name="subject" size={60} color={colors.secondary} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="keyboard-backspace" size={60} color={colors.secondary} />
        </TouchableOpacity>
      )}
      <View style={styles.avatarContainer}>
        {account ? (
          <TouchableOpacity onPress={openPhoto}>
            {user?.photoURL ? (
              <Avatar.Image
                source={{ uri: user?.photoURL }}
                size={80}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Icon icon="account" size={80} style={styles.avatar} />
            )}
          </TouchableOpacity>
        ) : user?.photoURL ? (
          <Avatar.Image
            source={{ uri: user?.photoURL }}
            size={80}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon icon="account" size={80} style={styles.avatar} />
        )}

        <Text style={[styles.text, { color: colors.text }]} testID="hello">
          Hello,{' '}
          <Text style={[styles.text, { color: colors.secondary }]}>
            {user?.displayName}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },

  menu: {
    alignSelf: 'flex-start',
    width: width / 1.1,
  },

  avatarContainer: {
    alignSelf: 'center',
    paddingTop: 20,
  },

  avatar: {
    alignSelf: 'center',
  },

  text: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    padding: 10,
  },
})
