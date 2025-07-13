import { ref, reactive } from 'vue'
import type { SignupFormData, FormErrors } from '~/types'
import { validateSignupForm } from '~/utils/validation'
import { apiService, ApiError } from '~/services/api'
import { ERROR_MESSAGES } from '~/utils/constants'

export const useSignupForm = () => {
  const formData = reactive<SignupFormData>({
    email: '',
    password: '',
    receiveUpdates: false,
  })

  const errors = reactive<FormErrors>({})
  const isSubmitting = ref(false)
  const showPassword = ref(false)

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) {
      errors[field] = undefined
    }
  }

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const resetForm = () => {
    formData.email = ''
    formData.password = ''
    formData.receiveUpdates = false
    Object.keys(errors).forEach((key) => {
      errors[key as keyof FormErrors] = undefined
    })
    isSubmitting.value = false
    showPassword.value = false
  }

  const submitForm = async (onSuccess?: (data: SignupFormData) => void): Promise<boolean> => {
    isSubmitting.value = true

    Object.keys(errors).forEach((key) => {
      errors[key as keyof FormErrors] = undefined
    })

    const validationErrors = validateSignupForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      Object.assign(errors, validationErrors)
      isSubmitting.value = false
      return false
    }

    try {
      const response = await apiService.signup(formData)

      if (!response.success) {
        const errorMessage = getErrorMessage(response.error, response.code)

        if (response.code === 'EMAIL_EXISTS') {
          errors.email = errorMessage
        }
        else {
          console.error('Signup API error:', response.error)
        }

        isSubmitting.value = false
        return false
      }

      const result = { ...formData }

      if (onSuccess) {
        onSuccess(result)
      }

      resetForm()
      return true
    }
    catch (error) {
      console.error('Signup failed:', error)

      let errorMessage: string = ERROR_MESSAGES.API.UNKNOWN_ERROR

      if (error instanceof ApiError) {
        errorMessage = getApiErrorMessage(error.code)
      }

      console.error('Error message:', errorMessage)

      isSubmitting.value = false
      return false
    }
  }

  const getErrorMessage = (error?: string, code?: string): string => {
    if (code === 'EMAIL_EXISTS') {
      return ERROR_MESSAGES.API.EMAIL_EXISTS
    }
    return error || ERROR_MESSAGES.API.UNKNOWN_ERROR
  }

  const getApiErrorMessage = (code?: string): string => {
    switch (code) {
      case 'TIMEOUT':
        return ERROR_MESSAGES.API.TIMEOUT
      case 'HTTP_ERROR':
        return ERROR_MESSAGES.API.NETWORK_ERROR
      default:
        return ERROR_MESSAGES.API.UNKNOWN_ERROR
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    clearFieldError,
    togglePasswordVisibility,
    resetForm,
    submitForm,
  }
}
