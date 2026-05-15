const { validateConfession } = require('../../../server/src/utils/confessionUtils')

describe('validateConfession', () => {
  test('throws if text is empty', () => {
    expect(() => validateConfession('')).toThrow('Confession cannot be empty')
  })

  test('throws if text is only whitespace', () => {
    expect(() => validateConfession('     ')).toThrow('Confession cannot be empty')
  })

  test('throws if text exceeds 500 characters', () => {
    const longText = 'a'.repeat(501)
    expect(() => validateConfession(longText)).toThrow('Confession cannot exceed 500 characters')
  })

  test('does not throw for valid text', () => {
    expect(() => validateConfession('I never told you I was sorry')).not.toThrow()
  })

  test('accepts text that is exactly 500 characters', () => {
    const maxText = 'a'.repeat(500)
    expect(() => validateConfession(maxText)).not.toThrow()
  })
})