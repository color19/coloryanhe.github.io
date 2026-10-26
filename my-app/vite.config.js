import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Each project page is its own HTML entry so GitHub Pages can serve
// /projects/<name>/ directly without SPA routing.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        studyroom: resolve(import.meta.dirname, 'projects/studyroom/index.html'),
      },
    },
  },
})
