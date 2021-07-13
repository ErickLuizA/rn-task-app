import React from 'react'
import { Text } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useReduxSelector } from '../redux/store'

import Dashboard from '../screens/Application/Dashboard'
// import Settings from '../screens/Application/Settings'
// import AddTask from '../screens/Application/AddTask'
// import Starred from '../screens/Application/Starred'
// import Done from '../screens/Application/Done'
// import AllTask from '../screens/Application/AllTask'

const { Screen, Navigator } = createDrawerNavigator()

export default function Drawer() {
  const { user } = useReduxSelector(state => state.auth)

  const { colors } = useTheme()

  return (
    <Navigator
      initialRouteName="Dashboard"
      drawerContentOptions={{
        activeBackgroundColor: colors.activeDrawer,
      }}
      drawerStyle={{
        backgroundColor: colors.drawerBackground,
      }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabel: () => (
            <Text testID="dashboard" style={{ color: colors.secondary }}>
              {' '}
              Dashboard{' '}
            </Text>
          ),
          drawerIcon: () =>
            user?.photoURL ? (
              <Avatar.Image source={{ uri: user?.photoURL }} />
            ) : (
              <Avatar.Icon icon="account" />
            ),
        }}
      />
      {/* <Screen
        name="Starred"
        component={Starred}
        options={{
          drawerLabel: () => (
            <Text testID="starred" style={{ color: colors.secondary }}>
              {' '}
              Starred{' '}
            </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="star-outline" color={colors.secondary} />
          ),
        }}
      />

      <Screen
        name="AllTask"
        component={AllTask}
        options={{
          drawerLabel: () => (
            <Text testID="allTask" style={{ color: colors.secondary }}>
              {' '}
              All Tasks{' '}
            </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="file-document" color={colors.secondary} />
          ),
        }}
      />
      <Screen
        name="Done"
        component={Done}
        options={{
          drawerLabel: () => (
            <Text testID="done" style={{ color: colors.secondary }}>
              {' '}
              Done{' '}
            </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="file-check" color={colors.secondary} />
          ),
        }}
      />
      <Screen
        name="AddTask"
        component={AddTask}
        options={{
          drawerLabel: () => (
            <Text testID="addTask" style={{ color: colors.secondary }}>
              {' '}
              Add Task{' '}
            </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="plus" color={colors.secondary} />
          ),
        }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: () => (
            <Text testID="settings" style={{ color: colors.secondary }}>
              {' '}
              Settings{' '}
            </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="saw-blade" color={colors.secondary} />
          ),
        }}
      /> */}
    </Navigator>
  )
}
