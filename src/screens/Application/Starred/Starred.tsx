import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppBar from '../../../components/AppBar'
import Container from '../../../components/Container'
import NotFound from '../../../components/NotFound'
import Progress from '../../../components/Progress'
import TaskCard from '../../../components/TaskCard'
import { ITask, TaskContext } from '../../../context/TaskContext'
import useOpenBar from '../../../hooks/useOpenBar'

const width = Dimensions.get('screen').width

export default function Starred() {
  const { tasks } = useContext(TaskContext)
  const { colors } = useTheme()
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  const [starredTasks, setStarredTasks] = useState<ITask[]>([])

  const { open, closeBar, openAppBar } = useOpenBar()

  useEffect(() => {
    const starred = tasks.filter(t => t.Starred === true)

    setStarredTasks(starred)
  }, [tasks])

  function openDrawer() {
    navigation.openDrawer()
  }

  function handleStar() {
    navigation.navigate('AllTask')
  }

  return (
    <>
      {Boolean(open) && (
        <AppBar location="Dashboard" task={open} toggle={closeBar} />
      )}
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          testID="menu"
          style={styles.menu}
          onPress={openDrawer}>
          <Icon name="subject" size={60} color={colors.secondary} />
        </TouchableOpacity>
        <Container>
          <Progress progressType="Starred" tasks={starredTasks} />
          <Text style={[styles.title, { color: colors.secondary }]}>
            Starred tasks
          </Text>
          <ScrollView>
            {starredTasks.length === 0 ? (
              <NotFound label="Star one task" onPress={handleStar} />
            ) : (
              starredTasks.map(star => (
                <TaskCard
                  key={star.Name}
                  openAppBar={openAppBar}
                  taskType="starred"
                  data={star}
                />
              ))
            )}
          </ScrollView>
        </Container>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: width / 1.2,
    paddingVertical: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Roboto-Light',
  },

  menu: {
    alignSelf: 'flex-start',
    width: width / 1.1,
  },

  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },

  title: {
    fontSize: 26,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Medium',
    marginVertical: 10,
    marginLeft: 10,
  },
})
