import { useState, useEffect } from 'react'

export default function App() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editInput, setEditInput] = useState('')

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  function handleSubmit() {
    if (!input.trim()) return
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
      .then(res => res.json())
      .then(note => {
        setNotes(prev => [...prev, note])
        setInput('')
      })
  }

  function handleEdit(note) {
    setEditId(note._id)
    setEditInput(note.text)
  }

  function handleSave(id) {
    fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editInput }),
    })
      .then(res => res.json())
      .then(updated => {
        setNotes(prev => prev.map(n => n._id === id ? updated : n))
        setEditId(null)
        setEditInput('')
      })
  }

  function handleDelete(id) {
    fetch(`/api/notes/${id}`, { method: 'DELETE' })
      .then(() => setNotes(prev => prev.filter(n => n._id !== id)))
  }

  return (
    <div>
      <h1>hopecore</h1>

      <textarea
        data-testid="note-input"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button data-testid="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      <div data-testid="note-list">
        {notes.map(note => (
          <div key={note._id} data-testid="note-card">
            {editId === note._id ? (
              <>
                <input
                  data-testid="edit-input"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                />
                <button data-testid="save-button" onClick={() => handleSave(note._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{note.text}</span>
                <button data-testid="edit-button" onClick={() => handleEdit(note)}>
                  Edit
                </button>
                <button data-testid="delete-button" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}