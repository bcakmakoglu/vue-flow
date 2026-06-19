import tooling from '@tooling/eslint-config';

export default tooling.append({
  rules: {
    'no-console': 'off',
  },
}, {
  // VitePress docs content: the `.md` files hold illustrative / partial code samples that aren't
  // standalone-valid, so don't lint the markdown or its extracted code blocks.
  ignores: ['**/*.md', '**/*.md/**'],
});
