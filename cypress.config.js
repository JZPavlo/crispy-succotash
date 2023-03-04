const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "t4oxaz",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "http://localhost:8000/",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 12000,
    chromeWebSecurity: false
  },
});
