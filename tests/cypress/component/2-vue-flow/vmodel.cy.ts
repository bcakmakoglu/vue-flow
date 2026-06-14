import type { Edge, Node } from '@vue-flow/core';
import { VueFlow } from '@vue-flow/core';
import { defineComponent, h, ref } from 'vue';

/**
 * Regression: binding `v-model:nodes`/`v-model:edges` to plain (deep) `ref`s — the documented default —
 * hands the store's own writes back as reactive proxies. The store's single-source identity guard must
 * compare RAW identities, or every store write loops `setNodes` until Vue aborts the flush
 * ("Maximum recursive updates exceeded"; unbounded in prod builds).
 *
 * `cy.vueFlow()` mounts with plain props (no `onUpdate:*`), which never binds the model — so this spec
 * mounts a real parent component with both models wired up.
 */
describe('v-model backed by deep refs', () => {
  it('does not loop store writes back through the model', () => {
    let nodeUpdates = 0;
    let edgeUpdates = 0;

    const Wrapper = defineComponent({
      setup() {
        const nodes = ref<Node[]>([
          { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
          { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
        ]);

        const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2' }]);

        return () =>
          h(VueFlow, {
            'id': 'vmodel-test',
            'style': { height: '100vh', width: '100vw' },
            'nodes': nodes.value,
            'edges': edges.value,
            'onUpdate:nodes': (next: Node[]) => {
              nodeUpdates++;
              nodes.value = next;
            },
            'onUpdate:edges': (next: Edge[]) => {
              edgeUpdates++;
              edges.value = next;
            },
          });
      },
    });

    cy.mount(Wrapper);

    cy.get('.vue-flow__node').should('have.length', 2);
    cy.get('.vue-flow__edge').should('have.length', 1);

    // adoption + dimension updates produce a handful of model writes; a runaway loop produces
    // 100+ before Vue's dev-only recursion guard aborts the flush
    cy.then(() => {
      expect(nodeUpdates, 'update:nodes emissions after mount').to.be.lessThan(10);
      expect(edgeUpdates, 'update:edges emissions after mount').to.be.lessThan(10);
    });

    // pre-fix, a single selection change alone produced 100+ writes and a recursion abort
    cy.get('.vue-flow__node').first().click();

    cy.get('.vue-flow__node').first().should('have.class', 'selected');

    cy.then(() => {
      expect(nodeUpdates, 'update:nodes emissions after select').to.be.lessThan(15);
      expect(edgeUpdates, 'update:edges emissions after select').to.be.lessThan(15);
    });
  });
});
