import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5593: a plain pane click must not open a selection box (nor emit selectionStart/End) —
// only a real drag past the click threshold begins a selection.
describe('pane selection: click vs drag', () => {
  let store: VueFlowStore;

  // Pane calls `setPointerCapture` on pointerdown, which throws on synthetic pointer events — neutralize it.
  beforeEach(() => {
    cy.window().then((win) => {
      win.Element.prototype.setPointerCapture = () => {};
      win.Element.prototype.releasePointerCapture = () => {};
    });
  });

  // `selectionKeyCode: true` + `panOnDrag: false` puts the pane in selection mode without a held key.
  function mountSelecting() {
    cy.vueFlow({
      fitView: false,
      panOnDrag: false,
      selectionKeyCode: true,
      // `width`/`height` make the node a known 20×20 (they seed `measured` + the DOM size) sitting fully
      // inside the drag rect (40,40)-(200,200), so the drag deterministically selects it — no measurement race
      nodes: [{ id: '1', position: { x: 60, y: 60 }, data: {}, width: 20, height: 20 }],
    });
    cy.then(() => {
      store = getStore();
    });
  }

  it('a plain click neither opens a selection box nor emits selectionStart/End', () => {
    mountSelecting();

    let starts = 0;
    let ends = 0;
    cy.then(() => {
      store.onSelectionStart(() => starts++);
      store.onSelectionEnd(() => ends++);
    });

    cy.window().then((win) => {
      cy.get('.vue-flow__pane')
        .should('exist')
        // pointer down + up at the same spot — no movement
        .trigger('pointerdown', { button: 0, clientX: 200, clientY: 200, force: true, view: win })
        .trigger('pointerup', { button: 0, clientX: 200, clientY: 200, force: true, view: win });
    });

    cy.then(() => {
      expect(starts, 'selectionStart not emitted on a click').to.eq(0);
      expect(ends, 'selectionEnd not emitted on a click').to.eq(0);
      expect(store.nodesSelectionActive.value, 'no selection box opened').to.eq(false);
      expect(store.getSelectedNodes.value, 'nothing selected').to.have.length(0);
    });
  });

  it('a drag opens a selection box, selects covered nodes and emits selectionStart/End', () => {
    mountSelecting();

    let starts = 0;
    let ends = 0;
    cy.then(() => {
      store.onSelectionStart(() => starts++);
      store.onSelectionEnd(() => ends++);
    });

    cy.window().then((win) => {
      cy.get('.vue-flow__pane')
        .should('exist')
        .trigger('pointerdown', { button: 0, clientX: 200, clientY: 200, force: true, view: win })
        // drag back over node 1 (at flow 60,60; viewport is identity without fitView)
        .trigger('pointermove', { clientX: 40, clientY: 40, force: true, view: win })
        .trigger('pointerup', { button: 0, clientX: 40, clientY: 40, force: true, view: win });
    });

    cy.then(() => {
      expect(starts, 'selectionStart emitted once on a drag').to.eq(1);
      expect(ends, 'selectionEnd emitted once on a drag').to.eq(1);
      expect(store.nodesSelectionActive.value, 'selection box opened').to.eq(true);
      expect(store.getSelectedNodes.value.map(n => n.id), 'node covered by the box is selected').to.deep.eq(['1']);
    });
  });
});
