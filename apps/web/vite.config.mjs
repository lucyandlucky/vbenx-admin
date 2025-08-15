import { defineConfig } from '@vbenx/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
