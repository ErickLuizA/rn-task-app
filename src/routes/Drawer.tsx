import React from 'react'
import { Text } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { useReduxSelector } from '../redux/store'

import Dashboard from '../screens/Application/Dashboard'
import AddTask from '../screens/Application/AddTask'
import Starred from '../screens/Application/Starred'
import Done from '../screens/Application/Done'
import AllTask from '../screens/Application/AllTask'
import Settings from '../screens/Application/Settings'

const { Screen, Navigator } = createDrawerNavigator()

export default function Drawer() {
  const { user } = useReduxSelector(state => state.auth)

  const { colors } = useTheme()

  const userPhoto = user.providerData[0].photoURL ?? user.photoURL

  const validUserPhoto = userPhoto.includes('content://') ? false : true

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
            <Text style={{ color: colors.secondary }}> Dashboard </Text>
          ),
          drawerIcon: () =>
            validUserPhoto ? (
              <Avatar.Image
                source={{
                  uri: userPhoto,
                }}
              />
            ) : (
              <Avatar.Icon icon="account" />
            ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />

      <Screen
        name="Starred"
        component={Starred}
        options={{
          drawerLabel: () => (
            <Text style={{ color: colors.secondary }}>Starred</Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="star-outline" color={colors.secondary} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />

      <Screen
        name="Done"
        component={Done}
        options={{
          drawerLabel: () => (
            <Text style={{ color: colors.secondary }}> Done </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="check" color={colors.secondary} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />

      <Screen
        name="AllTask"
        component={AllTask}
        options={{
          drawerLabel: () => (
            <Text style={{ color: colors.secondary }}>All Tasks</Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="file-document" color={colors.secondary} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
          title: 'All Tasks',
        }}
      />

      <Screen
        name="AddTask"
        component={AddTask}
        options={{
          drawerLabel: () => (
            <Text style={{ color: colors.secondary }}>Add Task</Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="plus" color={colors.secondary} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
          headerTitle: 'Add Task',
        }}
      />

      <Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: () => (
            <Text style={{ color: colors.secondary }}> Settings </Text>
          ),
          drawerIcon: () => (
            <Avatar.Icon icon="cog-outline" color={colors.secondary} />
          ),
          headerShown: true,
          headerStyle: { backgroundColor: colors.profileBackground },
          headerTintColor: colors.secondary,
        }}
      />
    </Navigator>
  )
}
