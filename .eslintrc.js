const baseRules = {
  'prettier/prettier': ['error', {}, { usePrettierrc: true }],
}

module.exports = {
  extends: ['@antfu', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: baseRules,
}
