const express = require("express");
const crypto = require("crypto");
const { validateNote, formatNote } = require("./utils/noteUtils");

const app = express();
app.use(express.json());

const notes = [];

// POST /api/notes
app.post("/api/notes", (req, res) => {
  const { text } = req.body;
  try {
    validateNote(text);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  const note = {
    _id: crypto.randomUUID(),
    ...formatNote(text),
  };
  notes.push(note);
  return res.status(201).json(note);
});

// GET /api/notes
app.get("/api/notes", (req, res) => {
  return res.status(200).json(notes);
});

// PUT /api/notes/:id
app.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const note = notes.find((n) => n._id === id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  try {
    validateNote(text);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  note.text = text;
  note.updatedAt = new Date().toISOString();
  return res.status(200).json(note);
});

// DELETE /api/notes/:id
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n._id === id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  const [deleted] = notes.splice(index, 1);
  return res.status(200).json({ deletedId: deleted._id });
});

module.exports = app;
