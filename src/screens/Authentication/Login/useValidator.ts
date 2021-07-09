interface IProps {
  email: string
  password: string
  setError({}): void // eslint-disable-line
}

export default function useValidator({ email, password, setError }: IProps) {
  setError({
    emailError: '',
    passwordError: '',
  })

  if (email.length === 0) {
    return setError({
      nameError: '',
      emailError: 'You need to fill this field',
      passwordError: '',
    })
  }

  if (password.length === 0) {
    return setError({
      nameError: '',
      emailError: '',
      passwordError: 'You need to fill this field',
    })
  }

  return true
}
