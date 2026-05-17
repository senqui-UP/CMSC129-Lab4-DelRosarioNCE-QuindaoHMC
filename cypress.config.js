const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'tests/system/e2e/**/*.cy.js',
    supportFile: 'tests/system/support/e2e.js',
  },
})