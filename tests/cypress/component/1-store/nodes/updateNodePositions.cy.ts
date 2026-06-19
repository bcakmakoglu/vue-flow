import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';

/**
 * Regression: drag items arrive with parent-RELATIVE positions (XYDrag's `calculateNodePosition` and the
 * keyboard path's `calcNextPosition` both subtract the parent offset already). `updateNodePositions` used
 * to subtract the parent's `positionAbsolute` a second time, so dragging a child of a parent that isn't
 * at the origin landed at `position - parentAbsolute`.
 */
describe('Store Action: `updateNodePositions`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes: [
        {
          id: 'parent',
          type: 'default',
          position: { x: 100, y: 100 },
          data: { label: 'Parent' },
          style: { width: '300px', height: '300px' },
        },
        {
          id: 'child',
          type: 'default',
          parentId: 'parent',
          position: { x: 20, y: 60 },
          data: { label: 'Child' },
        },
      ],
    });

    cy.then(() => {
      store = getStore();
    });
  });

  it('keeps a child drag item parent-relative (no double parent-offset subtraction)', () => {
    // the exact shape `useDrag` forwards from XYDrag: position is parent-relative,
    // internals.positionAbsolute is the new absolute position
    store.updateNodePositions(
      [
        {
          id: 'child',
          position: { x: 30, y: 70 },
          distance: { x: 10, y: 10 },
          measured: { width: 150, height: 36 },
          internals: { positionAbsolute: { x: 130, y: 170 } },
          parentId: 'parent',
        },
      ],
      true,
      true,
    );

    cy.tryAssertion(() => {
      const child = store.getNode('child');
      expect(child?.position).to.deep.equal({ x: 30, y: 70 });

      const internalChild = store.getInternalNode('child');
      expect(internalChild?.internals.positionAbsolute).to.deep.equal({ x: 130, y: 170 });
    });
  });
});
