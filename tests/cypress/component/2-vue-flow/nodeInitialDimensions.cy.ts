import { defineComponent, h } from 'vue';

// A node type with no intrinsic size: without measured dimensions (and with nothing to measure) the wrapper
// is gated `visibility: hidden`. So it's only visible if `width`/`initialWidth` feed the visibility gate —
// which is exactly the `nodeHasDimensions` behavior vue-flow now mirrors from xyflow/react & xyflow/svelte.
const EmptyNode = defineComponent({ name: 'EmptyNode', setup: () => () => h('div') });

function visibilityOf(id: string) {
  return cy.get(`[data-id="${id}"]`).should('exist').then($el => getComputedStyle($el[0]).visibility);
}

describe('node initial dimensions', () => {
  it('gates a zero-size, unmeasured node hidden (control)', () => {
    cy.vueFlow(
      { fitView: false, nodes: [{ id: '1', type: 'empty', position: { x: 0, y: 0 }, data: {} }] },
      {},
      { 'node-empty': (props: any) => h(EmptyNode, props) },
    );

    visibilityOf('1').then((visibility) => {
      expect(visibility, 'a node with no dimensions stays hidden').to.eq('hidden');
    });
  });

  it('renders a node with only initialWidth/initialHeight visible (SSR fallback)', () => {
    cy.vueFlow(
      {
        fitView: false,
        nodes: [{ id: '1', type: 'empty', position: { x: 0, y: 0 }, data: {}, initialWidth: 100, initialHeight: 40 }],
      },
      {},
      { 'node-empty': (props: any) => h(EmptyNode, props) },
    );

    visibilityOf('1').then((visibility) => {
      expect(visibility, 'initialWidth/initialHeight make the node visible without measuring').to.eq('visible');
    });
  });
});
