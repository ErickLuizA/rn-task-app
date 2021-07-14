import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { useReduxSelector } from '../../../redux/store'

import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'
import NotFound from '../../../components/NotFound'

import styles from './styles'

export default function Dashboard() {
  const { colors } = useTheme()

  const { todayTasks } = useReduxSelector(state => state.tasks)

  const { navigate } = useNavigation()

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
