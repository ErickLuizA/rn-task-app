import React, { useState } from 'react'
import { SectionList, Text, View } from 'react-native'
import { List, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import { useReduxSelector } from '../../../redux/store'

import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'
import NotFound from '../../../components/NotFound'

import styles from './styles'

export default function AllTask() {
  const { colors } = useTheme()

  const { sectionsTask, allTasks } = useReduxSelector(state => state.tasks)

  const { navigate } = useNavigation()

  const [showing, setShowing] = useState([])

  function handleOpenCategory(category: string) {
    if (showing.includes(category)) {
      setShowing(state => state.filter(cat => cat !== category))
    } else {
      setShowing(state => [...state, category])
    }
  }

  return (
    <View style={styles.container}>
      <Progress progressType="All" tasks={allTasks} />

      <Text style={[styles.title, { color: colors.secondary }]}>All tasks</Text>

      {sectionsTask.length > 0 ? (
        <SectionList
          sections={sectionsTask}
          keyExtractor={(item, index) => item.name + index}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
              }}
            />
          )}
          renderItem={({ item }) =>
            showing.includes(item.category) ? (
              <TaskCard taskType="All" data={item} />
            ) : null
          }
          renderSectionHeader={({ section }) => (
            <List.Accordion
              titleStyle={[styles.listTitle, { color: colors.secondary }]}
              style={{
                paddingHorizontal: 0,
              }}
              title={section.category}
              onPress={() => handleOpenCategory(section.category)}>
              {section.renderItem}
            </List.Accordion>
          )}
        />
      ) : (
        <NotFound label="Add one" onPress={() => navigate('AddTask')} />
      )}
    </View>
  )
}
