export const VALIDATION_RULES = {
  EMAIL: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
} as const

export const ERROR_MESSAGES = {
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    EMAIL_TOO_LONG: 'Email must be less than 254 characters',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
    PASSWORD_TOO_LONG: 'Password must be less than 128 characters',
  },
  API: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    TIMEOUT: 'Request timeout. Please try again.',
    EMAIL_EXISTS: 'This email is already registered.',
    UNKNOWN_ERROR: 'Something went wrong. Please try again.',
  },
} as const
