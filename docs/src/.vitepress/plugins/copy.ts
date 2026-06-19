import type { Plugin } from 'vite';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'esbuild';

type Emit = (file: { type: 'asset'; fileName: string; filePath: string; source: string }) => void;

function getPkgPath(pkgName: string, fileName: string) {
  return resolve(__dirname, `../../../node_modules/@vue-flow/${pkgName}/dist/${fileName}`);
}

function getPublicPath(fileName: string) {
  return resolve(__dirname, `../../public/${fileName}`);
}

// The published `@vue-flow/core` externalizes its runtime deps (@xyflow/system, @vueuse/core, d3-*),
// so its `index.mjs` has bare imports the REPL sandbox can't resolve in the browser. Bundle them back
// in with esbuild — everything except `vue` (provided by the sandbox's import map) is inlined, giving a
// self-contained module, matching how the pre-tsdown build shipped.
async function bundleCoreRuntime() {
  const entry = getPkgPath('core', 'index.mjs');

  if (!existsSync(entry)) {
    throw new Error(`core not built. Run "pnpm -w build" first.`);
  }

  const result = await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    external: ['vue'],
    write: false,
    logLevel: 'silent',
  });

  return result.outputFiles[0].text;
}

async function copyFiles(emit: Emit) {
  // 2.0 ships a single `@vue-flow/core` package (node-resizer/node-toolbar/etc. were merged into it).
  // The REPL sandbox loads the runtime AND styles from these local copies (not a CDN), so the
  // playground tracks the in-repo 2.0 build instead of the last published 1.x release.
  emit({
    type: 'asset',
    fileName: 'vue-flow-core.mjs',
    filePath: getPkgPath('core', 'index.mjs'),
    source: await bundleCoreRuntime(),
  });

  const styles = [
    { from: 'style.css', to: 'vue-flow-core.css' },
    { from: 'base.css', to: 'vue-flow-core-base.css' },
  ];

  styles.forEach(({ from, to }) => {
    const filePath = getPkgPath('core', from);

    if (!existsSync(filePath)) {
      throw new Error(`core not built. Run "pnpm -w build" first.`);
    }

    emit({
      type: 'asset',
      fileName: to,
      filePath,
      source: readFileSync(filePath, 'utf-8'),
    });
  });
}
export function copyVueFlowPlugin(): Plugin {
  return {
    name: 'copy-vue-flow',
    async buildStart() {
      // use fs to copy files
      await copyFiles((file) => {
        // remove existing files
        if (existsSync(getPublicPath(file.fileName))) {
          writeFileSync(getPublicPath(file.fileName), '');
        }

        writeFileSync(getPublicPath(file.fileName), file.source);
      });
    },
    async generateBundle() {
      await copyFiles(file => this.emitFile(file));
    },
  };
}
