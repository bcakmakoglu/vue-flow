import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes } = getElements();

describe('Store Action: `setMinZoom`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
    });

    cy.then(() => {
      store = getStore();
      store.setMinZoom(0.5);
    });
  });

  it('sets min-zoom in store', () => {
    expect(store.minZoom.value).to.eq(0.5);
  });

  it('sets min-zoom in viewpane', () => {
    cy.viewPort().trigger('wheel', {
      deltaY: 10000,
      wheelDelta: 0,
      wheelDeltaX: 0,
      wheelDeltaY: 0,
      bubbles: true,
    });

    cy.tryAssertion(() => {
      cy.transformationPane().should(
        'have.css',
        'transform',
        `matrix(${store.viewport.value.zoom}, 0, 0, ${store.viewport.value.zoom}, ${store.viewport.value.x}, ${store.viewport.value.y})`,
      );
    });
  });
});
