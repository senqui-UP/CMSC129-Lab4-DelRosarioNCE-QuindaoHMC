function validateNote(text) {
  if (!text || text.trim() === '') {
    throw new Error('Oops, you forgot to write your message! (*/ω＼*)')
  }
  if (text.length > 500) {
    throw new Error('Sorry, your message is too long! Please keep it under 500 characters (o゜▽゜)o☆')
  }
}

function formatNote(text) {
  return {
    text,
    createdAt: new Date().toISOString(),
  }
}

module.exports = { validateNote, formatNote }
