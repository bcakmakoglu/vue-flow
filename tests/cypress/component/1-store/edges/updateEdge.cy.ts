import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements(2, 2);

describe('Store Action: `reconnectEdge`', () => {
  let store: VueFlowStore;
  let randomIndex: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
    });
  });

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * edges.length);
  });

  it('reconnects an edge to a new source/target', () => {
    store.reconnectEdge(store.edges.value[randomIndex], {
      sourceHandle: null,
      targetHandle: null,
      source: nodes[0].id,
      target: nodes[1].id,
    });

    const storedEdge = store.edges.value[randomIndex];

    expect(storedEdge.source).to.equal(nodes[0].id);
    expect(storedEdge.target).to.equal(nodes[1].id);
  });

  // regression: `reconnectEdge` used to rebuild the connection lookup from ONLY the updated edge
  // (`updateConnectionLookup` clears it first), erasing every other edge's connections
  it('keeps other edges in the connection lookup', () => {
    const edgeToUpdate = store.edges.value.find(edge => edge.source === '2' && edge.target === '3');

    if (!edgeToUpdate) {
      throw new Error('Edge 2->3 not found in store');
    }

    store.reconnectEdge(edgeToUpdate, {
      sourceHandle: null,
      targetHandle: null,
      source: '2',
      target: '4',
    });

    const lookup = store.connectionLookup.value;

    expect(lookup.get('1-source')?.size, 'connections of untouched edge 1->2').to.equal(1);
    expect(lookup.get('3-source')?.size, 'connections of untouched edge 3->4').to.equal(1);
    expect(lookup.get('4-target')?.size, 'connections of node 4 after reconnect').to.equal(2);
  });
});

describe('Store Action: `updateEdge` (partial update)', () => {
  let store: VueFlowStore;
  let randomIndex: number;

  beforeEach(() => {
    cy.vueFlow({ nodes, edges });

    cy.then(() => {
      store = getStore();
    });
  });

  beforeEach(() => {
    randomIndex = Math.max(0, Math.floor(Math.random() * edges.length));
  });

  it('merges a partial update into the edge', () => {
    const edgeId = edges[randomIndex].id;

    store.updateEdge(edgeId, { animated: true, label: 'updated' });

    const updated = store.getEdge(edgeId);
    expect(updated?.animated).to.equal(true);
    expect(updated?.label).to.equal('updated');
    // unrelated fields preserved
    expect(updated?.source).to.equal(edges[randomIndex].source);
  });

  it('updates from a function receiving the current edge', () => {
    const edgeId = edges[randomIndex].id;

    store.updateEdge(edgeId, edge => ({ label: `${edge.source}->${edge.target}` }));

    expect(store.getEdge(edgeId)?.label).to.equal(`${edges[randomIndex].source}->${edges[randomIndex].target}`);
  });

  it('replaces the edge when `replace` is true', () => {
    const edgeId = edges[randomIndex].id;
    const { source, target } = edges[randomIndex];

    store.updateEdge(edgeId, { id: edgeId, source, target, animated: true }, { replace: true });

    const updated = store.getEdge(edgeId);
    expect(updated?.animated).to.equal(true);
    expect(updated?.label).to.be.undefined;
  });

  it('replaces the stored edge object immutably (untouched edges keep their reference)', () => {
    const edgeId = edges[randomIndex].id;
    const otherId = edges[(randomIndex + 1) % edges.length].id;

    const before = store.getEdge(edgeId);
    const otherBefore = store.getEdge(otherId);

    store.updateEdge(edgeId, { animated: true });

    expect(store.getEdge(edgeId)).to.not.equal(before);
    if (otherId !== edgeId) {
      expect(store.getEdge(otherId)).to.equal(otherBefore);
    }
  });
});
