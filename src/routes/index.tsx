import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { auth } from '../firebase/config'
import { isLogged, isNotLogged } from '../redux/slices/authSlice'
import { getTasks } from '../redux/slices/tasksSlice'
import { useReduxDispatch, useReduxSelector } from '../redux/store'

import AppRoutes from './App.routes'
import AuthRoutes from './Auth.routes'

export default function Screens() {
  const { user } = useReduxSelector(state => state.auth)

  const { colors } = useTheme()

  const dispatch = useReduxDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userState => {
      if (userState) {
        dispatch(isLogged({ user: userState }))

        dispatch(getTasks())
      } else {
        dispatch(isNotLogged())
      }
    })
  }, [])

  return user ? (
    <>
      <StatusBar backgroundColor={colors.drawerBackground} />
      <AppRoutes />
    </>
  ) : (
    <>
      <StatusBar backgroundColor={colors.drawerBackground} />
      <AuthRoutes />
    </>
  )
}
