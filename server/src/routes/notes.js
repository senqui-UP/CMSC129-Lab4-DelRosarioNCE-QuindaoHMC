const express = require("express");
const crypto = require("crypto");
const { validateNote, formatNote } = require("../utils/noteUtils");

const router = express.Router();
const notes = [];

router.post("/", (req, res) => {
  const { text } = req.body;
  try {
    validateNote(text);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  const note = { _id: crypto.randomUUID(), ...formatNote(text) };
  notes.push(note);
  return res.status(201).json(note);
});

router.get("/", (req, res) => res.status(200).json(notes));

router.put("/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  try {
    validateNote(req.body.text);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  note.text = req.body.text;
  note.updatedAt = new Date().toISOString();
  return res.status(200).json(note);
});

router.delete("/:id", (req, res) => {
  const index = notes.findIndex((n) => n._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Note not found" });
  const [deleted] = notes.splice(index, 1);
  return res.status(200).json({ deletedId: deleted._id });
});

module.exports = router;
