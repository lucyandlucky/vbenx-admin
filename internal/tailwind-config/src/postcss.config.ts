import config from '.';

export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    autoprefixer: {},
    'postcss-import': {},
    'postcss-preset-env': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config },
  },
};
