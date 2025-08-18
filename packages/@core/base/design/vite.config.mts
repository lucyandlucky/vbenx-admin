import { defineConfig } from '@vbenx/vite-config'

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  }
})
