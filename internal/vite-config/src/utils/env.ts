import type { ApplicationPluginOptions } from '../typing';

import { existsSync, promises as fs } from 'node:fs';
import { join } from 'node:path';

import dotenv from 'dotenv';

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = /--mode ([\d_a-z]+)/;
  const result = reg.exec(script);
  let mode = 'production';
  if (result) {
    mode = result[1] as string;
  }

  return ['.env', 'env.local', `.env.${mode}`, `.env.${mode}.local`];
}

/**
 *
 */
async function loadEnv<T = Record<string, any>>(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
) {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const confFilePath = join(process.cwd(), confFile);
      if (existsSync(confFilePath)) {
        const envPath = await fs.readFile(confFilePath, { encoding: 'utf8' });
        const env = dotenv.parse(envPath);
        envConfig = { ...envConfig, ...env };
      }
    } catch (error) {
      console.error(`Error while parsing ${confFile}`, error);
    }
  }
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig as T;
}

async function loadAnConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles(),
): Promise<
  Partial<
    ApplicationPluginOptions & {
      appTitle: string;
      base: string;
      port: number;
    }
  >
> {
  const envConfig = loadEnv(match, confFiles);
  console.log('envConfig ---->', envConfig);
  return {
    appTitle: 'demo',
    archiver: false,
    base: '/',
    compress: false,
    devtools: false,
    port: 8179,
  };
}

export { loadAnConvertEnv };
