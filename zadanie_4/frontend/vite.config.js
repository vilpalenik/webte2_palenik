import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/zadanie_4/',
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})