import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import unicorn from 'eslint-plugin-unicorn';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextJs from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-refresh': reactRefresh,
      prettier: prettier,
      promise: promise,
      unicorn: unicorn,
      react: react,
      'react-hooks': reactHooks,
      next: nextJs,
      import: importPlugin,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          paths: ['src', 'public'],
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', '.mdx', '.css'],
        },
      },
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      semi: ['error', 'always'],
      'prettier/prettier': ['error'],
      'object-curly-spacing': ['warn', 'always'],
      'no-unused-vars': ['warn'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      'max-len': [
        'warn',
        {
          code: 150,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignorePattern: '^import .*',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
      'prefer-template': 'off',
      'linebreak-style': 'off',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'react/jsx-no-duplicate-props': [
        'error',
        {
          ignoreCase: false,
        },
      ],
      'react/require-default-props': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'import/no-cycle': 'off',
      'prefer-destructuring': 'off',
      'jsx-a11y/alt-text': 'off',
      'no-underscore-dangle': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      'react/function-component-definition': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always-and-inside-groups',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: 'generated/*',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'no-useless-return': 'off',
      'no-console': 'off',
      'import/no-absolute-path': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          peerDependencies: true,
        },
      ],
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: false,
            pascalCase: true,
            camelCase: true,
          },
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/consistent-function-scoping': [
        'error',
        {
          checkArrowFunctions: false,
        },
      ],
      'react-hooks/exhaustive-deps': 'off',
      'unicorn/no-useless-undefined': [
        'error',
        {
          checkArrowFunctionBody: true,
        },
      ],
      'consistent-return': 'off',
    },
  },
  {
    ignores: ['dist', '.eslintrc.cjs', 'server.js'],
  },
];
