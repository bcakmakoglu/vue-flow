import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements(2, 2);

describe('Viewport Helper: `fitView`', () => {
  let store: VueFlowStore;

  it('fits view', () => {
    cy.vueFlow({
      nodes,
      edges,
      fitView: false,
    });

    cy.then(() => {
      store = getStore();
    });

    cy.tryAssertion(() => {
      cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`);
    }).then(() => {
      cy.wrap(store.fitView()).then(() => {
        cy.tryAssertion(() => {
          cy.transformationPane().should(
            'have.css',
            'transform',
            `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
          );
        });
      });
    });
  });

  it('includes hidden nodes only when `includeHiddenNodes` is set', () => {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: 'visible', position: { x: 0, y: 0 }, data: {}, measured: { width: 50, height: 50 } },
        // truly hidden (no DOM, never DOM-measured) — seed `measured` so it can participate in fitView
        { id: 'hidden', position: { x: 2000, y: 2000 }, hidden: true, data: {}, measured: { width: 50, height: 50 } },
      ],
    });

    cy.then(() => {
      store = getStore();
    });

    cy.wrap(null).then(() => {
      return store.fitView().then(() => {
        const defaultZoom = store.viewport.value.zoom;
        return store.fitView({ includeHiddenNodes: true }).then(() => {
          const withHiddenZoom = store.viewport.value.zoom;
          // including the far-away hidden node widens the bounds → zooms further out
          expect(withHiddenZoom, 'zoom changed once the hidden node is included').to.be.lessThan(defaultZoom);
        });
      });
    });
  });

  it('does not fit view when no node exist', () => {
    cy.vueFlow({
      nodes: [],
      edges: [],
    });

    cy.then(() => {
      store = getStore();
    });

    cy.tryAssertion(() => {
      cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`);
    }).then(() => {
      cy.wrap(store.fitView()).then(() => {
        cy.tryAssertion(() => {
          cy.transformationPane().should('have.css', 'transform', `matrix(1, 0, 0, 1, 0, 0)`);
        });
      });
    });
  });
});
