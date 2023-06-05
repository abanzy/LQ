import { defineConfig } from "cypress";

export default defineConfig({

  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    baseUrl: "https://juice-shop.herokuapp.com",
    waitForAnimations: true,
    defaultCommandTimeout: 5000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    execTimeout: 60000,
    setupNodeEvents(on, config) {
    },
  },
});