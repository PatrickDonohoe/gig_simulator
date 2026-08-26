import { defineConfig } from "cypress";
import viteConfig from "./vite.config.ts";

export default defineConfig({
  allowCypressEnv: false,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: viteConfig,
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
