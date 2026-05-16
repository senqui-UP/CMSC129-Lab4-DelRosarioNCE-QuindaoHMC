const { validateNote } = require('../../../server/src/utils/confessionUtils')

describe('validateNote', () => {
  test('throws if text is empty', () => {
    expect(() => validateNote('')).toThrow('Oops, you forgot to write your message! (*/ω＼*)')
  })

  test('throws if text is only whitespace', () => {
    expect(() => validateNote('     ')).toThrow('Oops, you forgot to write your message! (*/ω＼*)')
  })

  test('throws if text exceeds 500 characters', () => {
    const longText = 'a'.repeat(501)
    expect(() => validateNote(longText)).toThrow('Sorry, your message is too long! Please keep it under 500 characters (o゜▽゜)o☆')
  })

  test('does not throw for valid text', () => {
    expect(() => validateNote('I hope you are doing well')).not.toThrow()
  })

  test('accepts text that is exactly 500 characters', () => {
    const maxText = 'a'.repeat(500)
    expect(() => validateNote(maxText)).not.toThrow()
  })
})