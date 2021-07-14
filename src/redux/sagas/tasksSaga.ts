import firebase from 'firebase'
import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  addTask,
  addTaskError,
  addTaskFinish,
  getTasks,
  getTasksError,
  getTasksFinish,
} from '../slices/tasksSlice'
import { firestore } from '../../firebase/config'
import { RootState } from '../store'
import { PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'

const getAuthState = (state: RootState) => state.auth

function* getAllTasks() {
  const { user }: { user: firebase.User } = yield select(getAuthState)

  const tasksRef = firestore
    .collection('Users')
    .doc(user.uid)
    .collection('Tasks')

  try {
    const taskDocs: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      yield call([tasksRef, tasksRef.get])

    const taskArray = []

    taskDocs.forEach(taskDoc => {
      const data = taskDoc.data()

      data.date = data.date.toDate()

      taskArray.push(data)
    })

    yield put(
      getTasksFinish({
        allTasks: taskArray,
      })
    )
  } catch (error) {
    const taskError = 'Error while getting tasks from database'

    yield put(
      getTasksError({
        error: taskError,
      })
    )
  }
}

function* addOneTask(action: PayloadAction<{ task: Task }>) {
  const { user }: { user: firebase.User } = yield select(getAuthState)

  const { task } = action.payload

  const tasksRef = firestore
    .collection('Users')
    .doc(user.uid)
    .collection('Tasks')

  try {
    yield call([tasksRef, tasksRef.add], task)

    yield put(addTaskFinish())
  } catch (error) {
    const taskError = 'Error while trying to add task'

    yield put(
      addTaskError({
        error: taskError,
      })
    )
  }
}

function* onGetTasks() {
  yield takeLatest(getTasks.type, getAllTasks)
}

function* onAddTask() {
  yield takeLatest(addTask.type, addOneTask)
}

function* onAddTaskFinish() {
  yield takeLatest(addTaskFinish.type, getAllTasks)
}

export default function* tasksSagas() {
  yield all([call(onGetTasks), call(onAddTask), call(onAddTaskFinish)])
}
