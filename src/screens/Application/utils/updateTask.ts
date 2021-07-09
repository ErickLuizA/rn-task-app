import { firestore } from '../../../firebase/config'

interface updateTaskProps {
  user?: string
  star: boolean | undefined
  notifications: boolean | undefined
  task: string
  load: () => void
}

export default async function updateTask({
  user,
  star,
  notifications,
  task,
  load,
}: updateTaskProps) {
  const colRef = firestore.collection('Users').doc(user).collection('Tasks')
  const tasks = await colRef.where('Name', '==', task).get()

  if (star === undefined) {
    tasks.forEach(t => {
      colRef.doc(t.id).update({
        Notification: notifications,
      })
    })
  }

  if (notifications === undefined) {
    tasks.forEach(t => {
      colRef.doc(t.id).update({
        Starred: star,
      })
    })
  }

  load()
}
