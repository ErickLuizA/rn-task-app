import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { useReduxSelector } from '../../../redux/store'

import NotFound from '../../../components/NotFound'
import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'

import styles from './styles'

export default function Starred() {
  const { colors } = useTheme()
  const { starredTasks } = useReduxSelector(state => state.tasks)
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <Progress progressType="Starred" tasks={starredTasks} />
      <Text style={[styles.title, { color: colors.secondary }]}>
        Starred tasks
      </Text>
      {starredTasks.length === 0 ? (
        <NotFound label="Star one task" onPress={() => navigate('AllTask')} />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
              }}
            />
          )}
          data={starredTasks}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => <TaskCard taskType="Starred" data={item} />}
        />
      )}
    </View>
  )
}
