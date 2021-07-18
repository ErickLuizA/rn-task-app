import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authSagas from './sagas/authSagas'

import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import tasksReducer from './slices/tasksSlice'
import tasksSagas from './sagas/tasksSaga'

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  tasks: tasksReducer,
})

function* rootSaga() {
  yield all([call(authSagas), call(tasksSagas)])
}

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, persistor }
