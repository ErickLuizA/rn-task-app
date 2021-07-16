import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useReduxDispatch } from '../../../redux/store'
import { addTask } from '../../../redux/slices/tasksSlice'

import Input from '../../../components/Input'

import styles from './styles'

export default function AddTask() {
  const { colors } = useTheme()

  const { goBack, navigate, canGoBack } = useNavigation()

  const dispatch = useReduxDispatch()

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const [displayDate, setDisplayDate] = useState('')
  const [displayTime, setDisplayTime] = useState('')

  const [taskName, setTaskName] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [content, setContent] = useState('')
  const [notificationOn, setNotificationOn] = useState(false)

  const [errors, setErrors] = useState({
    taskError: '',
    categoryError: '',
    dateError: '',
    timeError: '',
    contentError: '',
  })

  async function useHandleSubmit() {
    setErrors({
      taskError: '',
      categoryError: '',
      dateError: '',
      timeError: '',
      contentError: '',
    })

    if (taskName.length === 0) {
      return setErrors(state => ({
        ...state,
        taskError: 'Please give a name to the task',
      }))
    }

    if (!category) {
      return setErrors(state => ({
        ...state,
        categoryError: 'Please choose a category',
      }))
    }

    if (!displayDate) {
      return setErrors(state => ({
        ...state,
        dateError: 'Please select a date',
      }))
    }

    if (!displayTime) {
      return setErrors(state => ({
        ...state,
        timeError: 'Please select a time',
      }))
    }

    if (!content) {
      return setErrors(state => ({
        ...state,
        contentError: 'Please add content to your task',
      }))
    }

    const dateAndTime = date

    dateAndTime.setTime(time.getTime())

    dispatch(
      addTask({
        name: taskName,
        category,
        content,
        date: dateAndTime,
        notification: notificationOn,
        done: false,
        starred: false,
      })
    )

    if (canGoBack) {
      goBack()
    } else {
      navigate('Dashboard')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          input={taskName}
          inputName="Task Name"
          setState={setTaskName}
          color
          error={errors.taskError}
        />

        <Input
          input={category}
          inputName="category"
          setState={setCategory}
          color
          error={errors.categoryError}
        />

        {showDatePicker ? (
          <DateTimePicker
            value={date}
            is24Hour={true}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date

              const formatedDate = currentDate.toLocaleString().slice(0, 10)

              setShowDatePicker(false)
              setDisplayDate(formatedDate)
              setDate(currentDate)
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowDatePicker(true)}>
            <>
              <Text style={[{ color: colors.secondary }, styles.buttonText]}>
                {displayDate ? displayDate : 'Select a date'}
              </Text>
              <MaterialIcons color={colors.secondary} name="today" size={30} />
            </>
          </TouchableOpacity>
        )}

        {Boolean(errors.dateError) && (
          <Text style={styles.error}>{errors.dateError}</Text>
        )}

        {showTimePicker ? (
          <DateTimePicker
            value={time}
            is24Hour={true}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              const currentTime = selectedTime || time

              const formatedTime = currentTime.toLocaleString().slice(10, 20)

              setShowTimePicker(false)
              setDisplayTime(formatedTime)
              setTime(currentTime)
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowTimePicker(true)}>
            <>
              <Text style={[{ color: colors.secondary }, styles.buttonText]}>
                {displayTime ? displayTime : 'Select a time'}
              </Text>
              <MaterialIcons
                color={colors.secondary}
                name="access-time"
                size={30}
              />
            </>
          </TouchableOpacity>
        )}

        {Boolean(errors.timeError) && (
          <Text style={styles.error}>{errors.timeError}</Text>
        )}

        <TextInput
          placeholder="What to do tomorrow?"
          mode="outlined"
          multiline={true}
          numberOfLines={8}
          error={Boolean(errors.contentError)}
          value={content}
          onChangeText={setContent}
        />

        {Boolean(errors.contentError) && (
          <Text style={styles.error}>{errors.contentError}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setNotificationOn(state => !state)}>
          <Text style={[{ color: colors.secondary }, styles.buttonText]}>
            {notificationOn ? 'No reminder' : 'Set reminder'}
          </Text>

          <MaterialIcons
            color={colors.secondary}
            name={notificationOn ? 'notifications-active' : 'notifications'}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={useHandleSubmit}
          style={[styles.submitButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.submitButtonText, { color: colors.secondary }]}>
            Create Task
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
