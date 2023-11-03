import { defineConfig } from 'vite'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import * as path from 'path'

export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
    },
  },
  plugins: [
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
    macrosPlugin(),
    react(),
  ],
})
