import tooling from '@tooling/eslint-config';
import pluginCypress from 'eslint-plugin-cypress';

// `globals` (not `recommended`): register the cypress globals (cy, Cypress, …) without enforcing the
// strict cypress/* rules — the existing specs predate them and the old eslintrc setup didn't apply them
export default tooling.append(pluginCypress.configs.globals, {
  rules: {
    // cypress assertions like `expect(x).to.be.true` read as unused expressions (antfu uses the ts/ rule)
    'ts/no-unused-expressions': 'off',
  },
});
