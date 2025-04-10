import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import svgr from "vite-plugin-svgr"
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      svgr(),
      vercel()
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.PORT) || 3000,
    },
    preview: {
      port: parseInt(env.PORT) || 3000,
    },
    build: {
      chunkSizeWarningLimit: 1000
    },
    // base: process.env.VITE_BASE_PATH || "/LDB-Programing/Pos-management"
    base: '/LDB-Programing/Pos-management',
  }
})
