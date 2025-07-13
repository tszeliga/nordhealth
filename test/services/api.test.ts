import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiService, ApiError } from '~/services/api'
import type { SignupFormData } from '~/types'

// Mock the config module
vi.mock('~/utils/config', () => ({
  config: {
    apiBaseUrl: '/api',
    apiTimeout: 5000,
  },
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ApiService', () => {
  let apiService: ApiService

  beforeEach(() => {
    apiService = new ApiService()
    vi.clearAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with default config', () => {
      const service = new ApiService()
      expect(service).toBeInstanceOf(ApiService)
    })

    it('should initialize with custom config', () => {
      const service = new ApiService('https://custom-api.com', 15000)
      expect(service).toBeInstanceOf(ApiService)
    })
  })

  describe('signup method', () => {
    const validFormData: SignupFormData = {
      email: 'test@example.com',
      password: 'password123',
      receiveUpdates: true,
    }

    it('should return success response for valid data', async () => {
      const response = await apiService.signup(validFormData)

      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      expect(response.data?.email).toBe(validFormData.email)
      expect(response.data?.id).toMatch(/^user_\d+$/)
      expect(response.data?.createdAt).toBeDefined()
    })

    it('should return error for test email that triggers error', async () => {
      const formData = { ...validFormData, email: 'error@test.com' }
      const response = await apiService.signup(formData)

      expect(response.success).toBe(false)
      expect(response.error).toBe('Email already exists')
      expect(response.code).toBe('EMAIL_EXISTS')
    })

    it('should handle timeout scenario for specific email', async () => {
      const formData = { ...validFormData, email: 'timeout@test.com' }

      // This test will take time due to the simulated timeout
      const startTime = Date.now()
      await apiService.signup(formData)
      const endTime = Date.now()

      // Should take at least 1 second (base delay)
      expect(endTime - startTime).toBeGreaterThan(990)
    }, 15000) // Allow 15 seconds for this test
  })

  describe('ApiError class', () => {
    it('should create error with message only', () => {
      const error = new ApiError('Test error')
      expect(error.message).toBe('Test error')
      expect(error.name).toBe('ApiError')
      expect(error.code).toBeUndefined()
      expect(error.status).toBeUndefined()
    })

    it('should create error with code and status', () => {
      const error = new ApiError('Test error', 'TEST_CODE', 400)
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('TEST_CODE')
      expect(error.status).toBe(400)
    })

    it('should be instance of Error', () => {
      const error = new ApiError('Test')
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiError)
    })
  })

  describe('API response structure', () => {
    it('should have correct success response structure', async () => {
      const formData: SignupFormData = {
        email: 'success@test.com',
        password: 'password123',
        receiveUpdates: false,
      }

      const response = await apiService.signup(formData)

      expect(response).toHaveProperty('success')
      expect(response).toHaveProperty('data')
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('email')
      expect(response.data).toHaveProperty('createdAt')
    })

    it('should have correct error response structure', async () => {
      const formData: SignupFormData = {
        email: 'error@test.com',
        password: 'password123',
        receiveUpdates: false,
      }

      const response = await apiService.signup(formData)

      expect(response).toHaveProperty('success')
      expect(response).toHaveProperty('error')
      expect(response).toHaveProperty('code')
      expect(response.success).toBe(false)
    })
  })
})
