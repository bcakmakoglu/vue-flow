const baseRules = {
  'vue/no-setup-props-destructure': 0,
  'no-console': 0,
  'chai-friendly/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  'prettier/prettier': ['error', {}, { usePrettierrc: true }],
}

module.exports = {
  extends: ['@antfu', 'plugin:prettier/recommended'],
  plugins: ['chai-friendly', 'prettier'],
  rules: baseRules,
}
