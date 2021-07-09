import React, { MutableRefObject } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  Divider,
  List,
  Modal,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const width = Dimensions.get('screen').width

interface IPortalModalProps {
  closeCategoryModal(): void
  isCategoryModal: boolean
  categories: string[]
  setCategory(arg: string): void
  onPress(): void
  modalCategory: MutableRefObject<string>
}

export default function PortalModal({
  closeCategoryModal,
  isCategoryModal,
  categories,
  setCategory,
  onPress,
  modalCategory,
}: IPortalModalProps) {
  const { colors } = useTheme()
  return (
    <Portal>
      <Modal
        contentContainerStyle={[
          styles.modal,
          { backgroundColor: colors.primary },
        ]}
        onDismiss={closeCategoryModal}
        visible={isCategoryModal}>
        <ScrollView>
          {categories.map(cat => (
            <List.Item
              onPress={() => setCategory(cat)}
              title={cat}
              key={cat}
              style={styles.listItem}
            />
          ))}
          <View style={styles.row}>
            <Divider style={styles.divider} />
            <Text style={[{ color: colors.text }, styles.or]}>or</Text>
            <Divider style={styles.divider} />
          </View>
          <TextInput
            testID="categoryInput"
            onChangeText={text => (modalCategory.current = text)}
            label="Category name"
            mode="flat"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={{ color: colors.secondary }}>Add Category</Text>
            <Icon name="add" size={40} color={colors.secondary} />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  button: {
    width: width / 1.25,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#cce',
  },

  input: {
    width: width / 1.25,
    marginVertical: 10,
  },

  modal: {
    flex: 0.3,
    padding: 10,
    margin: 20,
  },

  listItem: {
    backgroundColor: '#cce',
    width: width / 1.25,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  divider: {
    marginTop: 10,
    marginBottom: 10,
    height: 2,
    width: width / 3,
    marginHorizontal: 10,
  },

  or: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    marginBottom: 10,
  },
})
