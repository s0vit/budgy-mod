import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import esllintConfigPrettier from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  esllintConfigPrettier,
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': fixupPluginRules(hooksPlugin),
      'react-native': fixupPluginRules(reactNative),
    },
    ignores: ['dist', '.eslint.config.mjs'],
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 0,
      'react-native/no-inline-styles': 0,
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react-native/no-single-element-style-arrays': 2,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-empty-object-type': 0,
    },
  },
];
