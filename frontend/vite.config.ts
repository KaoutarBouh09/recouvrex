import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
    pool: 'forks',
  },
});