import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validateSignupForm } from '~/utils/validation'
import type { SignupFormData } from '~/types'

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should return valid for correct email', () => {
      const result = validateEmail('test@example.com')
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid for empty email', () => {
      const result = validateEmail('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Email is required')
    })

    it('should return invalid for email without @', () => {
      const result = validateEmail('testexample.com')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Please enter a valid email address')
    })

    it('should return invalid for email without domain', () => {
      const result = validateEmail('test@')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Please enter a valid email address')
    })

    it('should return invalid for email too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com'
      const result = validateEmail(longEmail)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Email must be less than 254 characters')
    })

    it('should trim and lowercase email', () => {
      const result = validateEmail('  TEST@EXAMPLE.COM  ')
      expect(result.isValid).toBe(true)
    })
  })

  describe('validatePassword', () => {
    it('should return valid for correct password', () => {
      const result = validatePassword('password123')
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should return invalid for empty password', () => {
      const result = validatePassword('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Password is required')
    })

    it('should return invalid for password too short', () => {
      const result = validatePassword('1234567')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Password must be at least 8 characters long')
    })

    it('should return invalid for password too long', () => {
      const longPassword = 'a'.repeat(129)
      const result = validatePassword(longPassword)
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Password must be less than 128 characters')
    })

    it('should return valid for password at minimum length', () => {
      const result = validatePassword('12345678')
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateSignupForm', () => {
    const validFormData: SignupFormData = {
      email: 'test@example.com',
      password: 'password123',
      receiveUpdates: false,
    }

    it('should return no errors for valid form data', () => {
      const errors = validateSignupForm(validFormData)
      expect(Object.keys(errors)).toHaveLength(0)
    })

    it('should return email error for invalid email', () => {
      const formData = { ...validFormData, email: 'invalid-email' }
      const errors = validateSignupForm(formData)
      expect(errors.email).toBe('Please enter a valid email address')
      expect(errors.password).toBeUndefined()
    })

    it('should return password error for invalid password', () => {
      const formData = { ...validFormData, password: '123' }
      const errors = validateSignupForm(formData)
      expect(errors.password).toBe('Password must be at least 8 characters long')
      expect(errors.email).toBeUndefined()
    })

    it('should return both errors for invalid email and password', () => {
      const formData = { ...validFormData, email: '', password: '' }
      const errors = validateSignupForm(formData)
      expect(errors.email).toBe('Email is required')
      expect(errors.password).toBe('Password is required')
    })
  })
})
