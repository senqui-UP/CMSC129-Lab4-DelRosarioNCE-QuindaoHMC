import { useState, useEffect, useRef } from "react";

const COLORS = ["butter", "peach", "blush", "mint", "lilac", "sky"];
const DOODLES = [
  "heart",
  "star",
  "flower",
  "sun",
  "cloud",
  "sprout",
  "moon",
  "leaf",
  "balloon",
];
const MAX_LEN = 500;
const TOAST_MSGS = {
  add: "pinned. somewhere, someone needed that (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
  edit: "saved, softer than before ヾ(＠⌒ー⌒＠)ノ",
  delete: "taken down, gently (❁´◡`❁)",
};

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h << 5) - h + id.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function styleForNote(id) {
  const h = hashId(id);
  return {
    color: COLORS[h % COLORS.length],
    rot: ((h % 70) / 10 - 3).toFixed(2) + "deg",
    pinKind: h % 3,
    hasDoodle: h % 4 === 0,
    doodle: DOODLES[h % DOODLES.length],
  };
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "yesterday";
  return d
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toLowerCase();
}

// "to" gets encoded as the first line of text, ending with a comma.
// Display splits on the first newline if the first line ends in a comma.
function combine(to, msg) {
  const t = to.trim();
  if (!t) return msg.trim();
  const recipient = t.endsWith(",") ? t : t + ",";
  return `${recipient}\n${msg.trim()}`;
}

function splitNote(text) {
  if (!text) return { to: "", msg: "" };
  const idx = text.indexOf("\n");
  if (idx === -1) return { to: "", msg: text };
  const firstLine = text.slice(0, idx).trim();
  if (firstLine.endsWith(",")) {
    return { to: firstLine, msg: text.slice(idx + 1) };
  }
  return { to: "", msg: text };
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [toInput, setToInput] = useState("");
  const [msgInput, setMsgInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTo, setEditTo] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [newestId, setNewestId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch(() => setNotes([]));
  }, []);

  function showToast(kind) {
    setToast(TOAST_MSGS[kind]);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }

  function handleSubmit(e) {
    e?.preventDefault?.();
    if (!msgInput.trim()) return;
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: combine(toInput, msgInput) }),
    })
      .then((res) => res.json())
      .then((note) => {
        setNotes((prev) => [...prev, note]);
        setNewestId(note._id);
        setToInput("");
        setMsgInput("");
        showToast("add");
      });
  }

  function startEdit(note) {
    const { to, msg } = splitNote(note.text);
    setEditId(note._id);
    setEditTo(to);
    setEditMsg(msg);
  }

  function cancelEdit() {
    setEditId(null);
    setEditTo("");
    setEditMsg("");
  }

  function handleSave(id) {
    if (!editMsg.trim()) return;
    fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: combine(editTo, editMsg) }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setNotes((prev) => prev.map((n) => (n._id === id ? updated : n)));
        cancelEdit();
        showToast("edit");
      });
  }

  function handleDelete(id) {
    fetch(`/api/notes/${id}`, { method: "DELETE" }).then(() => {
      setNotes((prev) => prev.filter((n) => n._id !== id));
      showToast("delete");
    });
  }

  return (
    <div className="app">
      <header className="toolbar">
        <span className="wordmark">.☘︎ ݁˖ hopecore .☘︎ ݁˖</span>
      </header>

      <form className="composer composer-compact" onSubmit={handleSubmit}>
        <div className="composer-header">
          <h2 className="composer-heading">leave a little note</h2>
          <span className="composer-sub">
            give the world some of your gentleness
          </span>
        </div>

        <div className="composer-grid">
          <div className="composer-to">
            <label className="composer-label" htmlFor="to-input">
              who's it for?
            </label>
            <input
              id="to-input"
              className="composer-to-input"
              placeholder="a name, or 'anyone'"
              value={toInput}
              onChange={(e) => setToInput(e.target.value.slice(0, 48))}
              maxLength={48}
            />
          </div>

          <div className="composer-msg">
            <label className="composer-label" htmlFor="note-input-el">
              your message
            </label>
            <textarea
              id="note-input-el"
              data-testid="note-input"
              className="composer-input"
              placeholder="what do you want them to read on a hard day?"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value.slice(0, MAX_LEN))}
            />
          </div>
        </div>

        <div className="composer-row">
          <span className="char-count">
            {msgInput.length} / {MAX_LEN}
          </span>
          <button
            data-testid="submit-button"
            type="submit"
            className="btn btn-primary"
            disabled={!msgInput.trim()}
          >
            pin it up
          </button>
        </div>
      </form>

      {notes.length === 0 ? (
        <div className="empty">
          no notes yet. <br></br>
          what would you tell someone today if you knew it'd land softly?
        </div>
      ) : (
        <div className="wall" data-testid="note-list">
          {notes.map((note) => {
            const { color, rot, pinKind, hasDoodle, doodle } = styleForNote(
              note._id,
            );
            const isEditing = editId === note._id;
            const isNew = note._id === newestId;
            const { to, msg } = splitNote(note.text);
            return (
              <div
                key={note._id}
                data-testid="note-card"
                className={`sticky c-${color} ${isNew ? "sticky-new" : ""}`}
                style={{ "--rot": rot }}
              >
                {pinKind === 2 ? (
                  <img
                    className="sticky-tape"
                    src="/assets/tape-mint.svg"
                    alt=""
                  />
                ) : (
                  <img
                    className="sticky-pin"
                    src={
                      pinKind === 0 ? "/assets/pin.svg" : "/assets/pin-alt.svg"
                    }
                    alt=""
                  />
                )}

                {isEditing ? (
                  <>
                    <input
                      className="sticky-edit-to"
                      placeholder="who's it for?"
                      value={editTo}
                      onChange={(e) => setEditTo(e.target.value.slice(0, 48))}
                      maxLength={48}
                    />
                    <textarea
                      data-testid="edit-input"
                      className="sticky-edit-input"
                      value={editMsg}
                      onChange={(e) =>
                        setEditMsg(e.target.value.slice(0, MAX_LEN))
                      }
                      autoFocus
                    />
                    <div className="sticky-edit-actions">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={cancelEdit}
                      >
                        cancel
                      </button>
                      <button
                        data-testid="save-button"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleSave(note._id)}
                        disabled={!editMsg.trim()}
                      >
                        save
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sticky-actions">
                      <button
                        data-testid="edit-button"
                        type="button"
                        className="btn-icon"
                        onClick={() => startEdit(note)}
                        aria-label="edit"
                      >
                        <img src="/assets/pencil.svg" alt="" />
                      </button>
                      <button
                        data-testid="delete-button"
                        type="button"
                        className="btn-icon"
                        onClick={() => handleDelete(note._id)}
                        aria-label="delete"
                      >
                        <img src="/assets/x.svg" alt="" />
                      </button>
                    </div>
                    {to && <div className="sticky-to">{to}</div>}
                    <p className="sticky-text">{msg}</p>
                    <div className="sticky-meta">
                      {formatDate(note.updatedAt || note.createdAt)}
                    </div>
                  </>
                )}

                {hasDoodle && !isEditing && (
                  <img
                    className="sticky-doodle"
                    src={`/assets/${doodle}-doodle.svg`}
                    alt=""
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
