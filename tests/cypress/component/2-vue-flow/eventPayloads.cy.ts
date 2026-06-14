import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow parity: node event payloads carry the USER node (no `internals`), not the enriched
// InternalNode. The enriched node stays reachable via getInternalNode(id).
describe('node event payloads are user nodes', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
      ],
    });

    cy.then(() => {
      store = getStore();
    });
  });

  it('onNodeClick delivers the user node, not the InternalNode', () => {
    let payload: { node: any } | undefined;
    cy.then(() => {
      store.onNodeClick((p) => {
        payload = p;
      });
    });

    cy.get('[data-id="1"]').click();

    cy.tryAssertion(() => {
      expect(payload, 'nodeClick fired').to.not.be.undefined;
      expect(payload!.node.id).to.eq('1');
      // the payload is the user node — no enriched `internals` field
      expect('internals' in payload!.node, 'payload node has no internals').to.eq(false);
      // ...but the enriched InternalNode is still reachable through the accessor
      expect(store.getInternalNode('1')).to.have.property('internals');
    });
  });
});
