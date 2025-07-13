import type { SignupFormData } from '~/types'
import { config, logger } from '~/utils/config'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface SignupResponse {
  id: string
  email: string
  createdAt: string
}

/**
 * Custom error class for API-related errors
 */
class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Service class for handling API requests with timeout and error handling
 */
export class ApiService {
  private baseUrl: string
  private timeout: number

  /**
   * Initialize API service with base URL and timeout configuration
   * @param baseUrl - Base URL for API requests
   * @param timeout - Request timeout in milliseconds
   */
  constructor(baseUrl = config.apiBaseUrl, timeout = config.apiTimeout) {
    this.baseUrl = baseUrl
    this.timeout = timeout
    logger.debug('ApiService initialized', { baseUrl, timeout })
  }

  /**
   * Generic HTTP request method with timeout and error handling
   * @param endpoint - API endpoint to request
   * @param options - Fetch options (method, headers, body, etc.)
   * @returns Promise resolving to typed API response
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          'HTTP_ERROR',
          response.status,
        )
      }

      const data = await response.json()
      return data
    }
    catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 'TIMEOUT')
      }

      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        'UNKNOWN_ERROR',
      )
    }
  }

  /**
   * Creates a new user account via API
   * @param formData - User signup form data (email, password, preferences)
   * @returns Promise resolving to signup response with user details
   */
  async signup(formData: SignupFormData): Promise<ApiResponse<SignupResponse>> {
    // For now, simulate API call with proper response structure
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate different scenarios for testing
    if (formData.email === 'error@test.com') {
      return {
        success: false,
        error: 'Email already exists',
        code: 'EMAIL_EXISTS',
      }
    }

    if (formData.email === 'timeout@test.com') {
      await new Promise(resolve => setTimeout(resolve, 12000)) // Force timeout
    }

    return {
      success: true,
      data: {
        id: `user_${Date.now()}`,
        email: formData.email,
        createdAt: new Date().toISOString(),
      },
    }
  }
}

export const apiService = new ApiService()
export { ApiError }
