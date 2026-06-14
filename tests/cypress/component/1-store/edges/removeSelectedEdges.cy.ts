import type { VueFlowStore } from '@vue-flow/core';
import { isEdge } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `removeSelectedEdges`', () => {
  let store: VueFlowStore;
  let randomNumber: number;
  let randomNumber2: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
      randomNumber = Math.floor(Math.random() * edges.length);
      randomNumber2 = Math.floor(Math.random() * randomNumber);
      store.addSelectedEdges(Array.from({ length: randomNumber }, (_, i) => store.edges.value[i]));
      store.removeSelectedEdges(Array.from({ length: randomNumber2 }, (_, i) => store.edges.value[i]));
    });
  });

  it('removes selected edges from store', () => {
    expect(store.getSelectedEdges.value).to.have.length(randomNumber - randomNumber2);
  });

  it('removes `selected` class from edges', () => {
    // retried assertion instead of a bare setTimeout — cypress commands queued after the test body
    // returns are silently dropped, which made this test vacuous
    cy.tryAssertion(() => {
      const els = Cypress.$('.vue-flow__edge');
      expect(els.length).to.be.greaterThan(0);

      els.each((index, edge) => {
        const edgeId = edge.getAttribute('data-id');
        const storedEdge = store.getEdge(edgeId!);

        expect(storedEdge && isEdge(storedEdge)).to.eq(true);

        if (index >= randomNumber2 && index < randomNumber) {
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
