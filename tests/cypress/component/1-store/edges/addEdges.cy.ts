import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

const edgesFirstHalf = edges.slice(0, Math.floor(edges.length / 2));
const edgesSecondHalf = edges.slice(Math.floor(edges.length / 2));

describe('Store Action: `addEdges`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges: edgesFirstHalf,
    });

    cy.then(() => {
      store = getStore();
      store.addEdges(edgesSecondHalf);
    });
  });

  it('adds edges to store', () => {
    expect(store.edges.value).to.have.length(edges.length);
  });

  it('adds edges to view', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length);
  });

  it('adds edges to DOM', () => {
    cy.get('.vue-flow__edge').then((els) => {
      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id');
        const storedEdge = store.getEdge(edgeId);

        expect(storedEdge).to.not.eq(undefined);
        expect(storedEdge?.id).to.eq(edgeId);
      });
    });
  });

  it('does not add invalid edges', () => {
    // @ts-expect-error invalid edges
    store.addEdges([null, undefined, '', 0, false, true, {}, []]);
    expect(store.edges.value).to.have.length(edges.length);
  });
});

describe('Store Action: `addEdges` — defaultEdgeOptions at creation', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges: [],
      defaultEdgeOptions: { type: 'special', animated: true },
    });

    cy.then(() => {
      store = getStore();
    });
  });

  it('persists defaults onto an edge created from a Connection', () => {
    cy.then(() => {
      // a Connection (no id) is the connect-drag shape — defaults are merged at creation and PERSISTED
      store.addEdges([{ source: nodes[0].id, target: nodes[1].id, sourceHandle: null, targetHandle: null }]);

      const created = store.edges.value.find(edge => edge.source === nodes[0].id && edge.target === nodes[1].id);
      expect(created, 'connection-created edge exists').to.not.eq(undefined);
      expect(created?.type).to.equal('special');
      expect(created?.animated).to.equal(true);
    });
  });

  it('does NOT stamp defaults onto a fully-specified user Edge', () => {
    cy.then(() => {
      // a complete Edge passes through verbatim — defaults apply only at render, never persisted
      store.addEdges([{ id: 'verbatim', source: nodes[1].id, target: nodes[0].id }]);

      const stored = store.getEdge('verbatim');
      expect(stored?.type).to.be.undefined;
      expect(stored?.animated).to.be.undefined;
    });
  });
});
