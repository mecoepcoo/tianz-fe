module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {},
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    '@tianz/eslint-config',
    '@tianz/eslint-config/typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 1,
  },
  overrides: [
    {
      files: ['*.{test,spec}.ts{,x}'],
      rules: {
        'import/no-extraneous-dependencies': [1, { packageDir: './' }],
      },
    },
  ],
}
