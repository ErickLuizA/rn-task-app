interface IValidation {
  setErrors({}): void // eslint-disable-line
  task: string
  category: string
  displayDate: string
  displayTime: string
  description?: string
}

const initialState = {
  taskError: '',
  categoryError: '',
  dateError: '',
  timeError: '',
  descriptionError: '',
}

const useValidation = ({
  setErrors,
  task,
  category,
  displayDate,
  displayTime,
  description,
}: IValidation) => {
  setErrors(initialState)

  if (task.length === 0) {
    return setErrors({ ...initialState, taskError: 'Please fill this field' })
  }

  if (category.length === 0) {
    return setErrors({
      ...initialState,
      categoryError: 'Please select a category',
    })
  }

  if (displayDate.length === 0) {
    return setErrors({ ...initialState, dateError: 'Please select a date' })
  }

  if (displayTime.length === 0) {
    return setErrors({ ...initialState, timeError: 'Please select a time' })
  }

  if (description?.length === 0) {
    return setErrors({
      ...initialState,
      descriptionError: 'Please put a description',
    })
  }

  return true
}

export default useValidation
