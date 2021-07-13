import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

import Task from '../models/Task'

interface ITaskCardProps {
  taskType: string
  data: Task
}

export default function TaskCard({ taskType, data }: ITaskCardProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity>
      {data && (
        <View style={[styles.card, { backgroundColor: colors.primary }]}>
          <Text style={[{ color: colors.text }, styles.title]}>
            {data?.name}
          </Text>
          <Text style={[{ color: colors.secondary }, styles.category]}>
            {data?.category}
          </Text>
          <View style={styles.row}>
            {taskType === 'Daily' ? (
              <Text style={[{ color: colors.secondary }, styles.hour]}>
                {data.date.toLocaleTimeString().slice(0, 5)}
              </Text>
            ) : (
              <Text style={[{ color: colors.secondary }, styles.date]}>
                {data.date.toLocaleDateString()}{' '}
              </Text>
            )}
            <MaterialIcons
              name={
                data.date.toLocaleTimeString() > '18'
                  ? 'brightness-3'
                  : 'brightness-7'
              }
              color={colors.secondary}
              size={40}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 10,
    borderRadius: 4,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Roboto-BoldItalic',
  },

  category: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },

  hour: {
    fontSize: 18,
    fontFamily: 'Roboto-LightItalic',
  },

  date: {
    fontSize: 18,
    fontFamily: 'Roboto-LightItalic',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
