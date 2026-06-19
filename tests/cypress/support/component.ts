import type { FlowProps, VueFlowState, VueFlowStore } from '@vue-flow/core';
import { storeToRefs, useStore, useVueFlow, VueFlow } from '@vue-flow/core';

import { mount } from 'cypress/vue';

import { defineComponent, h } from 'vue';
import '@vue-flow/core/dist/style.css';
import './commands';

// `useVueFlow()` is now the curated instance (actions/getters/hooks) and `useStore()` the reactive state.
// Specs predate that split and read a single "full store" (`store.nodes.value`, `store.setViewport()`,
// `store.nodeLookup`, …), so the capture component reconstructs that pre-split shape: the instance merged
// with the state as refs (via `storeToRefs`), with the node/parent/edge lookups kept raw as before. The
// split itself is covered directly in `store-split.cy.ts`.
type FullStore = VueFlowStore & VueFlowState;

let mountedStore: FullStore | undefined;

const StoreCapture = defineComponent({
  setup() {
    const instance = useVueFlow();
    const state = useStore();

    mountedStore = {
      ...instance,
      ...storeToRefs(state),
      nodeLookup: state.nodeLookup,
      parentLookup: state.parentLookup,
      edgeLookup: state.edgeLookup,
    } as unknown as FullStore;

    return () => null;
  },
});

/** The store of the `<VueFlow>` mounted by the most recent `cy.vueFlow()` (pre-split full-store shape). */
export function getStore(): FullStore {
  if (!mountedStore) {
    throw new Error('VueFlow store is not available — call cy.vueFlow() before getStore()');
  }
  return mountedStore;
}

function mountVueFlow(props?: FlowProps, attrs?: Record<string, any>, slots?: Record<string, any>) {
  mountedStore = undefined;

  const userDefault = slots?.default;

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
  });
}

// the outer pan/zoom container (the panzoom target) — for wheel/drag events
function useViewPort() {
  return cy.get('.vue-flow__renderer');
}

// the transformed layer that carries the zoom `transform` — for transform assertions
function useTransformationPane() {
  return cy.get('.vue-flow__viewport');
}

function retry(assertion: Function, { interval = 20, timeout = 1000 } = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const tryAgain = () => {
      setTimeout(() => {
        try {
          resolve(assertion());
        }
        catch (err) {
          Date.now() - startTime > timeout ? reject(err) : tryAgain();
        }
      }, interval);
    };

    tryAgain();
  });
}

function dragConnection(from: string, to: string) {
  // Dispatch the whole connection drag NATIVELY in one async block rather than as chained `cy.trigger`
  // commands. XYHandle starts the connection on `mousedown` and then listens for `mousemove`/`mouseup` on
  // `document`; a cypress command between the steps re-queries/hovers the DOM and can cancel the
  // in-progress connection (the old flake).
  //
  // Even with native events, the synthetic drag occasionally (~8% of runs) released `mouseup` before
  // XYHandle had registered the target, so no edge was created. The store's transient connection state
  // (`connectionEndHandle`/`connectionStatus`) is set *and cleared* on every move, so it can't be polled
  // reliably. So we synchronize on the **outcome** instead: retry the whole drag until an edge actually
  // appears in the store. Each attempt is independent — a failed one leaves no edge and a cleared
  // connection — so retrying is safe, and it's deterministic for any test that expects a connection.
  cy.get(`[data-nodeid="${from}"].source`).then(($src) => {
    cy.get(`[data-nodeid="${to}"].target`).then(($tgt) => {
      const src = $src[0];
      const tgt = $tgt[0];
      const win = src.ownerDocument.defaultView as Window;
      const doc = src.ownerDocument;
      const store = getStore();

      const fire = (target: EventTarget, type: string, x: number, y: number, buttons: number) =>
        target.dispatchEvent(new win.MouseEvent(type, { bubbles: true, cancelable: true, view: win, button: 0, buttons, clientX: x, clientY: y }));
      // `setTimeout` rather than `requestAnimationFrame` to settle between steps: rAF is throttled in a
      // headless/backgrounded run, which is what made the synthetic connection drag flaky
      const settle = () => new Promise<void>(resolve => win.setTimeout(resolve, 24));
      // poll a predicate until truthy (or timeout), driven by `setTimeout`; resolves with its final value
      const until = (pred: () => boolean, { timeout = 400, interval = 16 } = {}) =>
        new Promise<boolean>((resolve) => {
          const start = Date.now();
          const tick = () => (pred() || Date.now() - start > timeout ? resolve(pred()) : win.setTimeout(tick, interval));
          tick();
        });

      const runDrag = async () => {
        const s = src.getBoundingClientRect();
        const t = tgt.getBoundingClientRect();
        const sx = s.x + s.width / 2;
        const sy = s.y + s.height / 2;
        const tx = t.x + t.width / 2;
        const ty = t.y + t.height / 2;

        fire(src, 'mousedown', sx, sy, 1);
        await settle();

        // step smoothly toward the target so XYHandle progressively detects it; moves go to `document`
        const STEPS = 5;
        for (let i = 1; i <= STEPS; i++) {
          fire(doc, 'mousemove', sx + ((tx - sx) * i) / STEPS, sy + ((ty - sy) * i) / STEPS, 1);
          await settle();
        }
        // a final move + up on the target handle itself, in case detection went by event target
        fire(tgt, 'mousemove', tx, ty, 1);
        await settle();
        fire(tgt, 'mouseup', tx, ty, 0);
        fire(doc, 'mouseup', tx, ty, 0);
        await settle();
      };

      return (async () => {
        for (let attempt = 0; attempt < 5; attempt++) {
          const before = store.edges.value.length;
          await runDrag();
          // onConnect → addEdges runs synchronously on `mouseup`; give it a beat, then retry if no edge
          if (await until(() => store.edges.value.length > before)) {
            return;
          }
        }
      })();
    });
  });
}

function connect(from: string, to: string) {
  const sourceHandle = cy.get(`[data-nodeid="${from}"].source`);
  const targetHandle = cy.get(`[data-nodeid="${to}"].target`);

  sourceHandle.click({ force: true });
  targetHandle.click({ force: true });
}

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      vueFlow: typeof mountVueFlow;
      viewPort: typeof useViewPort;
      transformationPane: typeof useTransformationPane;
      tryAssertion: typeof retry;
      connect: typeof connect;
      dragConnection: typeof dragConnection;
    }
  }
}

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('vueFlow', mountVueFlow);

Cypress.Commands.add('viewPort', useViewPort);

Cypress.Commands.add('transformationPane', useTransformationPane);

Cypress.Commands.add('tryAssertion', retry);

Cypress.Commands.add('connect', connect);

Cypress.Commands.add('dragConnection', dragConnection);
