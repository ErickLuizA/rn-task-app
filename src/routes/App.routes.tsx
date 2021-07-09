import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Drawer from './Drawer'
import Task from '../screens/Application/Task'
import Account from '../screens/Application/Account'
import PhotoModal from '../screens/Application/PhotoModal'

export type AppRoutesParamList = {
  Drawer: { result: string }
  Task: { action: string; task: string }
  AddTask: { result: string }
  Account: Record<string, unknown>
  PhotoModal: Record<string, unknown>
}

const { Screen, Navigator } = createStackNavigator<AppRoutesParamList>()

export default function AppRoutes() {
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
      <Screen name="Task" component={Task} />
      <Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Screen
        name="PhotoModal"
        component={PhotoModal}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}
