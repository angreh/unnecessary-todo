import { defineConfig } from "cypress";
// import { dbSeed } from "./db";

export default defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*.spec.ts",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // on("task", {
      //   async seed() {
      //     await dbSeed();
      //     return null;
      //   },
      // });
    },
  },
});
