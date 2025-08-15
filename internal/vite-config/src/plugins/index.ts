import type { PluginOption } from 'vite';

import type {
  ApplicationPluginOptions,
  CommonPluignOpitons,
  ConditionPlugin,
} from '../typing';

import viteVue from '@vitejs/plugin-vue';
import viteVueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html';
import viteVueDevTools from 'vite-plugin-vue-devtools';

async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = [];
  for (const plugin of conditionPlugins) {
    if (plugin.condition) {
      const realPlugins = await plugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins;
}

/**
 * 加载通用的 vite 插件
 */
async function loadCommonPlugin(
  options: CommonPluignOpitons,
): Promise<ConditionPlugin[]> {
  const { devtools, injectMetadata, isBuild, visualizer } = options;

  return [
    {
      condition: true,
      plugins: () => [
        viteVue({
          script: {
            defineModel: true,
          },
        }),
        viteVueJsx(),
      ],
    },
    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()],
    },
  ];
}

async function loadApplicationPlugin(
  options: ApplicationPluginOptions,
): Promise<PluginOption[]> {
  const isBuild = options.isBuild;
  const env = options.env;

  const {
    archiver,
    archiverPluginOptions,
    compress,
    compressType,
    html,
    ...commonOptions
  } = options;

  const commonPlugins = await loadCommonPlugin(commonOptions);

  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: html,
      plugins: () => [viteHtmlPlugin()],
    },
  ]);
}

export { loadApplicationPlugin };
