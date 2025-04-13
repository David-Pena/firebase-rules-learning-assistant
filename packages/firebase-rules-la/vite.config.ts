import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['node_modules/*', 'monaco-editor', '@monaco-editor/loader', '@vueuse/core']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco': ['monaco-editor'],
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'vendor': ['vue', '@vueuse/core', '@headlessui/vue']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
