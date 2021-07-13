import firebase from 'firebase'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getTasks, getTasksError, getTasksFinish } from '../slices/tasksSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { firestore } from '../../firebase/config'

function* getAllTasks(action: PayloadAction<{ userId: string }>) {
  const { userId } = action.payload

  const tasksRef = firestore.collection('Users').doc(userId).collection('Tasks')

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
        allTaks: taskArray,
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

function* onGetTasks() {
  yield takeLatest(getTasks.type, getAllTasks)
}

export default function* tasksSagas() {
  yield all([call(onGetTasks)])
}
