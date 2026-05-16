const VALIDATION_RULES = {
  MAX_LENGTH: 500,
  ERRORS: {
    EMPTY: 'Oops, you forgot to write your message! (*/ω＼*)',
    TOO_LONG: 'Sorry, your message is too long! Please keep it under 500 characters (o゜▽゜)o☆',
  },
}
function validateNote(text) {
  if (!text || text.trim() === '') {
    throw new Error(VALIDATION_RULES.ERRORS.EMPTY)
  }
  if (text.length > VALIDATION_RULES.MAX_LENGTH) {
    throw new Error(VALIDATION_RULES.ERRORS.TOO_LONG)
  }
}

function formatNote(text) {
  return {
    text,
    createdAt: new Date().toISOString(),
  }
}

module.exports = { validateNote, formatNote, VALIDATION_RULES }
