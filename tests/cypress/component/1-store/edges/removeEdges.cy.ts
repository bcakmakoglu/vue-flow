import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `removeEdges`', () => {
  let store: VueFlowStore;
  let deletedEdges: string[];

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();

      const randomNumber = Math.floor(Math.random() * edges.length);
      deletedEdges = Array.from({ length: randomNumber }, (_, i) => edges[i].id);
      store.removeEdges(deletedEdges);
    });
  });

  it('removes edges from store', () => {
    expect(store.edges.value).to.have.length(edges.length - deletedEdges.length);
  });

  it('removes edges from view', () => {
    cy.get('.vue-flow__edge').should('have.length', edges.length - deletedEdges.length);
  });

  it('removes edges from DOM', () => {
    // retried assertion instead of a bare setTimeout — cypress commands queued after the test body
    // returns are silently dropped, which made this test vacuous
    cy.tryAssertion(() => {
      const els = Cypress.$('.vue-flow__edge');
      expect(els.length).to.be.greaterThan(0);

      els.each((_, edge) => {
        const edgeId = edge.getAttribute('data-id');
        const storedEdge = store.getEdge(edgeId);

        expect(deletedEdges).to.not.include(edgeId);
        expect(storedEdge).to.not.eq(undefined);
      });
    });
  });
});
