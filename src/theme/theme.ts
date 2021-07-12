import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native'

export const CombinedDefaultTheme = {
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
}

export const CombinedDarkTheme = {
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
  }
}
