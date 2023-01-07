const { readFile, writeFile } = require('fs/promises')
const { resolve } = require('path')

/**
 * This is a workaround until slots can be properly typed from inside the VueFlow component
 * It will overwrite `{}` typings with the correct prop types and add slot types for dynamic node and edge slots
 */

async function content(path) {
  return readFile(path, 'utf8')
}

const filePath = resolve(__dirname, '../dist/container/VueFlow/VueFlow.vue.d.ts')

const typeImportsString = /import type {\n(.*\n)+} from '\.\.\/\.\.\/types'/

const patchedTypeImports = `import type {
  Connection,
  ConnectionLineProps,
  EdgeChange,
  EdgeMouseEvent,
  EdgeProps,
  EdgeUpdateEvent,
  GraphEdge,
  GraphNode,
  NodeChange,
  NodeDragEvent,
  NodeMouseEvent,
  NodeProps,
  OnConnectStartParams,
  ViewportTransform,
  VueFlowStore,
} from '../../types'`

const unpatchedSlots = `(new () => {
    $slots: Record<string, {}> &
      Record<string, {}> & {
        'connection-line': (_: {}) => any
        'zoom-pane': (_: {}) => any
        'default': (_: {}) => any
      }
  })`

const patchedSlots = `(new () => {
    $slots: Record<string, any> & {
      'connection-line': (connectionLineProps: ConnectionLineProps) => any
      'zoom-pane': () => any
      'default': () => any
    } & {
      [key: \`node-\${string}\`]: (nodeProps: NodeProps) => any
    } & {
      [key: \`edge-\${string}\`]: (edgeProps: EdgeProps) => any
    }
  })`

const patchSlots = async () => {
  const fileContents = await content(filePath)

  const patchedFileContents = fileContents.replace(typeImportsString, patchedTypeImports).replace(unpatchedSlots, patchedSlots)

  await writeFile(filePath, patchedFileContents)
}

patchSlots()
  // eslint-disable-next-line no-console
  .then(() => console.log('slots patched'))
  .catch(console.error)
