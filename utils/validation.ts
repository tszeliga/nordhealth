import type { ValidationResult, SignupFormData, FormErrors } from '~/types'
import { VALIDATION_RULES, ERROR_MESSAGES } from './constants'
import { sanitizeEmail } from './security'

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns ValidationResult with success status and error message if invalid
 */
export const validateEmail = (email: string): ValidationResult => {
  const sanitizedEmail = sanitizeEmail(email)

  if (!sanitizedEmail) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.EMAIL_REQUIRED }
  }

  if (sanitizedEmail.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.EMAIL_TOO_LONG }
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(sanitizedEmail)) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.EMAIL_INVALID }
  }

  return { isValid: true }
}

/**
 * Validates a password based on length requirements
 * @param password - The password to validate
 * @returns ValidationResult with success status and error message if invalid
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim()) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.PASSWORD_REQUIRED }
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT }
  }

  if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_LONG }
  }

  return { isValid: true }
}

/**
 * Validates all fields in the signup form
 * @param formData - The complete form data to validate
 * @returns FormErrors object with field-specific error messages
 */
export const validateSignupForm = (formData: SignupFormData): FormErrors => {
  const errors: FormErrors = {}

  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error
  }

  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error
  }

  return errors
}
