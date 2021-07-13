import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import Task from '../models/Task'

interface IProgressProps {
  progressType: string
  tasks: Task[]
}

export default function Progress({ progressType, tasks }: IProgressProps) {
  const { colors } = useTheme()

  const totalTasks = tasks.length

  const doneTasks = tasks.filter(task => task.done === true)

  function getProgress(): number {
    const progress = (doneTasks.length * 100) / totalTasks

    if (doneTasks.length === 0 && totalTasks === 0) {
      return 0
    }

    return progress
  }

  return (
    <View
      style={
        progressType === 'Daily'
          ? styles.container
          : styles.notDashboardContainer
      }>
      <AnimatedCircularProgress
        size={100}
        width={16}
        fill={getProgress()}
        rotation={360}
        tintColor={colors.secondary}
        backgroundColor={colors.primary}>
        {fill => {
          return (
            <Text style={[styles.progressText, { color: colors.secondary }]}>
              {fill}%
            </Text>
          )
        }}
      </AnimatedCircularProgress>
      <View style={{ width: 20 }} />
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
    alignItems: 'center',
    marginTop: 10,
  },

  notDashboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  progressText: {
    fontSize: 24,
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
