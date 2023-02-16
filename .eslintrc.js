const baseRules = {
  'vue/no-setup-props-destructure': 0,
  'no-console': 0,
  'chai-friendly/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
  'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  'antfu/if-newline': 0,
  'antfu/generic-spacing': 0,
}

module.exports = {
  extends: ['@antfu', 'plugin:prettier/recommended'],
  plugins: ['chai-friendly', 'prettier'],
  rules: baseRules,
}
