module.exports = {
  parserOptions: {
    jsx: true,
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: ['react'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/jsx-no-bind': 'off',
  },
};
