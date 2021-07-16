import React, { useState } from 'react'
import { Divider, Menu, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import Task from '../../../../models/Task'

import { useReduxDispatch } from '../../../../redux/store'
import { deleteTask, updateTask } from '../../../../redux/slices/tasksSlice'

interface IHeaderRightProps {
  task: Task
}

export default function HeaderRight({ task }: IHeaderRightProps) {
  const { colors } = useTheme()

  const reduxDispatch = useReduxDispatch()

  const { goBack } = useNavigation()

  const [visible, setVisible] = useState(false)

  const [done, setDone] = useState(task.done)
  const [star, setStar] = useState(task.starred)
  const [notification, setNotification] = useState(task.notification)

  function onDismiss() {
    setVisible(false)
  }

  function open() {
    setVisible(true)
  }

  function handleSave() {
    reduxDispatch(
      updateTask({
        ...task,
        starred: star,
        done: done,
        notification: notification,
      })
    )

    goBack()
  }

  function handleStar() {
    setStar(state => !state)
  }

  function handleDone() {
    setDone(state => !state)
  }

  function handleNotification() {
    setNotification(state => !state)
  }

  function handleDelete() {
    reduxDispatch(deleteTask(task))

    goBack()
  }

  return (
    <Menu
      contentStyle={{
        backgroundColor: colors.profileBackground,
      }}
      visible={visible}
      onDismiss={onDismiss}
      anchor={
        <MaterialIcons
          style={{ paddingRight: 12 }}
          onPress={open}
          name="more-vert"
          color={colors.secondary}
          size={24}
        />
      }>
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleSave}
        icon="content-save"
        title="Save"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleStar}
        icon={star ? 'star' : 'star-outline'}
        title="Star"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleDone}
        icon={done ? 'check-all' : 'check'}
        title="Done"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleNotification}
        icon={notification ? 'bell-ring' : 'bell'}
        title="Notification"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleDelete}
        icon="delete"
        title="Delete"
      />
    </Menu>
  )
}
