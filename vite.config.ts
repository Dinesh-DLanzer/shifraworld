import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // relative, so the build works under any GitHub Pages sub-path
  plugins: [react(), tailwindcss()],
})
