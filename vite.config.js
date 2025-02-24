import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        "/translate": {
          target: "https://api.mymemory.translated.net",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/translate/, ""),
        },
      },
    },
  });

