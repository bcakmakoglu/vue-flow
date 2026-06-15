import type { VueFlowInstance, VueFlowState } from '@vue-flow/core';
import { storeToRefs, useStore, useVueFlow, VueFlow } from '@vue-flow/core';
import { defineComponent, h } from 'vue';

// `useVueFlow()` is the curated instance (actions/getters/hooks); raw reactive state lives on `useStore()`,
// with `storeToRefs()` as the destructure bridge (xyflow/react+svelte parity).
let instance: VueFlowInstance;
let state: VueFlowState;

const Capture = defineComponent({
  setup() {
    instance = useVueFlow();
    state = useStore();
    return () => null;
  },
});

const Wrapper = defineComponent({
  setup() {
    return () =>
      h(
        VueFlow as any,
        { id: 'split-test', fitView: false, nodes: [{ id: '1', position: { x: 0, y: 0 }, data: {} }] },
        { default: () => h(Capture) },
      );
  },
});

describe('store split (useVueFlow / useStore / storeToRefs)', () => {
  beforeEach(() => {
    cy.mount(Wrapper, { attrs: { style: { width: '100vw', height: '100vh' } } });
  });

  it('useVueFlow() exposes the instance (actions, getters, hooks) but not raw state', () => {
    cy.then(() => {
      expect(instance.setNodes, 'action').to.be.a('function');
      expect(instance.getNodes, 'getter is a computed').to.have.property('value');
      expect(instance.onNodeClick, 'event hook').to.be.a('function');

      // raw reactive state is NOT on the instance — it moved to useStore()
      expect((instance as any).nodes, 'no raw nodes on instance').to.be.undefined;
      expect((instance as any).transform, 'no raw transform on instance').to.be.undefined;
      expect((instance as any).nodeLookup, 'no lookup on instance').to.be.undefined;
    });
  });

  it('useStore() exposes the reactive state + lookups, read directly (no .value)', () => {
    cy.then(() => {
      expect(state.nodes, 'nodes array').to.have.length(1);
      expect(state.nodes[0].id).to.eq('1');
      expect(state.transform, 'transform tuple').to.have.length(3);
      expect(state.nodeLookup, 'nodeLookup is a Map').to.be.instanceOf(Map);
      expect(state.nodeLookup.size, 'lookup populated').to.eq(1);

      // actions/getters are NOT on the state view
      expect((state as any).setNodes, 'no actions on state').to.be.undefined;
    });
  });

  it('storeToRefs() projects state to reactive refs that track store updates', () => {
    cy.then(() => {
      const { nodes } = storeToRefs(state);
      expect(nodes.value).to.have.length(1);

      // an action that mutates the store surfaces through the projected ref
      instance.addNodes([{ id: '2', position: { x: 10, y: 10 }, data: {} }]);
    });

    cy.then(() => {
      const { nodes } = storeToRefs(state);
      expect(nodes.value, 'ref reflects the store mutation').to.have.length(2);
      expect(state.nodeLookup.size).to.eq(2);
    });
  });
});
