import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

import authSagas from './sagas/authSagas'

import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
})

function* rootSaga() {
  yield all([call(authSagas)])
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
