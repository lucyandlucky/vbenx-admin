import type { UserConfig } from 'vite'

async function getCommonConfig(): Promise<UserConfig> {
  return {
    build: {
      chunkSizeWarningLimit: 2 * 1000,
      reportCompressedSize: false,
      sourcemap: false,
    },
  }
}

export { getCommonConfig }
