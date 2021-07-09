import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AppRoutesParamList } from '../../../routes/App.routes'
import { TextInput, Dimensions, View, StyleSheet } from 'react-native'
import Header from '../../../components/Header'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../../context/AuthContext'
import updateTask from './updateTaskContent'
import { TaskContext } from '../../../context/TaskContext'
import { firestore } from '../../../firebase/config'

type TaskScreenRouteProps = RouteProp<AppRoutesParamList, 'Task'>

const height = Dimensions.get('screen').height

type Props = {
  route: TaskScreenRouteProps
}

export default function Task({ route }: Props) {
  const [value, setValue] = useState('')
  const { user } = useContext(AuthContext)
  const { load } = useContext(TaskContext)

  const navigation = useNavigation()

  const colTask = firestore
    .collection('Users')
    .doc(user?.uid)
    .collection('Tasks')

  useEffect(() => {
    if (route.params.task) {
      // eslint-disable-next-line
      (async () => {
        const tasks = await colTask.where('Name', '==', route.params.task).get()

        tasks.forEach(task => {
          setValue(task.data().Content)
        })
      })()
    }
  }, [])

  const handleCheck = () => {
    if (route.params.action === 'new') {
      navigation.navigate('AddTask', { result: value })
    } else {
      if (user) {
        updateTask({
          Content: value,
          user: user?.uid,
          taskName: route.params.task,
          load,
        })
      }

      navigation.navigate(route.params.action, { result: value })
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header handleCheck={handleCheck} />,
    })
  }, [handleCheck, navigation])

  return (
    <View>
      <TextInput
        style={styles.textInput}
        multiline
        autoFocus
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: { fontSize: 26, height: height, textAlignVertical: 'top' },
})
