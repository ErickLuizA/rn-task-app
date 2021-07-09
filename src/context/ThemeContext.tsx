import React, { createContext, useEffect, useState, ReactChild } from 'react'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import phoneman from '../../assets/phoneman.svg'
import phoneman_dark from '../../assets/phoneman_dark.svg'
import notfound from '../../assets/notfound.svg'
import notfound_dark from '../../assets/notfound.svg'

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: '#EAEAFA',
    primary: '#aad',
    secondary: '#575A89',
    text: '#555',
    grayText: '#777777',
    inputBackground: '#fafafa',
    purpleInput: '#cce',
    profileBackground: '#aad',
    drawerBackground: '#aad',
    activeDrawer: '#bbe',
  },
  images: {
    phoneman,
    notfound,
  },
}
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: '#15202B',
    primary: '#aad',
    secondary: '#575A89',
    text: '#eee',
    grayText: '#777777',
    inputBackground: '#fafafa',
    purpleInput: '#cce',

    profileBackground: '#151a2b',
    drawerBackground: '#151a2b',
    activeDrawer: '#15203B',
  },
  images: {
    phoneman: phoneman_dark,
    notfound: notfound_dark,
  },
}

declare global {
  // eslint-disable-next-line
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string
      inputBackground: string
      grayText: string
      profileBackground: string
      drawerBackground: string
      purpleInput: string
      activeDrawer: string
    }

    interface images {
      phoneman: SVGElement
      notfound: SVGElement
    }
  }
}

interface ContextProps {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext({} as ContextProps)

interface IThemeProviderProps {
  children: ReactChild
}

function ThemeProvider({ children }: IThemeProviderProps) {
  const [dark, setDark] = useState(false)

  const theme = dark ? CombinedDarkTheme : CombinedDefaultTheme

  useEffect(() => {
    // eslint-disable-next-line
    (async () => {
      const storagedTheme = await AsyncStorage.getItem('@RNTheme')

      if (storagedTheme === 'dark') {
        setDark(true)
      } else {
        setDark(false)
      }
    })()
  }, [dark])

  async function toggle() {
    if (dark) {
      await AsyncStorage.setItem('@RNTheme', 'light')
    } else {
      await AsyncStorage.setItem('@RNTheme', 'dark')
    }
    setDark(state => !state)
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
