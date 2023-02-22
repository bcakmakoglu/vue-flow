module.exports = {
  extends: ['@tooling/eslint-config'],
  plugins: ['chai-friendly'],
  rules: {
    'chai-friendly/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
}
