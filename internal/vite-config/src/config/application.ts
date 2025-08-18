import type { CSSOptions, UserConfig } from 'vite';

import type { DefineApplicationOptions } from '../typing';

import { defineConfig, loadEnv, mergeConfig } from 'vite';

import { loadApplicationPlugin } from '../plugins';
import { loadAnConvertEnv } from '../utils/env';
import { getCommonConfig } from './common';

function defineApplicationConfig(userConfigPromise?: DefineApplicationOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);
    const { appTitle, base, port, ...envConfig } = await loadAnConvertEnv();
    const { application = {}, vite = {} } = options || {};
    const { command, mode } = config;
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);

    const plugins = await loadApplicationPlugin({
      env,
      ...envConfig,
      ...application,
    });

    const applicationConfig: UserConfig = {
      base,
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].text',
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'jse/index-[name]-[hash].js',
          },
        },
        target: 'es2015',
      },
      css: createCssOptions(),
      esbuild: {
        drop: isBuild ? ['debugger'] : [],
        legalComments: 'none',
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            './index.html',
            './src/bootstrap.ts',
            './src/{views,layouts,router,store,api,adapter}/*',
          ],
        },
      },
    };

    const mergedCommonConfig = mergeConfig(
      await getCommonConfig(),
      applicationConfig,
    );

    return mergeConfig(mergedCommonConfig, vite);
  });
}

function createCssOptions(injectGlobalScss = true): CSSOptions {
  return injectGlobalScss ? {} : {};
}

export { defineApplicationConfig };
