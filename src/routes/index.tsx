import React, { useEffect } from 'react'
import { auth } from '../firebase/config'
import { isLogged } from '../redux/slices/authSlice'
import { useReduxDispatch, useReduxSelector } from '../redux/store'

import AppRoutes from './App.routes'
import AuthRoutes from './Auth.routes'

export default function Screens() {
  const { user } = useReduxSelector(state => state.auth)

  const dispatch = useReduxDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userState => {
      if (userState) {
        dispatch(isLogged({ user: userState }))
      }
    })
  }, [])

  return user ? <AppRoutes /> : <AuthRoutes />
}
