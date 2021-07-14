import React, { useState } from 'react'
import { Divider, Menu, useTheme } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

// interface IHeaderProps {}

export default function HeaderRight() {
  const { colors } = useTheme()

  const [visible, setVisible] = useState(false)

  function onDismiss() {
    setVisible(false)
  }

  function open() {
    setVisible(true)
  }

  function handleSave() {}

  function handleDelete() {}

  return (
    <Menu
      contentStyle={{
        backgroundColor: colors.profileBackground,
      }}
      visible={visible}
      onDismiss={onDismiss}
      anchor={
        <MaterialIcons
          style={{ paddingRight: 12 }}
          onPress={open}
          name="more-vert"
          color={colors.secondary}
          size={24}
        />
      }>
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleSave}
        title="Save"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: colors.secondary }}
        onPress={handleDelete}
        title="Delete"
      />
    </Menu>
  )
}
