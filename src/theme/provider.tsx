import React, { ReactChild } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { useReduxSelector } from '../redux/store'
import { CombinedDarkTheme, CombinedDefaultTheme } from './theme'

interface IThemeProviderProps {
  children: ReactChild
}

export default function ThemeProvider({ children }: IThemeProviderProps) {
  const { dark } = useReduxSelector(state => state.theme)

  const theme = dark ? CombinedDarkTheme : CombinedDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </PaperProvider>
  )
}
