import { firestore } from '../../../firebase/config'

interface DeleteTaskProps {
  user?: string
  task: string
  load: () => void
}

export default async function deleteTask({
  user,
  task,
  load,
}: DeleteTaskProps) {
  const colRef = firestore.collection('Users').doc(user).collection('Tasks')
  const tasks = await colRef.where('Name', '==', task).get()

  tasks.forEach(t => {
    colRef.doc(t.id).delete()
  })

  load()
}
