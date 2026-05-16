const request = require("supertest");
const app = require("../../server/src/app");

// --- POST /api/notes ---

describe("POST /api/notes", () => {
  test("creates a note and returns 201 with the new object", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({ text: "I hope you are doing well" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.text).toBe("I hope you are doing well");
    expect(res.body.createdAt).toBeDefined();
  });

  test("returns 400 if text is empty", async () => {
    const res = await request(app).post("/api/notes").send({ text: "" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("returns 400 if text exceeds 500 characters", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({ text: "a".repeat(501) });

    expect(res.status).toBe(400);
  });
});

// --- GET /api/notes ---

describe("GET /api/notes", () => {
  test("returns 200 and an array of notes", async () => {
    const res = await request(app).get("/api/notes");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("includes a previously created note in the response", async () => {
    await request(app)
      .post("/api/notes")
      .send({ text: "persistence check note" });

    const res = await request(app).get("/api/notes");
    const texts = res.body.map((n) => n.text);

    expect(texts).toContain("persistence check note");
  });
});

// --- PUT /api/notes/:id ---

describe("PUT /api/notes/:id", () => {
  test("updates a note and returns the updated object", async () => {
    const created = await request(app)
      .post("/api/notes")
      .send({ text: "Original text" });

    const id = created.body._id;

    const res = await request(app)
      .put(`/api/notes/${id}`)
      .send({ text: "Updated text" });

    expect(res.status).toBe(200);
    expect(res.body.text).toBe("Updated text");
  });

  test("returns 404 if the note does not exist", async () => {
    const res = await request(app)
      .put("/api/notes/nonexistentid")
      .send({ text: "Updated text" });

    expect(res.status).toBe(404);
  });
});

// --- DELETE /api/notes/:id ---

describe("DELETE /api/notes/:id", () => {
  test("deletes a note and returns 200", async () => {
    const created = await request(app)
      .post("/api/notes")
      .send({ text: "Delete me" });

    const id = created.body._id;
    const res = await request(app).delete(`/api/notes/${id}`);

    expect(res.status).toBe(200);
  });

  test("returns 404 when deleting a non-existent note", async () => {
    const res = await request(app).delete("/api/notes/nonexistentid");
    expect(res.status).toBe(404);
  });
});
