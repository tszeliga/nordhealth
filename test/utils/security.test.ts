import { describe, it, expect } from 'vitest'
import { sanitizeEmail } from '~/utils/security'

describe('Security Utils', () => {
  describe('sanitizeEmail', () => {
    it('should convert to lowercase and trim', () => {
      const result = sanitizeEmail('  TEST@EXAMPLE.COM  ')
      expect(result).toBe('test@example.com')
    })

    it('should handle empty string', () => {
      const result = sanitizeEmail('')
      expect(result).toBe('')
    })
  })
})
