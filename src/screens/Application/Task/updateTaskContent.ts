import { firestore } from '../../../firebase/config'

interface UpdateProps {
  Content: string
  taskName: string
  user: string
  load: () => void
}

const UpdateTaskContent = async ({
  Content,
  taskName,
  user,
  load,
}: UpdateProps) => {
  const colTask = firestore.collection('Users').doc(user).collection('Tasks')

  const tasks = await colTask.where('Name', '==', taskName).get()

  tasks.forEach(t => {
    colTask.doc(t.data().id).update({
      Content,
    })
  })

  load()
}

export default UpdateTaskContent
