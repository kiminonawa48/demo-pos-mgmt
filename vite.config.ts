import react from '@vitejs/plugin-react-swc'
import path from 'path'
// import { defineConfig, loadEnv } from 'vite'
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {

  console.log('mode', mode);
  return {
    plugins: [
      react(),
      svgr(),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    base: '/',
  }
})
