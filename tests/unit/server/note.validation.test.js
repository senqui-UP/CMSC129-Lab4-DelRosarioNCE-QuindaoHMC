const { validateNote, VALIDATION_RULES } = require('../../../server/src/utils/noteUtils')

describe('validateNote', () => {
  test('throws if text is empty', () => {
    expect(() => validateNote('')).toThrow(VALIDATION_RULES.ERRORS.EMPTY)
  })

  test('throws if text is only whitespace', () => {
    expect(() => validateNote('     ')).toThrow(VALIDATION_RULES.ERRORS.EMPTY)
  })

  test('throws if text exceeds 500 characters', () => {
    const longText = 'a'.repeat(VALIDATION_RULES.MAX_LENGTH + 1)
    expect(() => validateNote(longText)).toThrow(VALIDATION_RULES.ERRORS.TOO_LONG)
  })

  test('does not throw for valid text', () => {
    expect(() => validateNote('I hope you are doing well')).not.toThrow()
  })

  test('accepts text that is exactly 500 characters', () => {
    const maxText = 'a'.repeat(VALIDATION_RULES.MAX_LENGTH)
    expect(() => validateNote(maxText)).not.toThrow()
  })
})