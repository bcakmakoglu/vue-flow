import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import './commands'

import { mount } from 'cypress/vue'
import { defineComponent, h } from 'vue'
import { VueFlow, storeToRefs, useStore, useVueFlow } from '@vue-flow/core'
import type { FlowProps, VueFlowState, VueFlowStore } from '@vue-flow/core'

// `useVueFlow()` is now the curated instance (actions/getters/hooks) and `useStore()` the reactive state.
// Specs predate that split and read a single "full store" (`store.nodes.value`, `store.setViewport()`,
// `store.nodeLookup`, …), so the capture component reconstructs that pre-split shape: the instance merged
// with the state as refs (via `storeToRefs`), with the node/parent/edge lookups kept raw as before. The
// split itself is covered directly in `store-split.cy.ts`.
type FullStore = VueFlowStore & VueFlowState

let mountedStore: FullStore | undefined

const StoreCapture = defineComponent({
  setup() {
    const instance = useVueFlow()
    const state = useStore()

    mountedStore = {
      ...instance,
      ...storeToRefs(state),
      nodeLookup: state.nodeLookup,
      parentLookup: state.parentLookup,
      edgeLookup: state.edgeLookup,
    } as unknown as FullStore

    return () => null
  },
})

/** The store of the `<VueFlow>` mounted by the most recent `cy.vueFlow()` (pre-split full-store shape). */
export function getStore(): FullStore {
  if (!mountedStore) {
    throw new Error('VueFlow store is not available — call cy.vueFlow() before getStore()')
  }
  return mountedStore
}

function mountVueFlow(props?: FlowProps, attrs?: Record<string, any>, slots?: Record<string, any>) {
  mountedStore = undefined

  const userDefault = slots?.default

  cy.mount(VueFlow, {
    props: {
      id: 'test',
      fitView: true,
      ...props,
    } as FlowProps,
    attrs: {
      style: {
        height: '100vh',
        width: '100vw',
      } as CSSStyleDeclaration,
      ...attrs,
    },
    slots: {
      ...slots,
      default: (slotProps: any) => [
        h(StoreCapture),
        ...(typeof userDefault === 'function' ? [userDefault(slotProps)] : userDefault != null ? [userDefault] : []),
      ],
    },
  })
}

function useViewPort() {
  return cy.get('.vue-flow__viewport')
}

function useTransformationPane() {
  return cy.get('.vue-flow__transformationpane')
}

function retry(assertion: Function, { interval = 20, timeout = 1000 } = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const tryAgain = () => {
      setTimeout(() => {
        try {
          resolve(assertion())
        } catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain()
        }
      }, interval)
    }

    tryAgain()
  })
}

function dragConnection(from: string, to: string) {
  cy.window().then((win) => {
    const sourceHandle = cy.get(`[data-nodeid="${from}"].source`)
    const targetHandle = cy.get(`[data-nodeid="${to}"].target`)

    targetHandle.then((handle) => {
      const target = handle[0]
      const { x, y } = target.getBoundingClientRect()

      sourceHandle
        .trigger('mousedown', {
          button: 0,
          force: true,
          view: win,
        })
        .trigger('mousemove', {
          clientX: x + 5,
          clientY: y + 5,
          force: true,
        })
        .trigger('mouseup', {
          clientX: x + 5,
          clientY: y + 5,
          force: true,
          view: win,
        })
    })
  })
}

function connect(from: string, to: string) {
  const sourceHandle = cy.get(`[data-nodeid="${from}"].source`)
  const targetHandle = cy.get(`[data-nodeid="${to}"].target`)

  sourceHandle.click({ force: true })
  targetHandle.click({ force: true })
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      vueFlow: typeof mountVueFlow
      viewPort: typeof useViewPort
      transformationPane: typeof useTransformationPane
      tryAssertion: typeof retry
      connect: typeof connect
      dragConnection: typeof dragConnection
    }
  }
}

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('vueFlow', mountVueFlow)

Cypress.Commands.add('viewPort', useViewPort)

Cypress.Commands.add('transformationPane', useTransformationPane)

Cypress.Commands.add('tryAssertion', retry)

Cypress.Commands.add('connect', connect)

Cypress.Commands.add('dragConnection', dragConnection)
