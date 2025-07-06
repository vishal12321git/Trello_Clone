import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import googleConfig from 'eslint-config-google'

export default defineConfig([
  globalIgnores(['dist', 'src/components/ui']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      googleConfig,
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        __dirname: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'indent': ['error', 2],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
    },
  },
])
