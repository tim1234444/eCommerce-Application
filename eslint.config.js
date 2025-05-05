import eslintRecommended from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
    {
      ignores: ['dist', 'node_modules'],
    },
    {
      files: ['**/*.ts', '**/*.js'],
      languageOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: {
        '@typescript-eslint': tsPlugin,
      },
      rules: {
        ...eslintRecommended.configs.recommended.rules,
        ...tsPlugin.configs.recommended.rules,
        ...prettier.rules,
      },
    },
  ];