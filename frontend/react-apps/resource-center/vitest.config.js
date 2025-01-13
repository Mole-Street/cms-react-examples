import { defineConfig } from 'vitest/config.js';
import { default as react } from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
