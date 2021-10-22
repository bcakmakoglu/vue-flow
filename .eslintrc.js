const baseRules = {
  '@typescript-eslint/triple-slash-reference': 0,
  'no-console': 0,
  'vue/valid-v-slot': [
    'error',
    {
      allowModifiers: true,
    },
  ],
  'prettier/prettier': ['error', {}, { usePrettierrc: true }],
}

module.exports = {
  extends: ['@antfu', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: baseRules,
}
