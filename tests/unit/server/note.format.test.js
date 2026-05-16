const { formatNote } = require('../../../server/src/utils/noteUtils')

describe('formatNote', () => {
  test('returns an object with the original text', () => {
    const result = formatNote('I hope you are doing well')
    expect(result.text).toBe('I hope you are doing well')
  })

  test('attaches a createdAt timestamp automatically', () => {
    const result = formatNote('I hope you are doing well')
    expect(result.createdAt).toBeDefined()
  })

  test('createdAt is a valid Date', () => {
    const result = formatNote('I hope you are doing well')
    expect(new Date(result.createdAt)).toBeInstanceOf(Date)
    expect(isNaN(new Date(result.createdAt).getTime())).toBe(false)
  })

  test('createdAt reflects approximately when the note was created', () => {
    const before = Date.now()
    const result = formatNote('I hope you are doing well')
    const after = Date.now()
    const ts = new Date(result.createdAt).getTime()
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })
})