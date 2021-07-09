import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from '../../../context/AuthContext'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const options = {
  storageOptions: {
    skipBackup: true,
  },
}

const { width, height } = Dimensions.get('screen')

export default function PhotoModal() {
  const { user, load } = useContext(AuthContext)
  const { goBack } = useNavigation()
  const [select, setSelected] = useState<string | number>('')

  // useEffect(() => {
  //   if (select === 'Edit') {
  //     ImagePicker.showImagePicker(options, res => {
  //       user
  //         ?.updateProfile({
  //           photoURL: res.uri,
  //         })
  //         .then(() => load())
  //     })
  //   }

  //   if (select === 'Delete') {
  //     user?.updateProfile({ photoURL: '' })
  //   }

  //   setSelected('')
  // }, [select, user])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="keyboard-backspace" size={40} color="#fff" />
        </TouchableOpacity>
        {/* <Picker
          style={styles.picker}
          mode="dropdown"
          pointerEvents="auto"
          selectedValue={select}
          onValueChange={value => setSelected(value)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="Edit" value="Edit" />
          <Picker.Item label="Delete" value="Delete" />
        </Picker> */}
        <Icon name="dots-vertical" size={40} color="#fff" />
      </View>
      <Image
        source={{ uri: user?.photoURL || undefined }}
        style={{ width: width, height: height / 2, bottom: height / 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingTop: 20,
    paddingHorizontal: 10,
  },

  picker: {
    position: 'absolute',
    width: 20,
    right: 20,
    top: 10,
  },
})
