import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'

import Drawer from './Drawer'
import TaskDetail from '../screens/Application/TaskDetail'
import Account from '../screens/Application/Account'

const { Screen, Navigator } = createStackNavigator()

export default function AppRoutes() {
  const { colors } = useTheme()

  return (
    <Navigator
      initialRouteName="Drawer"
      screenOptions={{
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 400,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 400,
            },
          },
        },
      }}>
      <Screen
        name="Drawer"
        component={Drawer}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{
          title: 'Task',
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />
      <Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />
    </Navigator>
  )
}
