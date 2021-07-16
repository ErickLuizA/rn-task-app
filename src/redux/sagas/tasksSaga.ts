import firebase from 'firebase'
import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  addTask,
  addTaskError,
  addTaskFinish,
  deleteTask,
  deleteTaskError,
  deleteTaskFinish,
  getTasks,
  getTasksError,
  getTasksFinish,
  updateTask,
  updateTaskError,
  updateTaskFinish,
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

function* updateOneTask(action: PayloadAction<{ task: Task }>) {
  const { user }: { user: firebase.User } = yield select(getAuthState)

  const { task } = action.payload

  const tasksRef = firestore
    .collection('Users')
    .doc(user.uid)
    .collection('Tasks')

  const taskWhere = tasksRef.where('name', '==', task.name)

  try {
    const doc: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      yield call([taskWhere, taskWhere.get])

    let docRef

    doc.forEach(d => {
      docRef = tasksRef.doc(d.id)
    })
    const dateString = task.date.toString()

    yield call([docRef, docRef.update], {
      ...task,
      date: new Date(Date.parse(dateString)),
    })

    yield put(updateTaskFinish())
  } catch (error) {
    const taskError = 'Error while trying to update task'

    yield put(
      updateTaskError({
        error: taskError,
      })
    )
  }
}

function* deleteOneTask(action: PayloadAction<{ task: Task }>) {
  const { user }: { user: firebase.User } = yield select(getAuthState)

  const { task } = action.payload

  const tasksRef = firestore
    .collection('Users')
    .doc(user.uid)
    .collection('Tasks')

  const taskWhere = tasksRef.where('name', '==', task.name)

  try {
    const doc: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      yield call([taskWhere, taskWhere.get])

    let docRef

    doc.forEach(d => {
      docRef = tasksRef.doc(d.id)
    })

    yield call([docRef, docRef.delete])

    yield put(deleteTaskFinish())
  } catch (error) {
    const taskError = 'Error while trying to dleete task'

    yield put(
      deleteTaskError({
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

function* onUpdateTask() {
  yield takeLatest(updateTask.type, updateOneTask)
}

function* onDeleteTask() {
  yield takeLatest(deleteTask.type, deleteOneTask)
}

function* onAddTaskFinish() {
  yield takeLatest(addTaskFinish.type, getAllTasks)
}

function* onUpdateTaskFinish() {
  yield takeLatest(updateTaskFinish.type, getAllTasks)
}

function* onDeleteTaskFinish() {
  yield takeLatest(deleteTaskFinish.type, getAllTasks)
}

export default function* tasksSagas() {
  yield all([
    call(onGetTasks),
    call(onAddTask),
    call(onAddTaskFinish),
    call(onUpdateTask),
    call(onUpdateTaskFinish),
    call(onDeleteTask),
    call(onDeleteTaskFinish),
  ])
}
