import { useVueFlow, VueFlow, VueFlowProvider } from '@vue-flow/core';
import { defineComponent, h } from 'vue';

describe('VueFlowProvider', () => {
  it('shares one store across a sibling component and <VueFlow>', () => {
    let siblingId: string | undefined;
    let flowId: string | undefined;

    // rendered as a SIBLING of <VueFlow> (not a descendant) — only resolves the same store if an
    // ancestor <VueFlowProvider> provided it.
    const Sibling = defineComponent({
      setup() {
        const { id, addNodes } = useVueFlow();
        siblingId = id;
        addNodes([{ id: 'a', position: { x: 0, y: 0 }, data: { label: 'A' } }]);
        return () => h('div', { class: 'sibling' });
      },
    });

    const Flow = defineComponent({
      setup() {
        flowId = useVueFlow().id;
        return () => h(VueFlow, { style: 'height: 200px; width: 200px' });
      },
    });

    const Root = defineComponent({
      setup() {
        return () => h(VueFlowProvider, null, { default: () => [h(Sibling), h(Flow)] });
      },
    });

    cy.mount(Root).then(() => {
      expect(siblingId, 'sibling and <VueFlow> resolved the same provided store').to.eq(flowId);
    });

    // a node added through the sibling's store handle renders inside the <VueFlow> instance
    cy.get('.vue-flow__node').should('have.length', 1);
  });

  it('pins the store id when one is passed to the provider', () => {
    let resolvedId: string | undefined;

    const Child = defineComponent({
      setup() {
        resolvedId = useVueFlow().id;
        return () => h('div');
      },
    });

    const Root = defineComponent({
      setup() {
        return () => h(VueFlowProvider, { id: 'pinned-id' }, { default: () => h(Child) });
      },
    });

    cy.mount(Root).then(() => {
      expect(resolvedId).to.eq('pinned-id');
    });
  });
});
