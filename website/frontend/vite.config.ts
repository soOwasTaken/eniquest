import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createProxyMiddleware } from 'http-proxy-middleware'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/processPrompt': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      },
      '/checkOrder': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      },
      '/checkIndex': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      },
      '/api/users/login': {
        target: 'http://localhost:3000', // Assuming your Node.js server is running on port 3000
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      },
      '/api/users/register': {
        target: 'http://localhost:3000', // Assuming your Node.js server is running on port 3000
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      },
      '/api/current-user': {
        target: 'http://localhost:3000', // Assuming your Node.js server is running on port 3000
        changeOrigin: true,
        configure: (proxy, options) => {
          return createProxyMiddleware(proxy, options)
        }
      }
    }
  }
})
