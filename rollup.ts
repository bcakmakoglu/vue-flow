import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import { OutputOptions, RollupOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// @ts-ignore
import svg from 'rollup-plugin-svg';
import postcss from 'rollup-plugin-postcss';
// @ts-ignore
import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';

const configs: RollupOptions[] = [];

const activePackages = [
  {
    display: 'Revue-Flow',
    external: ['@vueuse/core']
  }
];

// @ts-ignore
for (const { external, iife } of activePackages) {
  const iifeGlobals = {
    vue: 'Vue',
    '@vueuse/core': 'VueUse'
  };

  const iifeName = 'RevueFlow';
  const functionNames = ['revue-flow'];

  for (const fn of functionNames) {
    const input = 'src/index.ts';

    const output: OutputOptions[] = [
      {
        file: `dist/${fn}.cjs.js`,
        format: 'cjs'
      },
      {
        file: `dist/${fn}.esm.js`,
        format: 'es'
      }
    ];

    if (iife !== false) {
      output.push(
        {
          file: `dist/${fn}.iife.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals
        },
        {
          file: `dist/${fn}.iife.min.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
          plugins: [
            terser({
              format: {
                comments: false
              }
            })
          ]
        }
      );
    }

    configs.push({
      input,
      output,
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false
            }
          }
        }),
        svg(),
        resolve(),
        postcss({
          inject: true,
          minimize: true
        }),
        commonjs({ include: 'node_modules/**' }),
        babel({
          extensions: [...DEFAULT_BABEL_EXTENSIONS, '.ts', '.tsx'],
          exclude: 'node_modules/**',
          babelHelpers: 'bundled'
        })
      ],
      external: ['vue', ...(external || [])]
    });

    configs.push({
      input,
      output: {
        file: `dist/${fn}.d.ts`,
        format: 'es'
      },
      plugins: [dts()],
      external: ['vue', ...(external || [])]
    });
  }
}

export default configs;
