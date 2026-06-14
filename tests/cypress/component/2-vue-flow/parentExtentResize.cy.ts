import { getStore } from '../../support/component';

// Regression for #1539: a child with `extent: 'parent'` must be re-clamped into the parent when the
// parent SHRINKS (not only on the child's next drag). 2.0 re-clamps on every commit via
// `recomputeAbsolutePositions` → the system's `calculateChildXYZ` / `clampPositionToParent`.
describe('Issue #1539: extent:parent child re-clamps when the parent shrinks', () => {
  it('clamps the child into the shrunk parent', () => {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, style: { width: '200px', height: '200px' } },
        { id: '2', parentId: '1', extent: 'parent', position: { x: 150, y: 150 }, style: { width: '40px', height: '40px' } },
      ],
    });

    cy.get('[data-id="2"]').should('exist');

    // baseline: child sits at ~150 inside the 200x200 parent
    cy.tryAssertion(() => {
      expect(getStore().getInternalNode('2')?.internals.positionAbsolute?.x).to.be.closeTo(150, 5);
    });

    // shrink the parent to 100x100
    cy.then(() => {
      getStore().updateNode('1', { style: { width: '100px', height: '100px' } });
    });

    // child (40 wide) in a 100-wide parent → max x/y = 60; un-clamped it would stay ~150
    cy.tryAssertion(() => {
      const pos = getStore().getInternalNode('2')?.internals.positionAbsolute;
      expect(pos?.x, 'child x re-clamped into shrunk parent').to.be.at.most(61);
      expect(pos?.y, 'child y re-clamped into shrunk parent').to.be.at.most(61);
    });
  });
});
