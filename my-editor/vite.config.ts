/*
 * @Date: 2024-01-02 21:37:33
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@babel/standalone']
  },
  // 其他配置项...
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
