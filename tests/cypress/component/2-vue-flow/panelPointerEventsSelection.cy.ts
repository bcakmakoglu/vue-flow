import type { VueFlowStore } from '@vue-flow/core';
import { Panel } from '@vue-flow/core';
import { h } from 'vue';
import { getStore } from '../../support/component';

// While a box-selection is being dragged, a Panel must not intercept pointer events — otherwise dragging the
// selection over a panel would interrupt it. vue-flow does this in `Panel.vue` via the reactive
// `userSelectionActive` inline style (xyflow/react #5362 moved this to a `.pane.selection .panel` CSS rule,
// which doesn't map to vue-flow since panels render outside `.vue-flow__pane`). This guards the behavior.
describe('panel pointer-events during selection', () => {
  let store: VueFlowStore;

  function mount() {
    cy.vueFlow({ fitView: false, nodes: [] }, undefined, {
      default: () => h(Panel, { position: 'top-left' }, () => 'panel'),
    });
    cy.then(() => {
      store = getStore();
    });
  }

  it('disables panel pointer-events while a selection is active, restores them after', () => {
    mount();

    cy.get('.vue-flow__panel').should('have.css', 'pointer-events', 'all');

    cy.then(() => {
      store.userSelectionActive.value = true;
    });
    cy.get('.vue-flow__panel').should('have.css', 'pointer-events', 'none');

    cy.then(() => {
      store.userSelectionActive.value = false;
    });
    cy.get('.vue-flow__panel').should('have.css', 'pointer-events', 'all');
  });
});
