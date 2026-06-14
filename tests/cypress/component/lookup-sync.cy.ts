import type { VueFlowStore } from '@vue-flow/core';
import { watchEffect } from 'vue';
import { getStore } from '../support/component';

/**
 * Regression: adoption used to run `@xyflow/system`'s `adoptUserNodes` directly on the `reactive(Map)`
 * lookups, whose clear+refill invalidated EVERY lookup subscriber on every commit (= every drag frame).
 * Adoption now runs against plain system maps and is mirrored with targeted `.set`/`.delete`, so a
 * change to one node must not re-trigger effects tracking other nodes' lookup keys.
 */
describe('lookup sync is O(changed)', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
        { id: '3', type: 'default', position: { x: 400, y: 0 }, data: { label: 'Node 3' } },
      ],
    });

    cy.then(() => {
      store = getStore();
    });
  });

  it('does not invalidate unrelated lookup keys on a position change', () => {
    // run inside `cy.then` so `store` is assigned, and assert the change in run-counts caused by the
    // mutation (a baseline captured right before it) rather than absolute counts — robust to any
    // mount-time re-adopt that may have already run an effect once.
    cy.then(() => {
      let changedRuns = 0;
      let unrelatedRuns = 0;

      // watchEffect re-runs on every trigger of its deps, with no value-equality gate — exactly what a
      // render effect tracking a raw `nodeLookup.get` does
      watchEffect(
        () => {
          store.nodeLookup.get('1');
          changedRuns++;
        },
        { flush: 'sync' },
      );

      watchEffect(
        () => {
          store.nodeLookup.get('2');
          unrelatedRuns++;
        },
        { flush: 'sync' },
      );

      const changedBefore = changedRuns;
      const unrelatedBefore = unrelatedRuns;

      store.applyNodeChanges([{ id: '1', type: 'position', position: { x: 50, y: 50 } }]);

      // the moved node's entry was replaced (new InternalNode) — its key must trigger
      expect(changedRuns, 'effect tracking the moved node re-ran').to.be.greaterThan(changedBefore);
      // the untouched node's InternalNode is reused by reference — its key must NOT trigger
      expect(unrelatedRuns, 'effect tracking an untouched node did not re-run').to.equal(unrelatedBefore);
    });
  });

  it('edge changes do not invalidate unrelated edge lookup keys', () => {
    cy.then(() => {
      store.addEdges([
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ]);
    });

    cy.then(() => {
      let changedRuns = 0;
      let unrelatedRuns = 0;

      watchEffect(
        () => {
          store.edgeLookup.get('e1-2');
          changedRuns++;
        },
        { flush: 'sync' },
      );

      watchEffect(
        () => {
          store.edgeLookup.get('e2-3');
          unrelatedRuns++;
        },
        { flush: 'sync' },
      );

      const changedBefore = changedRuns;
      const unrelatedBefore = unrelatedRuns;

      store.applyEdgeChanges([{ id: 'e1-2', type: 'select', selected: true }]);

      expect(changedRuns, 'effect tracking the changed edge re-ran').to.be.greaterThan(changedBefore);
      expect(unrelatedRuns, 'effect tracking an untouched edge did not re-run').to.equal(unrelatedBefore);
    });
  });

  it('removals only touch the removed key', () => {
    cy.then(() => {
      let removedRuns = 0;
      let unrelatedRuns = 0;

      watchEffect(
        () => {
          store.nodeLookup.get('3');
          removedRuns++;
        },
        { flush: 'sync' },
      );

      watchEffect(
        () => {
          store.nodeLookup.get('2');
          unrelatedRuns++;
        },
        { flush: 'sync' },
      );

      const removedBefore = removedRuns;
      const unrelatedBefore = unrelatedRuns;

      store.removeNodes(['3']);

      expect(store.getNode('3'), 'node removed').to.equal(undefined);
      expect(removedRuns, 'effect tracking the removed node re-ran').to.be.greaterThan(removedBefore);
      expect(unrelatedRuns, 'effect tracking an untouched node did not re-run').to.equal(unrelatedBefore);
    });
  });
});
