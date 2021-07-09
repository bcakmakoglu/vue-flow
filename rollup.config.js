import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'testing';
const processEnv = isProd || isTesting ? 'production' : 'development';

export const baseConfig = ({ injectCSS = true } = {}) => ({
  input: 'src/index.ts',
  external: ['vue', 'vue-demi', (id) => id.includes('@babel/runtime')],
  onwarn(warning, rollupWarn) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      rollupWarn(warning);
    }
  },
  output: {
    dir: 'dist',
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    replace({
      __ENV__: JSON.stringify(processEnv),
      __REACT_FLOW_VERSION__: JSON.stringify(pkg.version),
      preventAssignment: true
    }),
    postcss({
      minimize: isProd,
      inject: injectCSS
    }),
    resolve(),
    typescript({
      clean: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      extensions: [...DEFAULT_BABEL_EXTENSIONS, '.ts', '.tsx'],
      exclude: 'node_modules/**',
      babelHelpers: 'inline'
    })
  ]
});

export default isProd && !isTesting
  ? [
    baseConfig(),
    baseConfig({
      mainFile: 'dist/nocss/ReactFlow-nocss.js',
      moduleFile: 'dist/nocss/ReactFlow-nocss.esm.js',
      injectCSS: false
    })
  ]
  : baseConfig();
