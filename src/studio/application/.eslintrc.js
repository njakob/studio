module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'src/studio/application/tsconfig.json',
  },
  env: {
    browser: true,
  },
  globals: {
    __BUILD_INFO__: true,
    __ENVIRONMENT__: true,
  }
};
