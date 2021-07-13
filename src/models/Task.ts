export default interface Task {
  name: string
  category: string
  date: Date
  content: string
  done: boolean
  starred: boolean
  progress: boolean
  notification: boolean
}
