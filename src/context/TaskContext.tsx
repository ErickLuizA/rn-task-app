import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactChild,
} from 'react'
import { firestore } from '../firebase/config'
import { AuthContext } from './AuthContext'

export interface ITask {
  Name: string
  Category: string
  Date: Date
  Content: string
  Done: boolean
  Starred: boolean
  Progress: boolean
  Notification: boolean
}

interface ITasks {
  tasks: ITask[]
  load: () => void
}

const TaskContext = createContext({} as ITasks)

interface ITaskProviderProps {
  children: ReactChild
}

function TaskProvider({ children }: ITaskProviderProps) {
  const { user } = useContext(AuthContext)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const colRef = firestore.collection('Users')

    ;(async () => {
      const userDoc = colRef.doc(user?.uid)

      const taskDoc = await userDoc.collection('Tasks').get()

      const taskArray = []

      taskDoc.forEach(snapshot => {
        const data = snapshot.data()
        data.Date = data.Date.toDate()
        taskArray.push(data)
      })

      setLoading(false)
      setTasks(taskArray)
    })()
  }, [user, loading])

  function load() {
    setLoading(true)
  }

  return (
    <TaskContext.Provider value={{ tasks, load }}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskProvider, TaskContext }
