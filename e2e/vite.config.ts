import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ reactivityTransform: true })],
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
