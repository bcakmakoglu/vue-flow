import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store State: `selectionKeyCode`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
    });
  });

  it('triggers selection', () => {
    cy.window().then((win) => {
      cy.get('body').trigger('keydown', { key: 'Shift', release: false });

      cy.get('.vue-flow__pane')
        .should('exist')
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
        .click();

      cy.get('body').trigger('keyup', { key: 'Shift', release: true });

      cy.tryAssertion(() => {
        expect(store.getSelectedNodes.value.length + store.getSelectedEdges.value.length).to.be.greaterThan(0);
      });
    });
  });

  it('changes keycode', () => {
    cy.window().then((win) => {
      store.selectionKeyCode.value = 'Control';
      cy.get('body').trigger('keydown', { key: 'Control', release: false });

      cy.get('.vue-flow__pane')
        .should('exist')
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
        .click();

      cy.get('body').trigger('keyup', { key: 'Control', release: true });

      cy.tryAssertion(() => {
        expect(store.getSelectedNodes.value.length + store.getSelectedEdges.value.length).to.be.greaterThan(0);
      });
    });
  });

  it('selects on a plain drag with `selectionOnDrag`', () => {
    // `selectionOnDrag` enters selection mode while NOT panning on drag (see `isSelecting` in
    // ZoomPane.vue), and `panOnDrag` feeds the d3 pan filter configured at mount — so both must be set
    // as initial props rather than toggled after mount.
    cy.vueFlow({
      nodes,
      edges,
      panOnDrag: false,
      selectionOnDrag: true,
    });

    cy.window().then((win) => {
      cy.get('.vue-flow__pane')
        .should('exist')
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
        .click();

      cy.tryAssertion(() => {
        const s = getStore();
        expect(s.getSelectedNodes.value.length + s.getSelectedEdges.value.length).to.be.greaterThan(0);
      });
    });
  });
});
