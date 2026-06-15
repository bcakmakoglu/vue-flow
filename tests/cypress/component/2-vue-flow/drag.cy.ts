import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';
import { getElements } from '../../utils';

const { nodes } = getElements(1, 1);

describe('Check if nodes are draggable', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes: [nodes[0]],
      fitView: false,
    });
    cy.then(() => {
      store = getStore();
    });
  });

  it('drags nodes', () => {
    cy.window().then(async (win) => {
      cy.get(`[data-id="${nodes[0].id}"]`)
        .trigger('mousedown', {
          which: 1,
          force: true,
          view: win,
        })
        .trigger('mousemove', {
          clientX: 100,
          clientY: 100,
          force: true,
        })
        .trigger('mouseup', {
          force: true,
          view: win,
        });
      await cy.tryAssertion(() => {
        // absolute position lives on the InternalNode now (getNodes/v-model return user nodes)
        const internalNode = store.getInternalNode(nodes[0].id)!;
        cy.get(`[data-id="${nodes[0].id}"]`)
          .should('be.visible')
          .should(
            'have.css',
            'transform',
            `matrix(1, 0, 0, 1, ${internalNode.internals.positionAbsolute.x}, ${internalNode.internals.positionAbsolute.y})`,
          );
      });
    });
  });
});
