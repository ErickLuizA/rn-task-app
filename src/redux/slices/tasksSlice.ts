import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'

type TasksState = {
  todayTasks: Task[]
  allTasks: Task[]
  doneTasks: Task[]
  starredTasks: Task[]
  categories: string[]
  error: string
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
  doneTasks: [],
  starredTasks: [],
  categories: [],
  error: null,
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
      state.doneTasks = allTasks.filter(t => t.done)
      state.starredTasks = allTasks.filter(t => t.starred)
      state.categories = categories
      state.error = null
    },
    getTasksError: (state, action: PayloadAction<TasksErrorPayload>) => {
      const { error } = action.payload

      state.error = error
    },
    addTaskError: (state, action: PayloadAction<TasksErrorPayload>) => {
      state.error = action.payload.error
    },
    updateTaskError: (state, action: PayloadAction<TasksErrorPayload>) => {
      state.error = action.payload.error
    },
    deleteTaskError: (state, action: PayloadAction<TasksErrorPayload>) => {
      state.error = action.payload.error
    },
  },
})

export const getTasks = createAction('GET_TASKS')

export const addTask = createAction('ADD_TASK', (task: Task) => ({
  payload: {
    task,
  },
}))

export const updateTask = createAction('UPDATE_TASK', (task: Task) => ({
  payload: {
    task,
  },
}))

export const deleteTask = createAction('DELETE_TASK', (task: Task) => ({
  payload: {
    task,
  },
}))

export const deleteTaskFinish = createAction('DELETE_TASK_FINISH')

export const updateTaskFinish = createAction('UPDATE_TASK_FINISH')

export const addTaskFinish = createAction('ADD_TASK_FINISH')

export const {
  getTasksFinish,
  getTasksError,
  addTaskError,
  updateTaskError,
  deleteTaskError,
} = tasksSlice.actions

export default tasksSlice.reducer
