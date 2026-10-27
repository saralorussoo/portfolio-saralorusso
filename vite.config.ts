import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from https://<user>.github.io/portfolio-saralorusso/
  // so every built asset URL (JS, CSS, fonts, images) must carry this prefix.
  base: '/portfolio-saralorusso/',
})
