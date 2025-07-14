import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite"
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  // Environment-specific configuration
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';
  const isTest = mode === 'test';

  // Backend API configuration
  const backendPort = Number(env.PORT || env.BACKEND_PORT || 8080);
  const backendHost = env.BACKEND_HOST || 'localhost';
  const backendProtocol = env.BACKEND_PROTOCOL || 'http';
  const backendUrl = `${backendProtocol}://${backendHost}:${backendPort}`;

  // Frontend server configuration
  const frontendPort = Number(env.VITE_SERVER_PORT || env.FRONTEND_PORT || 5173);
  const frontendHost = env.VITE_SERVER_HOST || env.FRONTEND_HOST || 'localhost';
  const frontendProtocol = env.VITE_SERVER_SSL === 'true' ? 'https' : 'http';
  const frontendUrl = `${frontendProtocol}://${frontendHost}:${frontendPort}`;

  // SSL configuration for development
  const sslConfig = env.VITE_SERVER_SSL === 'true' && env.VITE_SERVER_SSL_KEY && env.VITE_SERVER_SSL_CERT ? {
    key: env.VITE_SERVER_SSL_KEY,
    cert: env.VITE_SERVER_SSL_CERT,
  } : undefined;

  console.log(`🚀 Vite Config - Mode: ${mode}`);
  console.log(`📡 Backend URL: ${backendUrl}`);
  console.log(`🌐 Frontend URL: ${frontendUrl}`);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: frontendPort,
      host: frontendHost === '0.0.0.0' ? true : frontendHost,
      https: sslConfig,
      // proxy: {
      //   '/api': {
      //     target: backendUrl,
      //     changeOrigin: true,
      //     secure: false,
      //     configure: (proxy, _options) => {
      //       proxy.on('error', (err, _req, _res) => {
      //         console.log('proxy error', err);
      //       });
      //       proxy.on('proxyReq', (proxyReq, req, _res) => {
      //         console.log('Sending Request to the Target:', req.method, req.url);
      //       });
      //       proxy.on('proxyRes', (proxyRes, req, _res) => {
      //         console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
      //       });
      //     },
      //   },
      // },
    },
    build: {
      outDir: '../public/dist',
      sourcemap: isDevelopment,
      minify: isProduction,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
      __TEST__: isTest,
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
}); 