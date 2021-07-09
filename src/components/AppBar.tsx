import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'

import { AuthContext } from '../context/AuthContext'
import { TaskContext } from '../context/TaskContext'

import deleteTask from '../screens/Application/utils/deleteTask'
import updateTask from '../screens/Application/utils/updateTask'

interface IAppBarProps {
  task: string
  toggle: () => void
  location: string
}

export default function AppBar({ task, toggle, location }: IAppBarProps) {
  const { colors } = useTheme()
  const { user } = useContext(AuthContext)
  const { load, tasks } = useContext(TaskContext)

  const isStarred = () => tasks.find(t => t.Name === task && t.Starred === true)
  const isNotificationOn = () =>
    tasks.find(t => t.Name === task && t.Notification === true)

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  return (
    <Appbar.Header
      style={[styles.container, { backgroundColor: colors.secondary }]}>
      <Appbar.BackAction onPress={toggle} size={30} color={colors.primary} />
      <View style={styles.row}>
        <Appbar.Action
          icon="pencil"
          color={colors.primary}
          onPress={() =>
            navigation.navigate('Task', { action: location, task })
          }
        />
        <Appbar.Action
          icon={isNotificationOn() ? 'bell-ring' : 'bell'}
          color={colors.primary}
          onPress={() =>
            updateTask({
              user: user?.uid,
              load,
              star: undefined,
              notifications: isNotificationOn() ? false : true,
              task,
            })
          }
        />
        <Appbar.Action
          icon={isStarred() ? 'star' : 'star-outline'}
          color={colors.primary}
          onPress={() =>
            updateTask({
              user: user?.uid,
              load,
              star: isStarred() ? false : true,
              notifications: undefined,
              task,
            })
          }
        />
        <Appbar.Action
          icon="delete"
          color={colors.primary}
          onPress={() =>
            deleteTask({
              user: user?.uid,
              load,
              task,
            })
          }
        />
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
  },
})
