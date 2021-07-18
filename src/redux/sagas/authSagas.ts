import Firebase from 'firebase'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import { auth } from '../../firebase/config'
import {
  loginWithEmail,
  loginWithEmailFinish,
  loginWithEmailStart,
  loginWithGoogle,
  loginWithGoogleFinish,
  logout,
  logoutError,
  registerWithEmail,
  registerWithEmailFinish,
  registerWithEmailStart,
} from '../slices/authSlice'
import { PayloadAction } from '@reduxjs/toolkit'

function* signInWithEmailAndPassword(
  action: PayloadAction<{ email: string; password: string }>
) {
  yield put(loginWithEmailStart())

  const { email, password } = action.payload

  try {
    const { user } = yield call(
      [auth, auth.signInWithEmailAndPassword],
      email,
      password
    )

    yield put(
      loginWithEmailFinish({
        user: user,
        authError: null,
      })
    )
  } catch (e) {
    let authError = 'Error while trying to login'

    if (/email is invalid/.test(e)) {
      authError = 'Invalid e-mail'
    }

    if (/password is invalid/.test(e)) {
      authError = 'Invalid password'
    }

    yield put(
      loginWithEmailFinish({
        user: null,
        authError: authError,
      })
    )
  }
}

function* signUpWithEmailAndPassword(
  action: PayloadAction<{ name: string; email: string; password: string }>
) {
  yield put(registerWithEmailStart())

  const { name, email, password } = action.payload

  try {
    const { user }: { user: Firebase.User } = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password
    )

    yield call(user.updateProfile, { displayName: name })

    yield put(
      registerWithEmailFinish({
        user: user,
        authError: null,
      })
    )
  } catch (e) {
    let authError = 'Error while trying to register'

    if (/email/.test(e.code)) {
      authError = 'Invalid e-mail'
    }

    if (/password/.test(e.code)) {
      authError = 'Invalid password'
    }

    yield put(
      registerWithEmailFinish({
        user: null,
        authError: authError,
      })
    )
  }
}

function* signInWithGoogle(action: PayloadAction<{ id_token: string }>) {
  try {
    const googleCredential = Firebase.auth.GoogleAuthProvider.credential(
      action.payload.id_token
    )

    const { user } = yield call(
      [auth, auth.signInWithCredential],
      googleCredential
    )

    yield put(
      loginWithGoogleFinish({
        user: user,
        authError: null,
      })
    )
  } catch (e) {
    yield put(
      loginWithGoogleFinish({
        user: null,
        authError: 'Error while trying to login with google',
      })
    )
  }
}

function* logoutUser() {
  try {
    yield call([auth, auth.signOut])
  } catch (e) {
    yield put(
      logoutError({
        authError: 'Error while trying to logout',
      })
    )
  }
}

function* onSignInWithEmailAndPassword() {
  yield takeLatest(loginWithEmail.type, signInWithEmailAndPassword)
}

function* onSignUpWithEmailAndPassword() {
  yield takeLatest(registerWithEmail.type, signUpWithEmailAndPassword)
}

function* onSignInWithGoogle() {
  yield takeLatest(loginWithGoogle.type, signInWithGoogle)
}

function* onLogout() {
  yield takeLatest(logout.type, logoutUser)
}

export default function* authSagas() {
  yield all([
    call(onSignInWithEmailAndPassword),
    call(onSignInWithGoogle),
    call(onSignUpWithEmailAndPassword),
    call(onLogout),
  ])
}
