module.exports = {
  extends: [
    './rules/react',
    './rules/react-hooks',
  ].map(require.resolve),
  rules: {}
}
