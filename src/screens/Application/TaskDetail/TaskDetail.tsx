import React, { useState, useEffect } from 'react'
import { Alert, TextInput, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import Task from '../../../models/Task'

import HeaderRight from './components/HeaderRight'

import styles from './styles'

interface IRoute {
  params: { task: Task }
  name: string
  key: string
}

export default function TaskDetail() {
  const {
    params: { task },
  }: IRoute = useRoute()

  const { setOptions, addListener, dispatch } = useNavigation()

  const [value, setValue] = useState('')
  const hasUnsavedChanges = Boolean(value)

  useEffect(() => {
    setOptions({
      title: task.name,
      headerRight: () => <HeaderRight />,
    })
  }, [])

  useEffect(() => {
    addListener('beforeRemove', e => {
      if (!hasUnsavedChanges) {
        return
      }

      e.preventDefault()

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => null }, // eslint-disable-line
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => dispatch(e.data.action),
          },
        ]
      )
    })
  }, [])

  return (
    <View>
      <TextInput
        style={styles.textInput}
        multiline
        autoFocus
        value={value ? value : task.content}
        onChangeText={setValue}
      />
    </View>
  )
}
