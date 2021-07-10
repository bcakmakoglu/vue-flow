import path from 'path';
import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pascalcase from 'pascalcase';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';

const name = pkg.name;

function getAuthors(pkg) {
  const { contributors, author } = pkg;

  const authors = new Set();
  if (contributors && contributors)
    contributors.forEach((contributor) => {
      authors.add(contributor.name);
    });
  if (author) authors.add(author.name);

  return Array.from(authors).join(', ');
}

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${getAuthors(pkg)}
  * @license MIT
  */`;

// ensure TS checks only once for each build
let hasTSChecked = false;

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.js`
  // format being a key of this object
  'esm-bundler': {
    file: pkg.module,
    format: 'es'
  },
  cjs: {
    file: pkg.main,
    format: 'cjs'
  },
  'global-vue-3': {
    file: pkg.unpkg.replace('2', '3'),
    format: 'iife'
  },
  'global-vue-2': {
    file: pkg.unpkg,
    format: 'iife'
  },
  esm: {
    file: pkg.browser,
    format: 'es'
  }
};

const allFormats = Object.keys(outputConfigs);
const packageFormats = allFormats;
const packageConfigs = packageFormats.map((format) => createConfig(format, outputConfigs[format]));

// only add the production ready if we are bundling the options
packageFormats.forEach((format) => {
  if (format === 'cjs') {
    packageConfigs.push(createProductionConfig(format));
  } else if (format.startsWith('global')) {
    packageConfigs.push(createMinifiedConfig(format));
  }
});

export default packageConfigs;

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(`invalid format: ${format}`);
    process.exit(1);
  }
  output.exports = 'named';
  output.sourcemap = !!process.env.SOURCE_MAP;
  output.banner = banner;
  output.externalLiveBindings = false;
  output.globals = { 'vue': 'Vue' };

  const isProductionBuild = /\.prod\.js$/.test(output.file);
  const isGlobalBuild = format.startsWith('global');
  const isRawESMBuild = format === 'esm';
  const isNodeBuild = format === 'cjs';
  const isBundlerESMBuild = /esm-bundler/.test(format);

  if (isGlobalBuild) output.name = pascalcase(pkg.name);

  const tsPlugin = ts({
    check: !hasTSChecked,
    clean: !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: !hasTSChecked,
        declaration: !hasTSChecked,
        declarationMap: !hasTSChecked
      },
      exclude: ['__tests__', 'test-dts']
    }
  });
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true;

  const external = ['vue'];

  const nodePlugins = [resolve(), commonjs({ include: 'node_modules/**' })];

  return {
    input: 'src/index.ts',
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    plugins: [
      tsPlugin,
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        // isBrowserBuild?
        isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
        isGlobalBuild,
        isNodeBuild
      ),
      ...nodePlugins,
      ...plugins,
      postcss({
        minimize: true,
        inject: true
      }),
      babel({
        extensions: [...DEFAULT_BABEL_EXTENSIONS, '.ts', '.tsx'],
        exclude: 'node_modules/**',
        babelHelpers: 'inline'
      })
    ],
    output
    // onwarn: (msg, warn) => {
    //   if (!/Circular/.test(msg)) {
    //     warn(msg)
    //   }
    // },
  };
}

function createReplacePlugin(isProduction, isBundlerESMBuild, isBrowserBuild, isGlobalBuild, isNodeBuild) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __VERSION__: `"${pkg.version}"`,
    __DEV__: isBundlerESMBuild
      ? // preserve to be handled by bundlers
        "(process.env.NODE_ENV !== 'production')"
      : // hard coded dev/prod builds
        !isProduction,
    // this is only used during tests
    __TEST__: isBundlerESMBuild ? "(process.env.NODE_ENV === 'test')" : false,
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: isBrowserBuild,
    // is targeting bundlers?
    __BUNDLER__: isBundlerESMBuild,
    __GLOBAL__: isGlobalBuild,
    // is targeting Node (SSR)?
    __NODE_JS__: isNodeBuild,
    __ENV__: JSON.stringify(process.env.NODE_ENV),
    __REVUE_FLOW_VERSION__: JSON.stringify(pkg.version),
    preventAssignment: true
  };
  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build
  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key];
    }
  });
  return replace(replacements);
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: `dist/${name}.${format}.prod.js`,
    format: outputConfigs[format].format
  });
}

function createMinifiedConfig(format) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { terser } = require('rollup-plugin-terser');
  return createConfig(
    format,
    {
      file: `dist/${name}.${format}.prod.js`,
      format: outputConfigs[format].format
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true
        }
      })
    ]
  );
}
