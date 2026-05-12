import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginCypress from 'eslint-plugin-cypress';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';

export default defineConfig([
  pluginReact.configs.flat.recommended,
  pluginCypress.configs.recommended,
  daStyle,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'react/prop-types':'off',
      'react/react-in-jsx-scope': 'off',
      'linebreak-style':  'off'
    }
  },
]);
