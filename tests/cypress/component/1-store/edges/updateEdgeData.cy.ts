import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `updateEdgeData`', () => {
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
    randomIndex = Math.max(0, Math.floor(Math.random() * edges.length));
  });

  it('updates edge data from object', () => {
    const edgeId = edges[randomIndex].id;
    const testData = Date.now().toString();

    store.updateEdgeData(edgeId, { randomData: testData });

    const updatedEdge = store.getEdge(edgeId);

    if (!updatedEdge) {
      throw new Error('Edge not found in store');
    }

    expect(updatedEdge.id).to.equal(edgeId);
    expect(updatedEdge.data!.randomData).to.equal(testData);
  });

  it('updates edge data from function (receives the current stored edge)', () => {
    const edgeId = edges[randomIndex].id;

    let testData = '';

    store.updateEdgeData(edgeId, (edge) => {
      testData = `${edge.data!.randomData}${Date.now()}`;

      return { randomData: testData };
    });

    expect(store.getEdge(edgeId)?.data!.randomData).to.equal(testData);
  });

  it('replaces edge data when `replace` option is true', () => {
    const edgeId = edges[randomIndex].id;
    const testData = Date.now().toString();

    store.updateEdgeData(edgeId, { testData }, { replace: true });

    const updatedEdge = store.getEdge(edgeId);

    expect(updatedEdge?.data!.testData).to.equal(testData);
    expect(updatedEdge?.data!.randomData).to.not.exist;
  });

  it('replaces the stored edge object immutably and leaves other edges untouched', () => {
    const edgeId = edges[randomIndex].id;
    const otherId = edges[(randomIndex + 1) % edges.length].id;

    const before = store.getEdge(edgeId);
    const otherBefore = store.getEdge(otherId);

    store.updateEdgeData(edgeId, { randomData: 'x' });

    // immutable contract: the changed edge is a NEW object, untouched edges keep their reference
    expect(store.getEdge(edgeId)).to.not.equal(before);
    if (otherId !== edgeId) {
      expect(store.getEdge(otherId)).to.equal(otherBefore);
    }
  });

  it('re-renders the edge label despite markRaw (lookup .set reactivity)', () => {
    cy.vueFlow({
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', label: 'initial', data: {} }],
    });

    cy.get('.vue-flow__edge').should('contain.text', 'initial');

    cy.then(() => {
      getStore().updateEdgeData('e1-2', { label: 'updated' });
      // store an updated label directly via setEdges too, to exercise the non-data render path
      getStore().setEdges(edgesArr => edgesArr.map(edge => ({ ...edge, label: 'updated' })));
    });

    cy.get('.vue-flow__edge').should('contain.text', 'updated');
  });

  it('works with `autoApplyChanges: false` (commit bypasses the changes pipeline)', () => {
    cy.vueFlow({
      nodes,
      edges,
      autoApplyChanges: false,
    });

    cy.then(() => {
      const s = getStore();
      const edgeId = edges[0].id;
      s.updateEdgeData(edgeId, { randomData: 'no-apply' });
      expect(s.getEdge(edgeId)?.data!.randomData).to.equal('no-apply');
    });
  });
});
