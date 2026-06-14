import type { Viewport, VueFlowState, VueFlowStore } from '@vue-flow/core';
import type { Ref } from 'vue';
import { storeToRefs, useStore, useVueFlow, VueFlow } from '@vue-flow/core';
import { defineComponent, h, ref } from 'vue';

// `v-model:viewport` two-way binds the bound value to the flow's transform (xyflow parity). We drive it
// through a wrapper holding a reactive `viewport` ref so we can mutate the "prop" and observe emits.
let store: VueFlowStore & VueFlowState;
let controlledViewport: Ref<Viewport>;

const Wrapper = defineComponent({
  setup() {
    const viewport = ref<Viewport>({ x: 0, y: 0, zoom: 1 });
    controlledViewport = viewport;

    const Capture = defineComponent({
      setup() {
        // `transform` is state; `viewport`/`setViewport` are on the instance — merge both for the spec
        store = { ...useVueFlow(), ...storeToRefs(useStore()) } as unknown as VueFlowStore & VueFlowState;
        return () => null;
      },
    });

    return () =>
      h(
        VueFlow as any,
        {
          'id': 'test',
          'fitView': false,
          'viewport': viewport.value,
          'onUpdate:viewport': (next: Viewport) => (viewport.value = next),
        },
        { default: () => h(Capture) },
      );
  },
});

describe('controlled viewport (v-model:viewport)', () => {
  beforeEach(() => {
    cy.mount(Wrapper, { attrs: { style: { width: '100vw', height: '100vh' } } });
  });

  it('applies the initial `viewport` to the transform', () => {
    cy.then(() => {
      controlledViewport.value = { x: 120, y: 60, zoom: 1.5 };
    });

    cy.tryAssertion(() => {
      expect(store.transform.value).to.deep.eq([120, 60, 1.5]);
      expect(store.viewport.value).to.deep.eq({ x: 120, y: 60, zoom: 1.5 });
    });
  });

  it('reactively syncs the transform when the bound viewport changes', () => {
    cy.then(() => {
      controlledViewport.value = { x: -40, y: 200, zoom: 0.75 };
    });

    cy.tryAssertion(() => {
      expect(store.transform.value).to.deep.eq([-40, 200, 0.75]);
    });
  });

  it('writes user/programmatic transform changes back to the bound viewport', () => {
    cy.then(() => {
      store.setViewport({ x: 33, y: 44, zoom: 1.25 });
    });

    cy.tryAssertion(() => {
      expect(controlledViewport.value).to.deep.eq({ x: 33, y: 44, zoom: 1.25 });
    });
  });
});
