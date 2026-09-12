import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    plugins: [
      react(),
      {
        name: 'spa-fallback-fix',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && (req.url === '/app' || req.url.startsWith('/app/') || req.url.startsWith('/app?'))) {
              req.url = '/index.html';
            }
            next();
          });
        },
      },
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['lucide-react', 'framer-motion'] // Grouping UI libs
          }
        }
      }
    }
  };
});
