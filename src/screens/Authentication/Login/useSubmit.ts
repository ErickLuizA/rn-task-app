import { auth } from '../../../firebase/config'
import useValidator from './useValidator'

interface IProps {
  email: string
  password: string
  setError({}): void // eslint-disable-line
}

const useSubmit = async ({ email, password, setError }: IProps) => {
  const valid = useValidator({ email, password, setError })

  if (!valid) {
    return
  }

  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (e) {
    if (/email/.test(e.code)) {
      setError({
        nameError: '',
        emailError: 'Please enter a valid e-mail',
        passwordError: '',
      })
    }

    if (/password/.test(e.code)) {
      setError({
        nameError: '',
        emailError: '',
        passwordError: 'Please enter a valid password',
      })
    }
  }
}

export default useSubmit
