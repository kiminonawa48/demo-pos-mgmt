import react from '@vitejs/plugin-react-swc'
import path from 'path'
// import { defineConfig, loadEnv } from 'vite'
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr"
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // const env = loadEnv(mode, process.cwd(), '')
  console.log('mode', mode);
  return {
    plugins: [
      react(),
      svgr(),
      vercel()
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    base: '/',
  }
})
