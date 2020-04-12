
module.exports = {
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {
        "cwd": "packagejson"
      }
    }
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error', {
      allow: [
        '__BUILD_INFO__',
        '__ENVIRONMENT__',
      ],
    }],

    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
  }
};
