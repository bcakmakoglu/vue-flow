import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';
import { getElements } from '../../utils';

const { nodes, edges } = getElements();

// `autoPanOnSelection` pans the viewport when the selection box is dragged near a container edge. The pan
// is an rAF loop driven by the last pointer position, so a single pointer move to the edge keeps the
// viewport drifting until the pointer is released — we assert on that drift.
describe('autoPanOnSelection', () => {
  // Pane calls `setPointerCapture` on pointerdown, which throws on synthetic pointer events (no active
  // pointer). It's irrelevant to the auto-pan logic, so neutralize it to drive the real handlers.
  beforeEach(() => {
    cy.window().then((win) => {
      win.Element.prototype.setPointerCapture = () => {};
      win.Element.prototype.releasePointerCapture = () => {};
    });
  });

  // `selectionOnDrag` + `panOnDrag: false` puts the pane in selection mode without holding a key
  // (see the `isSelecting` derivation in ZoomPane), so a plain pointer drag draws a selection box.
  function mountSelecting(autoPanOnSelection: boolean) {
    cy.vueFlow({
      nodes,
      edges,
      fitView: false,
      panOnDrag: false,
      selectionOnDrag: true,
      autoPanOnSelection,
    });
  }

  function dragSelectionToTopLeftEdge() {
    cy.window().then((win) => {
      cy.get('.vue-flow__pane')
        .should('exist')
        .trigger('pointerdown', { button: 0, clientX: 200, clientY: 200, force: true, view: win })
        // a move within 40px of the top-left edge keeps `calcAutoPan` returning a non-zero velocity
        .trigger('pointermove', { clientX: 10, clientY: 10, force: true, view: win });
    });
  }

  it('pans the viewport when the selection box reaches the edge', () => {
    mountSelecting(true);

    let store: VueFlowStore;
    let baseline: { x: number; y: number };
    cy.then(() => {
      store = getStore();
      baseline = { ...store.viewport.value };
    });

    dragSelectionToTopLeftEdge();

    // the rAF loop keeps panning while the pointer is held near the edge
    cy.tryAssertion(() => {
      const { x, y } = store.viewport.value;
      expect(x !== baseline.x || y !== baseline.y, 'viewport panned during selection').to.eq(true);
    });

    cy.get('.vue-flow__pane').trigger('pointerup', { button: 0, force: true });
  });

  it('does not pan when autoPanOnSelection is disabled', () => {
    mountSelecting(false);

    let store: VueFlowStore;
    let baseline: { x: number; y: number };
    cy.then(() => {
      store = getStore();
      baseline = { ...store.viewport.value };
    });

    dragSelectionToTopLeftEdge();

    // give the rAF loop ample time to fire if it were going to — it shouldn't
    cy.wait(300);

    cy.then(() => {
      const { x, y } = store.viewport.value;
      expect(x, 'viewport x unchanged').to.eq(baseline.x);
      expect(y, 'viewport y unchanged').to.eq(baseline.y);
    });

    cy.get('.vue-flow__pane').trigger('pointerup', { button: 0, force: true });
  });
});
