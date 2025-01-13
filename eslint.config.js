const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginHTML = require('eslint-plugin-html');
const { configs: jsConfigs } = require('@eslint/js');
const globals = require('globals');

module.exports = [
  jsConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      html: eslintPluginHTML,
    },
    rules: {
      'prettier/prettier': ['error'], // Ensures Prettier formatting
      'no-console': 'warn',
    },
  },
];
