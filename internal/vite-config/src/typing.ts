import type { ConfigEnv, PluginOption, UserConfig } from 'vite';

interface ArchiverPluginOptions {
  /**
   * @description 输出文件名
   * @default 'dist'
   */
  name?: string;
  /**
   * @description 输出目录
   * @default '.'
   */
  outputDir?: string;
}

/**
 * 通用插件配置选项
 */
interface CommonPluignOpitons {
  /**
   * @description 是否开启开发者工具
   * @default false
   */
  devtools?: boolean;
  /**
   * @description 自定义环境变量
   * @default false
   */
  env?: Record<string, any>;
  /**
   * @description 是否注入元数据
   * @default false
   */
  injectMetadata?: boolean;
  /**
   * @description 是否构建模式
   * @default false
   */
  isBuild?: boolean;
  /**
   * @description 构建模式
   * @default 'development'
   */
  mode?: string;
  /**
   * @description 使用 rollup-plugin-visualizer 分析依赖
   * @default false
   */
  visualizer?: boolean;
}

/**
 * 应用插件配置选项
 * @description 用于配置应用构建时的插件选项
 */
interface ApplicationPluginOptions extends CommonPluignOpitons {
  /**
   * 是否开启压缩归档
   * @description 开启后会在打包目录生成 zip 文件
   * @default false
   */
  archiver?: boolean;
  /**
   * 压缩归档插件配置
   */
  archiverPluginOptions?: ArchiverPluginOptions;
  /**
   * 是否开启压缩
   * @description 支持 gzip 和 brotli 压缩
   * @default false
   */
  compress?: boolean;
  /** 压缩类型
   * @description 可选的压缩类型
   * @default ['gzip']
   */
  compressType?: ('brotli' | 'gzip')[];
  /**
   * 是否抽离配置文件
   * @description 在构建时抽离配置文件
   * @default false
   */
  extraAppConfig?: boolean;
  /**
   * 是否开启 html 插件
   * @default true
   */
  html?: boolean;
}

/**
 * 应用配置类型选项
 */
type ApplicationOptions = ApplicationPluginOptions;

type DefineApplicationOpitons = (options?: ConfigEnv) => Promise<{
  /** 应用插件配置 */
  application: ApplicationOptions;
  /** Vite 配置 */
  vite?: UserConfig;
}>;

type DefineConfig = DefineApplicationOpitons;
type ProjectType = 'application' | 'auto' | 'library';

/**
 * 条件插件配置
 */
interface ConditionPlugin {
  /**
   * 判断条件
   * @description 当条件为 true 时加载插件
   */
  condition?: boolean;
  /**
   * 插件对象
   * @description 返回插件数组或者 Promise
   */
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

export {
  ApplicationPluginOptions,
  CommonPluignOpitons,
  ConditionPlugin,
  DefineApplicationOpitons,
  DefineConfig,
  ProjectType,
};
