module.exports = {
  extends: ['@vue-flow/eslint-config'],
  plugins: ['chai-friendly'],
  rules: {
    'chai-friendly/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
}
