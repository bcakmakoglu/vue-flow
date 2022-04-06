const baseRules = {
  '@typescript-eslint/triple-slash-reference': 0,
  'no-console': 0,
  'vue/valid-v-slot': [
    'error',
    {
      allowModifiers: true,
    },
  ],
  'no-unused-expressions': ['off', { allowTernary: true }],
  'no-use-before-define': 0,
  'chai-friendly/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  'prettier/prettier': ['error', {}, { usePrettierrc: true }],
}

module.exports = {
  extends: ['@antfu', 'plugin:prettier/recommended'],
  plugins: ['chai-friendly', 'prettier'],
  rules: baseRules,
}
