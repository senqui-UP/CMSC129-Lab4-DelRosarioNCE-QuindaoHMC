<h1 align="center"><i>hopecore</i></h1>

---

## 📖 Overview

- **Authors**: Nina Claudia Del Rosario, Hansen Maeve Quindao
- **Tech Stack**: MERN (MongoDB Atlas, Express, React, Node.js)
- **Unit Testing**: Jest + React Testing Library
- **Integration Testing**: Jest + Supertest
- **System / E2E Testing**: Cypress

  <p align="center">
  <br>
    Inspired by the Unsent Project, <i>hopecore</i> is a web archive of hopeful anonymous notes to send to yourself or others. Users can also edit and delete their submissions. Created in MERN using a Test Driven Development.
  </p>

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
npm install --save-dev @eslint/js

# run tests
npm run test:unit   #Unit Validation Testing
                    #Integration Testing
                    #Systems Testing

# run project
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

#### 3. System / E2E Testing

- **Tools:** `Cypress`
- **Focus:** The "Happy Path" and full user workflows.

1. As a user, I want to anonymously submit confessions so that I can share them without it being obvious it was from me.

### 🛠️ TDD Workflow

Using the **Red-Green-Refactor** cycle for every feature:

1. **Red:** Write a failing test case defining the expected behavior (e.g., a test expecting a "Delete" button to exist).
2. **Green:** Write the minimum amount of code required to pass the test.
3. **Refactor:** Optimize the code for readability and performance while ensuring all tests remain passing.

---

## Screenshots

Unit Validation Green Phase  
CI pipeline showing failing tests before implementation  
![Unit Validation](/.github/UnitValidation_Red.png "Unit Validation Red Phase")

Unit Validation Green Phase  
9 tests passing after implementing `validateConfession` and `formatConfession`  
![Unit Validation](/.github/UnitValidation_Green.png "Unit Validation Green Phase")

Integration Test Red Phase
CI pipline showing failing tests before implementation
![Integration Validation](/.github/IntegrationValidation_Red.png "Integration Validation Red Phase")

Integration Test Green Phase
9 tests passing after creating API endpoints
![Integration Validation](/.github/IntegrationValidation_Green.png "Integration Validation Red Phase")
