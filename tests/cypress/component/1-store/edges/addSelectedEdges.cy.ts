import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `addSelectedEdges`', () => {
  let store: VueFlowStore;
  let randomNumber: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
      randomNumber = Math.floor(Math.random() * edges.length);
      store.addSelectedEdges(Array.from({ length: randomNumber }, (_, i) => store.edges.value[i]));
    });
  });

  it('adds selected edges to store', () => {
    expect(store.getSelectedEdges.value).to.have.length(randomNumber);
  });

  it('adds `selected` class to edges', () => {
    // retried assertion instead of a bare setTimeout — cypress commands queued after the test body
    // returns are silently dropped, which made this test vacuous
    cy.tryAssertion(() => {
      const els = Cypress.$('.vue-flow__edge');
      expect(els.length).to.be.greaterThan(0);

      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id');
        const storedEdge = store.getEdge(edgeId!);

        expect(storedEdge).to.not.eq(undefined);

        if (index < randomNumber) {
          expect(!!storedEdge?.selected).to.eq(true);
          expect(edge).to.have.class('selected');
        }
        else {
          expect(!!storedEdge?.selected).to.eq(false);
          expect(edge).to.not.have.class('selected');
        }
      });
    });
  });
});
