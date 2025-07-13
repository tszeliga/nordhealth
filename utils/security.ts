/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitizes email input by converting to lowercase and trimming whitespace
 * @param email - Raw email input from user
 * @returns Normalized email address
 */
export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim()
}
