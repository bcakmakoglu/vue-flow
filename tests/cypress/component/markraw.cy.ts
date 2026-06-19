import { isReactive } from 'vue';
import { getStore } from '../support/component';
import { getElements } from '../utils/elements';

// Regression guard for the markRaw node split (#40 S4): nodes are NOT deep-reactive. Reactivity for the UI
// comes from re-adopting (the lookup `.set` + the per-node render computed), never from deep-proxying — so
// large `data` objects stay raw. If this flips, the perf model has regressed.
describe('node reactivity (markRaw)', () => {
  it('user nodes, InternalNodes and their data are raw (not deep-proxied)', () => {
    cy.vueFlow({ nodes: getElements(5, 5).nodes, edges: [] });

    cy.then(() => {
      const store = getStore();
      const id = store.nodes.value[0].id;

      // the array itself is reactive (membership), but its elements are raw
      expect(isReactive(store.nodes.value[0]), 'user node is raw').to.eq(false);
      expect(isReactive(store.getInternalNode(id)!), 'internal node is raw').to.eq(false);
      expect(isReactive(store.getInternalNode(id)!.data), 'node data is raw').to.eq(false);
    });
  });

  it('re-renders on store helpers despite markRaw (lookup .set reactivity)', () => {
    cy.vueFlow({ nodes: getElements(3, 3).nodes, edges: [] });

    cy.then(() => {
      const store = getStore();
      const id = store.nodes.value[0].id;
      store.updateNodeData(id, { label: 'updated' });
    });

    // the change flows through re-adopt -> lookup .set -> per-node computed -> DOM
    cy.get('[data-id="1"]').should('contain.text', 'updated');
  });
});

// Edge twin of the node guard (edge split): stored edges are the user's objects verbatim, markRaw'd at
// the commit choke point — no deep proxy, no enriched edge representation. Renders trigger on immutable
// replacement (lookup `.set`), driven through the store helpers.
describe('edge reactivity (markRaw)', () => {
  it('stored edges and their data are raw, and lookup values are the array elements', () => {
    const { nodes, edges } = getElements(3, 3);
    cy.vueFlow({ nodes, edges });

    cy.then(() => {
      const store = getStore();
      const edge = store.edges.value[0];

      expect(isReactive(edge), 'stored edge is raw').to.eq(false);
      expect(isReactive(edge.data), 'edge data is raw').to.eq(false);
      // xyflow parity: edgeLookup holds the SAME user edge references as the array
      expect(store.getEdge(edge.id), 'lookup value === array element').to.eq(edge);
    });
  });

  it('re-renders on setEdges despite markRaw (immutable replacement)', () => {
    cy.vueFlow({
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', label: 'initial', data: {} }],
    });

    cy.get('.vue-flow__edge').should('contain.text', 'initial');

    cy.then(() => {
      const store = getStore();
      const before = store.getEdge('e1-2');

      store.setEdges(prev => prev.map(edge => ({ ...edge, label: 'updated' })));

      // immutable contract: the stored object was REPLACED, not mutated
      expect(store.getEdge('e1-2')).to.not.eq(before);
    });

    cy.get('.vue-flow__edge').should('contain.text', 'updated');
  });
});
