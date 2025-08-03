import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('*.html').map(file => [
          file.slice(0, -5), // Remove .html extension for the name
          resolve(__dirname, file)
        ])
      )
    }
  }
});
