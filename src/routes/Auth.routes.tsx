import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Authentication/Home'
import Login from '../screens/Authentication/Login'
import Register from '../screens/Authentication/Register'
import Forgot from '../screens/Authentication/Forgot'

const { Screen, Navigator } = createStackNavigator()

export default function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
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
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Screen
        name="Forgot"
        component={Forgot}
        options={{
          headerTransparent: true,
          title: null,
        }}
      />
    </Navigator>
  )
}
