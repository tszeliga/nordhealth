export type SuccessPageEmits = {
  startOver: []
}

export type SignupFormData = {
  email: string
  password: string
  receiveUpdates: boolean
}

export type ValidationResult = {
  isValid: boolean
  error?: string
}

export type FormErrors = {
  email?: string
  password?: string
}
