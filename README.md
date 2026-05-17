![Hopecore](/.github/Hopecore_Banner.png "Hopecore")

  <p align="center">
  <br>
    Inspired by the Unsent Project, <i>hopecore</i> is a web archive of hopeful anonymous notes to send to yourself or others. Users can also edit and delete their submissions. Created in MERN using a Test Driven Development.
  </p>

<h3 align="center"><a>https://hopecore-client.onrender.com/</a></h3>
<center>API base: <a>https://hopecore-api.onrender.com</a></center>

## 📖 Overview

- **Authors**: Nina Claudia Del Rosario, Hansen Maeve Quindao
- **Tech Stack**: MERN (MongoDB Atlas, Express, React, Node.js)
- **Unit Testing**: Jest + React Testing Library
- **Integration Testing**: Jest + Supertest
- **System / E2E Testing**: Cypress
- **CI/CD**: GitHub Actions → Render (deploy only on green main)

#### User Stories

- As a user, I want to anonymously submit notes so that I can share more kindness to the world.
- As a user, I want to browse all of the previous submissions so that I can see all of the previous messages by others.
- As a user, I want to edit my submissions so that I can update it with new information.

---

## Installation and Setup

```bash
# clone repository
git clone https://github.com/senqui-UP/CMSC129-Lab4-DelRosarioNCE-QuindaoHMC.git

# go to project folder
cd <project-folder>

# install dependencies
npm install

# dependencies for testing
npm install --save-dev @eslint/js
npm install --save-dev start-server-and-test

# run tests
npm run test:unit           #Unit Validation Testing
npm run test:integration    #Integration Testing
npm run test:e2e            #Systems Testing

# run project locally
npm run dev

```

---

## Testing Strategies

The **Testing Pyramid** strategy is used to ensure application reliability, focusing on high coverage at the unit level and critical path validation at the E2E level.

#### 1. Unit Validation

- **Tools:** `Jest` + `React Testing Library`
- **Focus:** Individual components, utility functions, and Mongoose models.

1. A message can’t be empty (validation test)
2. A message cannot exceed 500 characters (validation test)
3. A message must have time/date stamp (validation test)

**Tests:**

- **`validateConfession`**
  - Rejects an empty string; prevents blank submissions
  - Rejects whitespace-only strings; prevents invisible submissions
  - Rejects text exceeding 500 characters; enforces the message length limit
  - Accepts valid text; confirms the happy path works
  - Accepts text at exactly 500 characters to ensure the boundary is inclusive

- **`formatConfession`**
  - Returns the original text in the output object
  - Attaches a `createdAt` field automatically, no user input required
  - `createdAt` is a valid Date. Not null, not malformed
  - `createdAt` reflects the time of creation and not a hardcoded value

#### 2. Integration Testing

- **Tools:** `Jest` + `Supertest`
- **Focus:** API endpoints and Database interactions.

1. Creates a confession and returns 201
2. Returns an array of confessions with 200

**Tests:**
- **`POST /api/notes`**
  - Creates a note and returns 201 with the new object
  - Returns 400 if text is empty
  - Returns 400 if text exceeds 500 characters

- **`GET /api/notes`**
  - Returns 200 and an array of notes
  - Includes a previously created note in the response

- **`PUT /api/notes/:id`**
  - Updates a note and returns the updated object
  - Returns 404 if the note does not exist

- **`DELETE /api/notes/:id`**
  - Deletes a note and returns 200
  - Returns 404 when deleting a non-existent note

#### 3. System / E2E Testing

- **Tools:** `Cypress`
- **Focus:** The "Happy Path" and full user workflows.

1. As a user, I want to anonymously submit confessions so that I can share them without it being obvious it was from me.

**Tests:**

- **`Submit a note`**
  - Allows a user to submit a new note anonymously

- **`Read all notes`**
  - Displays all existing notes on page load
  - Persists notes after a page refresh

- **`Edit a note`**
  - Allows a user to edit their own note
  
- **`Delete a note`**  
  - Allows a user to delete their own note

--- 
## 🔄 CI/CD Pipeline and TDD Worklow
 
The workflow lives at **`.github/workflows/ci.yml`**.
 
```
push / PR
    │
    ▼
┌─────────────────────────────┐
│  job: test                  │
│  ─────────────────────────  │
│  npm ci                     │
│  eslint lint                │
│  jest unit tests            │
│  jest integration tests     │
│  cypress e2e tests          │
└──────────────┬──────────────┘
               │  all green?
               ▼
┌─────────────────────────────┐
│  job: deploy                │
│  (only on push to main)     │
│  ─────────────────────────  │
│  curl Render deploy hook    │
└─────────────────────────────┘
```
 
**Key evidence of TDD Red → Green cycle:**
 
| Phase | What to look for in GitHub Actions |
|-------|-------------------------------------|
| 🔴 **Red** | **Failing** pipeline run where tests were written before the implementation existed |
| 🟢 **Green** | **Passing** pipeline run with minimum code written to make tests pass |
| ♻️ **Refactor** | Subsequent commits keep the pipeline green while improving code quality |
 
---

## Deployment — Render
 
The app is split into two Render services defined in **`render.yaml`**:
 
| Service | Type | Root | URL |
|---------|------|------|-----|
| `hopecore-api` | Web service (Node) | `server/` | `https://hopecore-api.onrender.com` |
| `hopecore-client` | Static site (Vite build) | `client/` | `https://hopecore-client.onrender.com` |
 
---

## Reflections

One of the biggest hurdles in writing TDD code was the fact that nothing existed yet for things to be tested with, and you need to know what your app is doing before everything else. For us especially as "create what it should look like at the end and work from there," it tested our problem solving skills to think at the functions first and what exactly does our app need, which was lessened because we only focused on basic CRUD.

It was also funny in passing the commits to each other because after the Systems testing was implemented, Del Rosario opened the localhost only to be greeted with the most barebones HTML only looking version of hopecore out there. 

It has changed the way we will be writing our code now because with TDD, we can now make sure that the most fundamental parts of our code can be tested first before further feature adding to ensure nothing breaks after. That or you can see which commit breaks the fundamental features for easier debugging.

Ultimately, instead of writing code and then trying to beta test it after, the test requirements acted as a strict design blueprint, guaranteeing that the code was inherently testable and clean from the start.

--

## Screenshots

Unit Validation Green Phase  
CI pipeline showing failing tests before implementation  
![Unit Validation](/.github/UnitValidation_Red.png "Unit Validation Red Phase")

Unit Validation Green Phase  
9 tests passing after implementing `validateConfession` and `formatConfession`  
![Unit Validation](/.github/UnitValidation_Green.png "Unit Validation Green Phase")

Integration Test Red Phase  
CI pipline showing failing tests before implementation
![Integration Validation R](/.github/IntegrationValidation_Red.png "Integration Validation Red Phase")

Integration Test Green Phase  
9 tests passing after creating API endpoints
![Integration Validation G](/.github/IntegrationValidation_Green.png "Integration Validation Green Phase")

E2E Testing Red Phase  
Further screenshots in Cypress can be seen in `.github/screenshots` folder
![E2E R1](/.github/E2ETesting_Red1.png "E2E Testing Red Phase")
![E2E R2](/.github/E2ETesting_Red2.png "E2E Testing Red Phase")

E2E Testing Green Phase  
5 tests passing
![E2E G](/.github/E2ETesting_Green.png "E2E Testing Green Phase")