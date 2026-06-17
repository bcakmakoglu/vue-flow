import { Position } from '@vue-flow/core';
import { getStore } from '../../support/component';

// `@xyflow/system`'s `parseHandles` resets `handleBounds` to `undefined` whenever a re-committed user node
// carries no `measured` — and vue-flow's node-rep split always keeps `measured` off the user node. So a plain
// re-commit (a layout pass, `nodes.value.map(...)`, `updateNode`) would wipe the handle bounds and leave
// edges anchored to the node's default handle positions. `adoptNodes` carries the prior `measured`/
// `handleBounds` forward to prevent that.
describe('handle bounds survive re-commits', () => {
  const nodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'a' } },
    { id: '2', position: { x: 300, y: 0 }, data: { label: 'b' } },
  ];
  const edges = [{ id: 'e1-2', source: '1', target: '2' }];

  let store: ReturnType<typeof getStore>;
  const bounds = (id: string) => store.getInternalNode(id)?.internals.handleBounds;

  it('keeps handle bounds when a node is re-committed without resizing', () => {
    cy.vueFlow({ nodes, edges, fitView: false });
    cy.then(() => {
      store = getStore();
    });

    // wait for the initial measure to populate handle bounds
    cy.tryAssertion(() => {
      expect(bounds('1')?.source, 'initial source bounds').to.have.length(1);
    });

    cy.then(() => {
      // a fresh node object with no size change (mirrors a class/position update or a layout pass)
      store.updateNode('1', { position: { x: 10, y: 10 } });
    });

    cy.tryAssertion(() => {
      const b = bounds('1');
      expect(b, 'handleBounds object survives the re-commit').to.not.be.undefined;
      expect(b?.source, 'source bounds survive the re-commit').to.have.length(1);
      expect(b?.target, 'target bounds survive the re-commit').to.have.length(1);
    });
  });

  it('repopulates handle bounds to the new side when sourcePosition/targetPosition change', () => {
    cy.vueFlow({ nodes, edges, fitView: false });
    cy.then(() => {
      store = getStore();
    });

    cy.tryAssertion(() => {
      expect(bounds('1')?.source?.[0]?.position, 'default source handle is bottom').to.eq(Position.Bottom);
      expect(bounds('1')?.target?.[0]?.position, 'default target handle is top').to.eq(Position.Top);
    });

    cy.then(() => {
      // mirror a horizontal (LR) dagre layout flipping the handles to the sides
      store.updateNode('1', { sourcePosition: Position.Right, targetPosition: Position.Left });
    });

    cy.tryAssertion(() => {
      expect(bounds('1')?.source?.[0]?.position, 'source handle moved to the right').to.eq(Position.Right);
      expect(bounds('1')?.target?.[0]?.position, 'target handle moved to the left').to.eq(Position.Left);
    });
  });
});
