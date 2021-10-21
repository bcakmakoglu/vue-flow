import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
// @ts-ignore
import svg from 'rollup-plugin-svg'
import postcss from 'rollup-plugin-postcss'
// @ts-ignore

import pkg from './package.json'

const configs: any[] = []

const activePackages = [
  {
    display: 'vue-flow',
    external: ['@vueuse/core'],
  },
]

// @ts-ignore
for (const { external, iife } of activePackages) {
  const iifeGlobals = {
    'vue': 'Vue',
    '@vueuse/core': 'VueUse',
  }

  const iifeName = 'RevueFlow'
  const functionNames = ['vue-flow']

  for (const fn of functionNames) {
    const input = 'src/index.ts'

    const output: any[] = [
      {
        file: `dist/${fn}.cjs.js`,
        format: 'cjs',
      },
      {
        file: `dist/${fn}.esm.js`,
        format: 'es',
      },
    ]

    if (iife !== false) {
      output.push(
        {
          file: `dist/${fn}.iife.js`,
          format: 'iife',
          name: iifeName,
          extend: true,
          globals: iifeGlobals,
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
                comments: false,
              },
            }),
          ],
        },
      )
    }

    configs.push({
      input,
      output,
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false,
            },
          },
        }),
        svg(),
        resolve(),
        postcss({
          inject: true,
          minimize: true,
        }),
        commonjs({ include: 'node_modules/**' }),
        replace({
          __REACT_FLOW_VERSION__: JSON.stringify(pkg.version),
          preventAssignment: true,
        }),
      ],
      external: ['vue', ...(external || [])],
    })

    configs.push({
      input,
      output: {
        file: `dist/${fn}.d.ts`,
        format: 'es',
      },
      plugins: [dts()],
      external: ['vue', ...(external || []), /\.css$/],
    })
  }
}

export default configs
