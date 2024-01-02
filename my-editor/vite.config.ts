/*
 * @Date: 2024-01-02 21:37:33
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 其他配置项...
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src'),
    },
  },
})
