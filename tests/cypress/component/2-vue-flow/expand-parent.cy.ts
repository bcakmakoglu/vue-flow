import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// Covers the `@xyflow/system` `handleExpandParent` integration (drag + measurement + the `extent: 'parent'`
// clamp). Parent at the origin so a drag item's absolute position equals its parent-relative
// position — keeps the assertions independent of the abs/rel convention in `updateNodePositions`.
describe('expandParent + extent: parent', () => {
  let store: VueFlowStore;

  function mount(childExtra: Record<string, any> = {}, childPosition = { x: 10, y: 10 }) {
    cy.vueFlow({
      fitView: false,
      nodes: [
        {
          id: 'p',
          position: { x: 0, y: 0 },
          data: { label: 'parent' },
          width: 100,
          height: 100,
          style: { width: '100px', height: '100px' },
        },
        {
          id: 'c',
          position: childPosition,
          data: { label: 'child' },
          parentId: 'p',
          width: 50,
          height: 50,
          style: { width: '50px', height: '50px' },
          ...childExtra,
        },
      ],
    });

    cy.then(() => {
      store = getStore();
    });
  }

  function dragItem(positionAbsolute: { x: number; y: number }) {
    return {
      id: 'c',
      position: positionAbsolute,
      distance: { x: 0, y: 0 },
      measured: { width: 50, height: 50 },
      internals: { positionAbsolute },
      parentId: 'p',
      expandParent: true,
      dragging: false,
      origin: [0, 0],
    };
  }

  describe('drag expands the parent (system handleExpandParent)', () => {
    beforeEach(() => mount({ expandParent: true }));

    it('grows the parent to contain a child dragged past its bottom-right', () => {
      // child 50x50 dragged to (80,80) → extends to (130,130), past the parent's 100x100
      cy.then(() => store.updateNodePositions([dragItem({ x: 80, y: 80 })] as any, true, false));

      cy.tryAssertion(() => {
        const parent = store.getInternalNode('p')!;
        const child = store.getInternalNode('c')!;
        expect(parent.measured.width, 'parent width grew').to.be.at.least(130);
        expect(parent.measured.height, 'parent height grew').to.be.at.least(130);
        // child stays where it was dragged (relative === absolute, parent at origin)
        expect(child.position.x).to.eq(80);
        expect(child.position.y).to.eq(80);
      });
    });

    it('pins a child dragged negative to >= 0 and grows the parent up/left', () => {
      cy.then(() => store.updateNodePositions([dragItem({ x: -30, y: -30 })] as any, true, false));

      cy.tryAssertion(() => {
        const parent = store.getInternalNode('p')!;
        const child = store.getInternalNode('c')!;
        // child relative position is clamped to the parent's (new) top-left corner
        expect(child.position.x).to.eq(0);
        expect(child.position.y).to.eq(0);
        // parent moved up/left by the overflow and grew to absorb it
        expect(parent.position.x).to.eq(-30);
        expect(parent.position.y).to.eq(-30);
        expect(parent.measured.width).to.be.at.least(130);
        expect(parent.measured.height).to.be.at.least(130);
      });
    });
  });

  describe('measurement expands the parent', () => {
    // child rendered larger than the parent → re-measurement on mount should expand the parent
    beforeEach(() => mount({ expandParent: true, width: 140, height: 140, style: { width: '140px', height: '140px' } }));

    it('grows the parent to fit a freshly-measured oversized child', () => {
      cy.tryAssertion(
        () => {
          const parent = store.getInternalNode('p')!;
          // child at (10,10) sized 140x140 → needs at least 150x150 of parent
          expect(parent.measured.width).to.be.at.least(150);
          expect(parent.measured.height).to.be.at.least(150);
        },
        { timeout: 3000 },
      );
    });
  });

  describe('measurement re-clamps an extent-constrained child before expanding', () => {
    // expandParent + extent:'parent': a child whose fixed position + measured size would overflow must be
    // clamped back inside the parent (matching @xyflow/system), NOT grow the parent. Regression guard for
    // the dimensions-path rect using an unclamped position.
    beforeEach(() => {
      cy.vueFlow({
        fitView: false,
        nodes: [
          { id: 'p', position: { x: 0, y: 0 }, data: {}, width: 200, height: 200, style: { width: '200px', height: '200px' } },
          {
            id: 'c',
            position: { x: 150, y: 150 }, // 150 + 100 = 250 would overflow the 200px parent
            data: {},
            parentId: 'p',
            extent: 'parent',
            expandParent: true,
            width: 100,
            height: 100,
            style: { width: '100px', height: '100px' },
          },
        ],
      });
      cy.then(() => {
        store = getStore();
      });
    });

    it('clamps the child instead of over-expanding the parent', () => {
      cy.tryAssertion(
        () => {
          const parent = store.getInternalNode('p')!;
          const child = store.getInternalNode('c')!;
          // parent must stay ~200 (it would balloon to ~250 if the rect used the unclamped position)
          expect(parent.measured.width, 'parent not over-expanded').to.be.lessThan(230);
          // child is clamped to sit inside the parent (200 − child width ≈ 100)
          expect(child.internals.positionAbsolute.x, 'child clamped inside parent').to.be.lessThan(120);
        },
        { timeout: 3000 },
      );
    });
  });
});
