import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'

type TasksState = {
  todayTasks: Task[]
  allTasks: Task[]
  error: string
}

type TasksFinishPayload = {
  allTaks: Task[]
}

type TasksErrorPayload = {
  error: string
}

const initialState: TasksState = {
  todayTasks: [],
  allTasks: [],
  error: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    getTasksFinish: (state, action: PayloadAction<TasksFinishPayload>) => {
      const { allTaks } = action.payload

      const date = new Date()

      const day = date.getDay()

      const month = date.getDate()

      const year = date.getFullYear()

      state.allTasks = allTaks
      state.todayTasks = allTaks.filter(
        task =>
          task.date.getDay() === day &&
          task.date.getDate() === month &&
          task.date.getFullYear() === year
      )
    },
    getTasksError: (state, action: PayloadAction<TasksErrorPayload>) => {
      const { error } = action.payload

      state.error = error
    },
  },
})

export const getTasks = createAction('GET_TASKS', (userId: string) => ({
  payload: {
    userId,
  },
}))

export const { getTasksFinish, getTasksError } = tasksSlice.actions

export default tasksSlice.reducer
