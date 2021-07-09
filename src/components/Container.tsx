import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

interface IContainerProps {
  children: React.ReactNode
  upper?: boolean
}

export default function Container({ children, upper }: IContainerProps) {
  const { colors } = useTheme()

  return (
    <SafeAreaView
      testID="container"
      style={[
        { backgroundColor: colors.background },
        upper ? styles.smallContainer : styles.container,
      ]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallContainer: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
})
