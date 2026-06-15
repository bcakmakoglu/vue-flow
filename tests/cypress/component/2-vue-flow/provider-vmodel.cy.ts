import type { Node, VueFlowState, VueFlowStore } from '@vue-flow/core';
import type { Ref } from 'vue';
import { storeToRefs, useStore, useVueFlow, VueFlow, VueFlowProvider } from '@vue-flow/core';
import { defineComponent, h, ref } from 'vue';

// A `<VueFlow v-model:nodes>` INSIDE a `<VueFlowProvider>` reuses the provider's store, which was created
// before the child's model existed — so the model can't back the store as a signal; `useWatchProps`
// two-way syncs them instead. This pins that path: external reassignment in, store mutation out, and no
// proxy-loop (the raw-vs-proxy `toRaw` guard — the original repro was a v-model bound to a plain `ref([])`).
let store: (VueFlowStore & VueFlowState) | undefined;
let modelNodes: Ref<Node[]>;

const node = (id: string): Node => ({ id, position: { x: 0, y: 0 }, data: { label: id } });

const Capture = defineComponent({
  setup() {
    store = { ...useVueFlow(), ...storeToRefs(useStore()) } as unknown as VueFlowStore & VueFlowState;
    return () => null;
  },
});

const Wrapper = defineComponent({
  setup() {
    // a PLAIN `ref` bound via v-model is exactly the original proxy-loop repro condition
    const nodes = ref<Node[]>([node('1')]);
    modelNodes = nodes;

    return () =>
      h(VueFlowProvider, null, {
        default: () =>
          h(
            VueFlow as any,
            {
              'nodes': nodes.value,
              'onUpdate:nodes': (next: Node[]) => (nodes.value = next),
              'fitView': false,
              'style': 'height: 200px; width: 200px',
            },
            { default: () => h(Capture) },
          ),
      });
  },
});

describe('provider + v-model:nodes (reused-store sync)', () => {
  beforeEach(() => {
    store = undefined;
    cy.mount(Wrapper);
    cy.get('.vue-flow__node').should('have.length', 1);
  });

  it('adopts an external v-model reassignment into the reused store', () => {
    cy.then(() => {
      modelNodes.value = [node('1'), node('2'), node('3')];
    });

    cy.get('.vue-flow__node').should('have.length', 3);
    cy.then(() => {
      expect(store!.getNodes.value.map(n => n.id)).to.deep.eq(['1', '2', '3']);
    });
  });

  it('writes store mutations back to the bound v-model', () => {
    cy.then(() => {
      store!.addNodes([node('99')]);
    });

    cy.get('.vue-flow__node').should('have.length', 2);
    cy.then(() => {
      expect(modelNodes.value.map(n => n.id), 'model reflects the store mutation').to.include('99');
    });
  });

  it('does not loop store writes back through the model (no recursive-update overflow)', () => {
    // a reassign that round-tripped store → model → store would throw "Maximum recursive updates" and
    // cypress would fail on the uncaught error; assert it settles with store and model in agreement.
    cy.then(() => {
      modelNodes.value = [node('1'), node('2')];
    });

    cy.get('.vue-flow__node').should('have.length', 2);
    cy.then(() => {
      expect(store!.getNodes.value, 'store settled').to.have.length(2);
      expect(modelNodes.value, 'model settled').to.have.length(2);
    });
  });
});
