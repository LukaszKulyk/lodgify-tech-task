const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 60000,
    baseUrl: 'https://todoist.com'
  },
  env: {
    email: 'testUser1234@test.com',
    password: 'Y*ukj#4sDw',
    apiToken: 'ccca48314fd0c4852a6ffd295faf7b909b1aeb9f'
    }
});
