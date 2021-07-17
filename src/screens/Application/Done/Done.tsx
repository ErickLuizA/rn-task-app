import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { useReduxSelector } from '../../../redux/store'

import NotFound from '../../../components/NotFound'
import TaskCard from '../../../components/TaskCard'

import styles from './styles'

export default function Starred() {
  const { colors } = useTheme()

  const { doneTasks } = useReduxSelector(state => state.tasks)

  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.secondary }]}>
        Done tasks
      </Text>
      {doneTasks.length === 0 ? (
        <NotFound
          label="Complete one task"
          onPress={() => navigate('Dashboard')}
        />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
              }}
            />
          )}
          data={doneTasks}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => <TaskCard taskType="Done" data={item} />}
        />
      )}
    </View>
  )
}
