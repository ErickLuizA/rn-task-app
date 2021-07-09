import React, { useContext, useEffect, useRef, useState } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from '@react-navigation/native'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../../context/AuthContext'
import { AppRoutesParamList } from '../../../routes/App.routes'
import { TaskContext } from '../../../context/TaskContext'
import useValidator from './useValidator'
import Button from './Button'
import Input from '../../../components/Input'
import PortalModal from './Portal'
import { firestore } from '../../../firebase/config'

const width = Dimensions.get('screen').width

type AddScreenRouteProps = RouteProp<AppRoutesParamList, 'Drawer'>

type Props = {
  route: AddScreenRouteProps
}

export default function AddTask({ route }: Props) {
  const { user } = useContext(AuthContext)
  const { tasks, load } = useContext(TaskContext)
  const { colors } = useTheme()

  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  const [categories, setCategories] = useState<string[]>([])

  const [task, setTask] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState({
    taskError: '',
    categoryError: '',
    dateError: '',
    timeError: '',
    descriptionError: '',
  })

  const [date, setDate] = useState(new Date())
  const [displayDate, setDisplayDate] = useState('')
  const [show, setShow] = useState(false)

  const [time, setTime] = useState(new Date())
  const [displayTime, setDisplayTime] = useState('')
  const [showTime, setShowTime] = useState(false)

  const [description, setDescription] = useState<string>()

  navigation.addListener('focus', () => setDescription(route?.params?.result))

  const [notificationOn, setNotificationOn] = useState(false)

  const [isCategoryModal, setIsCategoryModal] = useState(false)

  const modalCategory = useRef('')

  useEffect(() => {
    const array: string[] = []

    tasks.forEach(t => {
      if (!array.includes(t.Category)) {
        array.push(t.Category)
      }
    })

    setCategories(array)
  }, [tasks])

  async function useHandleSubmit() {
    const valid = useValidator({
      setErrors,
      task,
      category,
      displayDate,
      displayTime,
      description,
    })

    if (valid) {
      if (user) {
        const colRef = firestore.collection('Users')

        const userDoc = colRef.doc(user.uid)

        try {
          await userDoc.collection('Tasks').add({
            Name: task,
            Category: category,
            Date: date,
            Content: description,
            Done: false,
            Starred: false,
            Progress: false,
            Notification: notificationOn,
          })

          load()

          navigation.navigate('Dashboard')
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const openDrawer = () => navigation.openDrawer()
  const openCategoryModal = () => setIsCategoryModal(true)
  const closeCategoryModal = () => setIsCategoryModal(false)
  const handleNavigation = () => navigation.navigate('Task', { action: 'new' })

  const addCategory = () => {
    setCategory(modalCategory.current)
    setIsCategoryModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity testID="menu" style={styles.menu} onPress={openDrawer}>
        <Icon name="subject" size={60} color={colors.secondary} />
      </TouchableOpacity>
      <Text style={[{ color: colors.secondary }, styles.title]}>
        Create New Task
      </Text>
      <ScrollView contentContainerStyle={styles.view}>
        <Input
          input={task}
          inputName="Task Name"
          setState={setTask}
          color
          error={errors.taskError}
        />
        <Button wide color conditionalText onPress={openCategoryModal}>
          <>
            <Text style={[{ color: colors.secondary }, styles.buttonText]}>
              {category ? category : 'Select a category'}
            </Text>
            <Icon color={colors.secondary} name="today" size={40} />
          </>
        </Button>

        <PortalModal
          setCategory={setCategory}
          closeCategoryModal={closeCategoryModal}
          onPress={addCategory}
          categories={categories}
          isCategoryModal={isCategoryModal}
          modalCategory={modalCategory}
        />

        {/* {show ? (
          <DateTimePicker
            value={date}
            is24Hour={true}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date

              const formatedDate = currentDate.toLocaleString().slice(0, 10)
              setShow(false)
              setDisplayDate(formatedDate)
              setDate(currentDate)
            }}
          />
        ) : (
          <Button wide conditionalText color onPress={() => setShow(true)}>
            <>
              <Text style={[{ color: colors.secondary }, styles.buttonText]}>
                {displayDate ? displayDate : 'Select a date'}
              </Text>
              <Icon color={colors.secondary} name="today" size={40} />
            </>
          </Button>
        )}

        {showTime ? (
          <DateTimePicker
            value={time}
            is24Hour={true}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              const currentTime = selectedTime || time

              const formatedTime = currentTime.toLocaleString().slice(10, 20)
              setShowTime(false)
              setDisplayTime(formatedTime)
              setTime(currentTime)
            }}
          />
        ) : (
          <Button wide conditionalText color onPress={() => setShowTime(true)}>
            <>
              <Text style={[{ color: colors.secondary }, styles.buttonText]}>
                {displayTime ? displayTime : 'Select a time'}
              </Text>
              <Icon color={colors.secondary} name="access-time" size={40} />
            </>
          </Button>
        )} */}

        {!notificationOn ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setNotificationOn(true)}>
            <Text style={[{ color: colors.secondary }, styles.buttonText]}>
              Set reminder
            </Text>
            <Icon color={colors.secondary} name="notifications" size={40} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setNotificationOn(false)}>
            <Text style={[{ color: colors.secondary }, styles.buttonText]}>
              No reminder
            </Text>
            <Icon
              color={colors.secondary}
              name="notifications-active"
              size={40}
            />
          </TouchableOpacity>
        )}

        <Button conditionalText color wide onPress={handleNavigation}>
          <>
            <Text style={[{ color: colors.secondary }, styles.buttonText]}>
              {description
                ? description.substring(0, 10) + '...'
                : 'Set a description'}
            </Text>
            <Icon color={colors.secondary} name="message" size={40} />
          </>
        </Button>

        <Button onPress={useHandleSubmit} text="Create Task" big />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
    padding: 10,
  },

  button: {
    width: width / 1.25,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#cce',
  },

  buttonText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },

  menu: {
    alignSelf: 'flex-start',
    width: width / 1.1,
  },

  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
  },

  view: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
})
