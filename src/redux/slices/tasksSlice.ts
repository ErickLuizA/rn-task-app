import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'

type TasksState = {
  todayTasks: Task[]
  allTasks: Task[]
  categories: string[]
  error: string
  addTaskError: string
}

type TasksFinishPayload = {
  allTasks: Task[]
}

type TasksErrorPayload = {
  error: string
}

const initialState: TasksState = {
  todayTasks: [],
  allTasks: [],
  categories: [],
  error: null,
  addTaskError: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    getTasksFinish: (state, action: PayloadAction<TasksFinishPayload>) => {
      const { allTasks } = action.payload

      const date = new Date()

      const day = date.getDay()

      const month = date.getDate()

      const year = date.getFullYear()

      const categories: string[] = []

      allTasks.forEach(t => {
        if (!categories.includes(t.category)) {
          categories.push(t.category)
        }
      })

      state.allTasks = allTasks
      state.todayTasks = allTasks.filter(
        task =>
          task.date.getDay() === day &&
          task.date.getDate() === month &&
          task.date.getFullYear() === year
      )
      state.categories = categories
      state.addTaskError = null
      state.error = null
    },
    getTasksError: (state, action: PayloadAction<TasksErrorPayload>) => {
      const { error } = action.payload

      state.error = error
    },
    addTaskError: (state, action: PayloadAction<TasksErrorPayload>) => {
      state.addTaskError = action.payload.error
    },
  },
})

export const getTasks = createAction('GET_TASKS')

export const addTask = createAction('ADD_TASKS', (task: Task) => ({
  payload: {
    task,
  },
}))

export const addTaskFinish = createAction('ADD_TASK_FINISH')

export const { getTasksFinish, getTasksError, addTaskError } =
  tasksSlice.actions

export default tasksSlice.reducer
