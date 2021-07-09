import React, { useContext } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Container from '../../../components/Container'
import { useTheme } from 'react-native-paper'
import UpperProfile from '../../../components/UpperProfile'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'
import { TaskContext } from '../../../context/TaskContext'
import { ScrollView } from 'react-native-gesture-handler'
import NotFound from '../../../components/NotFound'
import AppBar from '../../../components/AppBar'
import useOpenBar from '../../../hooks/useOpenBar'

export default function Dashboard() {
  const { tasks } = useContext(TaskContext)
  const { colors } = useTheme()
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  const { open, closeBar, openAppBar } = useOpenBar()

  function openDrawer() {
    navigation.openDrawer()
  }

  const checkTodayTask = () =>
    tasks.find(task => task.Date.getDate() === new Date().getDate())

  const getTodayTasks = () =>
    tasks.filter(t => t.Date.getDate() === new Date().getDate())

  return (
    <>
      {Boolean(open) && (
        <AppBar location="Dashboard" task={open} toggle={closeBar} />
      )}
      <UpperProfile openDrawer={openDrawer} />

      <Container>
        <View style={styles.flex}>
          <Progress progressType="Daily" tasks={getTodayTasks()} />
          <Text style={[{ color: colors.secondary }, styles.text]}>
            {' '}
            Daily Tasks
          </Text>
          <ScrollView>
            {checkTodayTask() ? (
              tasks.map(task => {
                if (task.Date.getDate() === new Date().getDate()) {
                  return (
                    <TaskCard
                      openAppBar={openAppBar}
                      taskType="Daily"
                      data={task}
                      key={task.Name}
                    />
                  )
                }
              })
            ) : (
              <NotFound
                label="Add a task"
                onPress={() => navigation.navigate('AddTask')}
              />
            )}
          </ScrollView>
        </View>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Medium',

    marginVertical: 20,
    marginLeft: 10,
  },

  flex: { flex: 1 },
})
