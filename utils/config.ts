interface AppConfig {
  apiBaseUrl: string
  apiTimeout: number
  environment: 'development' | 'staging' | 'production'
  enableDebugMode: boolean
}

/**
 * Gets environment variable value with fallback to default
 * @param key - Environment variable key
 * @param defaultValue - Default value if env var is not set
 * @returns Environment variable value or default
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof window === 'undefined') {
    // Server-side (Nuxt SSR)
    return process.env[key] || defaultValue
  }
  // Client-side - use runtime config
  return defaultValue
}

/**
 * Gets environment variable as boolean value
 * @param key - Environment variable key
 * @param defaultValue - Default boolean value
 * @returns Boolean value from env var or default
 */
const getEnvBoolean = (key: string, defaultValue: boolean = false): boolean => {
  const value = getEnvVar(key, defaultValue.toString())
  return value.toLowerCase() === 'true'
}

/**
 * Gets environment variable as number value
 * @param key - Environment variable key
 * @param defaultValue - Default number value
 * @returns Parsed number from env var or default
 */
const getEnvNumber = (key: string, defaultValue: number = 0): number => {
  const value = getEnvVar(key, defaultValue.toString())
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

export const config: AppConfig = {
  apiBaseUrl: getEnvVar('NUXT_PUBLIC_API_BASE_URL', '/api'),
  apiTimeout: getEnvNumber('NUXT_PUBLIC_API_TIMEOUT', 10000),
  environment: (getEnvVar('NODE_ENV', 'development') as AppConfig['environment']),
  enableDebugMode: getEnvBoolean('NUXT_PUBLIC_DEBUG_MODE', false),
}

export const isDevelopment = config.environment === 'development'

/**
 * Logging utility that respects environment configuration
 * - Debug logs only show in development or when debug mode is enabled
 * - Other log levels always show
 */
export const logger = {
  /**
   * Debug level logging (only in development or debug mode)
   * @param args - Arguments to log
   */
  debug: (...args: unknown[]) => {
    if (config.enableDebugMode || isDevelopment) {
      console.debug('[DEBUG]', ...args)
    }
  },
  /**
   * Info level logging
   * @param args - Arguments to log
   */
  info: (...args: unknown[]) => {
    console.info('[INFO]', ...args)
  },
  /**
   * Warning level logging
   * @param args - Arguments to log
   */
  warn: (...args: unknown[]) => {
    console.warn('[WARN]', ...args)
  },
  /**
   * Error level logging
   * @param args - Arguments to log
   */
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args)
  },
}
