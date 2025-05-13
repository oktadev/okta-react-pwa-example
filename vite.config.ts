import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
const manifestIcons = [
  {
    src: 'pwa-192.png',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: 'pwa-512.png',
    sizes: '512x512',
    type: 'image/png',
  }
]
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'My Awesome App',
        short_name: 'PWA App',
        icons: manifestIcons,
      }
    })
  ],
})
