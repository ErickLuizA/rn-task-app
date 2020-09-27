import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useTheme } from 'react-native-paper'
import { Text } from 'react-native'
import { TaskContext } from '../context/TaskContext'

interface IProgressProps {
  progressType: string
}

const width = Dimensions.get('screen').width

const Progress: React.FC<IProgressProps> = ({ progressType }) => {
  const { colors } = useTheme()
  const { tasks } = React.useContext(TaskContext)

  const totalTasks = tasks.length

  const doneTasks = tasks.filter((task) => task.Done === true)

  function getProgress(): number {
    let number = 0

    tasks.forEach((task) => {
      number += task.Progress
    })

    const progress = number / totalTasks

    return progress
  }

  return (
    <View
      style={
        progressType === 'Daily'
          ? styles.container
          : styles.notDashboardContainer
      }
      testID="progressContainer">
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={getProgress()}
        rotation={360}
        tintColor={colors.secondary}
        backgroundColor={colors.primary}>
        {(fill) => {
          return (
            <Text style={[styles.progressText, { color: colors.secondary }]}>
              {' '}
              {fill}%{' '}
            </Text>
          )
        }}
      </AnimatedCircularProgress>
      <View>
        <Text style={[styles.text, { color: colors.grayText }]}>
          {' '}
          {progressType} progress{' '}
        </Text>
        <Text style={[styles.taskText, { color: colors.grayText }]}>
          {' '}
          {doneTasks.length}/{totalTasks} tasks done{' '}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 1.2,
    alignItems: 'center',
  },

  notDashboardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width / 1.2,
    alignItems: 'center',
    marginTop: 60,
  },

  progressText: {
    fontSize: 26,
    fontFamily: 'Roboto-MediumItalic',
  },

  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },

  taskText: {
    fontSize: 18,
  },
})

export default Progress
