module.exports = {
  extends: [
    './rules/base',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    // conflict with prettier
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'space-before-function-paren': 'off',
    'import/extensions': 'off',
    'no-extra-semi': 'off',
  },
}
