import { defineConfig, configDefaults } from 'vitest/config';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import sonda from 'sonda/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    sonda({ open: false }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts', 'vitest-localstorage-mock'],
    exclude: [...configDefaults.exclude, 'src/**/*.cy.{ts,tsx}'],
  },
  optimizeDeps: {
    include: ['react-dom/client', 'react', 'react-dom'],
    rolldownOptions: {
      output: {
        minify: false,
      },
    },
  },
  build: {
    sourcemap: true
  }
});
