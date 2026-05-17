// User Story 1: CREATE - I want to anonymously submit notes so that I can share more kindness to the world
describe('Submit a note', () => {
  it('allows a user to submit a new note', () => {
    cy.visit('/')
    cy.get('[data-testid="note-input"]').type('I hope you are doing well')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="note-card"]').should('contain', 'I hope you are doing well')
  })
})

// User Story 2: READ - I want to browse all of the previous submissions so that I can see all of the previous messages by others
describe('Read all notes', () => {
  it('displays all existing notes on page load', () => {
    cy.visit('/')
    cy.get('[data-testid="note-list"]').should('exist')
    cy.get('[data-testid="note-card"]').should('have.length.greaterThan', 0)
  })

  it('persists notes after a page refresh', () => {
    cy.visit('/')
    cy.get('[data-testid="note-input"]').type('This note should survive a refresh')
    cy.get('[data-testid="submit-button"]').click()
    cy.reload()
    cy.get('[data-testid="note-card"]').should('contain', 'This note should survive a refresh')
  })
})

// User Story 3: UPDATE - I want to edit my own submissions so that I can correct any mistakes or update the information
describe('Edit a note', () => {
  it('allows a user to edit their own note', () => {
    cy.visit('/')
    cy.get('[data-testid="note-input"]').type('Original message')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="note-card"]').first().find('[data-testid="edit-button"]').click()
    cy.get('[data-testid="edit-input"]').clear().type('Updated message')
    cy.get('[data-testid="save-button"]').click()
    cy.get('[data-testid="note-card"]').should('contain', 'Updated message')
  })
})

// User Story: Delete a submission
describe('Delete a note', () => {
  it('allows a user to delete their own note', () => {
    cy.visit('/')
    cy.get('[data-testid="note-input"]').type('This note will be deleted')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="note-card"]').first().find('[data-testid="delete-button"]').click()
    cy.get('[data-testid="note-card"]').should('not.contain', 'This note will be deleted')
  })
})