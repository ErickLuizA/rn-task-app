import Firebase from 'firebase'
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

type AuthState = {
  loading: boolean
  loginError: string
  registerError: string
  googleError: string
  user: Firebase.User
}

type LoginFinishPayload = {
  user: Firebase.User
  authError: string
}

type IsLoggedPayload = {
  user: Firebase.User
}

const initialState: AuthState = {
  loading: false,
  loginError: null,
  registerError: null,
  googleError: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginWithEmailStart: state => {
      state.loading = true
    },
    loginWithEmailFinish: (
      state,
      action: PayloadAction<LoginFinishPayload>
    ) => {
      state.loading = false
      state.loginError = action.payload.authError
      state.user = action.payload.user
    },
    registerWithEmailStart: state => {
      state.loading = true
    },
    registerWithEmailFinish: (
      state,
      action: PayloadAction<LoginFinishPayload>
    ) => {
      state.loading = false
      state.registerError = action.payload.authError
      state.user = action.payload.user
    },
    loginWithGoogleFinish: (
      state,
      action: PayloadAction<LoginFinishPayload>
    ) => {
      state.loading = false
      state.googleError = action.payload.authError
      state.user = action.payload.user
    },
    dismissGoogleError: state => {
      state.googleError = null
    },
    isLogged: (state, action: PayloadAction<IsLoggedPayload>) => {
      state.user = action.payload.user
    },
    isNotLogged: state => {
      state.user = null
    },
  },
})

export const loginWithEmail = createAction(
  'LOGIN_WITH_EMAIL',
  (email: string, password: string) => ({
    payload: {
      email,
      password,
    },
  })
)

export const registerWithEmail = createAction(
  'REGISTER_WITH_EMAIL',
  (name: string, email: string, password: string) => ({
    payload: {
      name,
      email,
      password,
    },
  })
)

export const loginWithGoogle = createAction(
  'LOGIN_WITH_GOOGLE',
  (id_token: string) => ({
    payload: {
      id_token,
    },
  })
)

export const {
  loginWithEmailFinish,
  loginWithEmailStart,
  loginWithGoogleFinish,
  registerWithEmailFinish,
  registerWithEmailStart,
  dismissGoogleError,
  isLogged,
  isNotLogged,
} = authSlice.actions

export default authSlice.reducer
