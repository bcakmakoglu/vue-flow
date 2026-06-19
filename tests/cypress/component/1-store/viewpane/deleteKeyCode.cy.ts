import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements(2, 2);

describe('Store State: `deleteKeyCode`', () => {
  let store: VueFlowStore;
  let defaultKeyCode: VueFlowStore['deleteKeyCode']['value'];
  const nodeToDelete = nodes[Math.floor(Math.random() * nodes.length)];
  const edgeToDelete = edges[Math.floor(Math.random() * edges.length)];

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
      defaultKeyCode = store.deleteKeyCode.value;

      // reset the deleteKeyCode to default
      store.deleteKeyCode.value = defaultKeyCode;
    });
  });

  it('deleteKeyCode is `Backspace` by default', () => {
    expect(defaultKeyCode).to.equal('Backspace');
  });

  it('deletes node', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click();

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('not.exist');

    cy.tryAssertion(() => {
      expect(store.getNode(nodeToDelete.id)).to.equal(undefined);
    });
  });

  it('changes key code and deletes node', () => {
    store.deleteKeyCode.value = 'Delete';

    cy.get(`[data-id="${nodeToDelete.id}"]`).click();

    cy.get('body').trigger('keydown', { key: 'Delete' });

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('not.exist');

    cy.tryAssertion(() => {
      expect(store.getNode(nodeToDelete.id)).to.equal(undefined);
    });
  });

  it('does not delete node when node is not deletable', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click();

    // node fields are updated via the store helper (direct in-place mutation is no longer reactive)
    store.updateNode(nodeToDelete.id, { deletable: false });

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('exist');

    expect(store.getNode(nodeToDelete.id)).to.not.equal(undefined);
  });

  it('does not delete node when node is not selected', () => {
    cy.get(`[data-id="${nodeToDelete.id}"]`).click();

    // deselect AFTER the click has run (the click selects the node); a plain sync statement here would
    // run before the queued click and be a no-op
    cy.then(() => {
      store.updateNode(nodeToDelete.id, { selected: false });
    });

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${nodeToDelete.id}"]`).should('exist');

    cy.then(() => {
      expect(store.getNode(nodeToDelete.id)).to.not.equal(undefined);
    });
  });

  it('deletes edge', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click();

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('not.exist');

    // retried + correct finder: a bare getEdge here runs before the queued click/keydown, and the
    // original used getNode (always undefined for an edge id) — both made the store check vacuous
    cy.tryAssertion(() => {
      expect(store.getEdge(edgeToDelete.id)).to.equal(undefined);
    });
  });

  it('does not delete edge when edge is not deletable', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click();

    // edge fields are updated through the changes pipeline (stored edges are immutable user objects)
    store.setEdges(edges => edges.map(edge => (edge.id === edgeToDelete.id ? { ...edge, deletable: false } : edge)));

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('exist');

    cy.then(() => {
      expect(store.getEdge(edgeToDelete.id)).to.not.equal(undefined);
    });
  });

  it('does not delete edge when edge is not selected', () => {
    cy.get(`[data-id="${edgeToDelete.id}"]`).click();

    // deselect AFTER the click has run (see the node case above)
    cy.then(() => {
      store.applyEdgeChanges([{ id: edgeToDelete.id, type: 'select', selected: false }]);
    });

    cy.get('body').trigger('keydown', { key: defaultKeyCode });

    cy.get(`[data-id="${edgeToDelete.id}"]`).should('exist');

    cy.then(() => {
      expect(store.getEdge(edgeToDelete.id)).to.not.equal(undefined);
    });
  });
});
