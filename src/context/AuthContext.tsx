import React, { createContext, useEffect, useState, ReactChild } from 'react'
import { auth } from '../firebase/config'

interface AuthContextProps {
  signed: boolean
  signOut: () => void
  user: any // eslint-disable-line
  loading: boolean
  load: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface IAuthProviderProps {
  children: ReactChild
}

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(userState => {
      if (userState) {
        setUser(userState)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [loading])

  async function signOut() {
    await auth.signOut()
  }

  function load() {
    setLoading(true)
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signOut, loading, load }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
