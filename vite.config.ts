import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // GitHub project pages are served from /tradesource-website/.
  // Development stays at localhost:5173/ for the existing local workflow.
  base: mode === 'production' ? '/tradesource-website/' : '/',
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false }
}));
