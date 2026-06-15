import { getStore } from '../../../support/component';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: {} },
  { id: '2', position: { x: 200, y: 0 }, data: {} },
];

describe('selection sync (getSelectionChanges no longer mutates the lookup in place)', () => {
  it('single-select replaces the previous selection (autoApplyChanges: true)', () => {
    cy.vueFlow({ nodes });

    cy.then(() => {
      const store = getStore();

      store.addSelectedNodes([store.getNode('1')!]);
      expect(store.getNode('1')?.selected, 'node 1 selected').to.eq(true);

      // selecting node 2 (not multi-select) must deselect node 1 — driven by the synchronous
      // re-adopt, no in-place lookup mutation
      store.addSelectedNodes([store.getNode('2')!]);

      expect(store.getNode('2')?.selected, 'node 2 selected').to.eq(true);
      expect(!!store.getNode('1')?.selected, 'node 1 deselected').to.eq(false);

      // lookup InternalNode and user node agree (no desync)
      expect(store.getInternalNode('1')?.selected).to.eq(store.getNode('1')?.selected);
      expect(store.getInternalNode('2')?.selected).to.eq(store.getNode('2')?.selected);
    });
  });

  it('does not desync the lookup from the user node under autoApplyChanges: false', () => {
    cy.vueFlow({ nodes, autoApplyChanges: false });

    cy.then(() => {
      const store = getStore();

      // with autoApplyChanges:false and no user change handler, the emitted select change is NOT applied —
      // selection state must not change, and the lookup must stay consistent with the user node
      store.addSelectedNodes([store.getNode('1')!]);

      expect(!!store.getNode('1')?.selected, 'user node unchanged (change not applied)').to.eq(false);
      // the bug this guards: the old in-place mutation set the InternalNode's `selected` while the user
      // node stayed false → permanent lookup/user desync (and XYDrag read the stale lookup value)
      expect(store.getInternalNode('1')?.selected, 'lookup matches user node').to.eq(store.getNode('1')?.selected);
    });
  });
});
