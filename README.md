<h1 align="center">Unsent Wall</h1>

---
## 📖 Overview   

- **Authors**: Nina Claudia Del Rosario, Hansen Maeve Quindao     
- **Tech Stack**: MERN (MongoDB Atlas, Express, React, Node.js)      
- **Unit Testing**: Jest + React Testing Library  
- **Integration Testing**: Jest + Supertest  
- **System / E2E Testing**: Cypress

  <p align="center">
    Inspired by the Unsent Project and Confession/Freedom Walls, the Unsent Wall is a web application where users can submit anonymous notes/confessions for anyone in the site to see. Users can also edit and delete their submissions. Created in MERN using a testing driven development.
  </p>

#### User Stories

* As a user, I want to anonymously submit confessions so that I can share them without it being obvious it was from me.
* As a user, I want to browse all of the previous submissions so that I can see all of the previous confessions by others.
* As a user, I want to edit my submissions so that I can update it with new information.

---

## Installation

```bash
# clone repository
git clone https://github.com/senqui-UP/CMSC129-Lab4-DelRosarioNCE-QuindaoHMC.git

# go to project folder
cd <project-folder>

# install dependencies
npm install

# run project
npm run dev
```

---

## Testing Strategies

The **Testing Pyramid** strategy is used to ensure application reliability, focusing on high coverage at the unit level and critical path validation at the E2E level.

#### 1. Unit Testing (The Foundation)

* **Tools:** `Jest` + `React Testing Library`
* **Focus:** Individual components, utility functions, and Mongoose models.
* **Strategy:**
* **Frontend:** Test component behavior (e.g., ensuring the confession form updates state on input) rather than implementation details.
* **Backend:** Test business logic and data validation rules in isolation using mocks for database dependencies.



#### 2. Integration Testing (The Bridge)

* **Tools:** `Jest` + `Supertest`
* **Focus:** API endpoints and Database interactions.
* **Strategy:**
* Validate the communication between Express routes and MongoDB.
* Use a dedicated **test database** (e.g., MongoDB Memory Server) to ensure tests are isolated and do not pollute production data.
* Verify CRUD operations: ensure `POST` creates a confession and `DELETE` removes the specific record identified by the unique ID.



#### 3. System / E2E Testing (The User's View)

* **Tools:** `Cypress`
* **Focus:** The "Happy Path" and full user workflows.
* **Strategy:**
* Simulate real user sessions: from landing on the wall, submitting a confession, to seeing it appear in real-time.
* Test persistence: verify that refreshing the page still displays the submitted data.
* Validate the anonymous editing logic to ensure users can only modify their own entries.


### 🛠️ TDD Workflow

Using the **Red-Green-Refactor** cycle for every feature:

1. **Red:** Write a failing test case defining the expected behavior (e.g., a test expecting a "Delete" button to exist).
2. **Green:** Write the minimum amount of code required to pass the test.
3. **Refactor:** Optimize the code for readability and performance while ensuring all tests remain passing.

---

## Screenshots

To be added in a future commit.
