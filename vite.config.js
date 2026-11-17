import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Ceci permet de conserver vos alias "@" pour pointer vers le dossier /src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})