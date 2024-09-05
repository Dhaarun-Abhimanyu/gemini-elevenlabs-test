import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gemini': {
        target: 'http://localhost:4000', // Replace with your API server
        changeOrigin: true,
      },
    },
  },
})