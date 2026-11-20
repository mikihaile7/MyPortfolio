import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// During local development, forward API + auth calls to the Express server on :3000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
  },
})
