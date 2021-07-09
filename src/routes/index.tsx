import React, { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

import AppRoutes from './App.routes'
import AuthRoutes from './Auth.routes'

export default function Screens() {
  const { signed } = useContext(AuthContext)

  return signed ? <AppRoutes /> : <AuthRoutes />
}
