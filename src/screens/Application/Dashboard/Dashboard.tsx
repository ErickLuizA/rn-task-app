import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { useReduxDispatch, useReduxSelector } from '../../../redux/store'
import { getTasks } from '../../../redux/slices/tasksSlice'

import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'
import NotFound from '../../../components/NotFound'

import styles from './styles'

export default function Dashboard() {
  const dispatch = useReduxDispatch()

  const { colors } = useTheme()

  const { todayTasks } = useReduxSelector(state => state.tasks)
  const { user } = useReduxSelector(state => state.auth)

  const { navigate } = useNavigation()

  useEffect(() => {
    dispatch(getTasks(user.uid))
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Progress progressType="Daily" tasks={todayTasks} />

        <Text style={[{ color: colors.secondary }, styles.text]}>
          Daily Tasks
        </Text>

        {todayTasks.length > 0 ? (
          <FlatList
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 10,
                }}
              />
            )}
            data={todayTasks}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => <TaskCard taskType="Daily" data={item} />}
          />
        ) : (
          <NotFound label="Add a task" onPress={() => navigate('AddTask')} />
        )}
      </View>
    </>
  )
}
