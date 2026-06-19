import type { VueFlowStore } from '@vue-flow/core';
import { Handle, Position } from '@vue-flow/core';
import { h } from 'vue';
import { getStore } from '../../support/component';

// xyflow/react #4594: reconnecting edges in `connectionMode: 'loose'`. The fix is in `@xyflow/system`'s
// `getHandle` — in loose mode it searches BOTH source+target handle bounds, so the fixed (opposite) end of a
// reconnect is found even when its handle is registered under the "wrong" type. Reproduce that exact case:
// every node has a single `source`-type handle, so the edge's TARGET end uses a source-type handle — looking
// it up as a `target` handle (strict) would miss it, breaking the reconnect start.
describe('loose connectionMode edge reconnection (#4594)', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow(
      {
        fitView: false,
        connectionMode: 'loose',
        edgesReconnectable: true,
        nodes: [
          { id: '1', type: 'single', position: { x: 0, y: 0 }, data: {} },
          { id: '2', type: 'single', position: { x: 200, y: 0 }, data: {} },
          { id: '3', type: 'single', position: { x: 400, y: 0 }, data: {} },
        ],
        edges: [{ id: 'e1-2', source: '1', target: '2' }],
      },
      undefined,
      {
        'node-single': () => h('div', { style: { width: '30px', height: '30px' } }, [
          h(Handle, { type: 'source', position: Position.Right }),
        ]),
      },
    );

    cy.then(() => {
      store = getStore();
      store.onReconnect(params => store.reconnectEdge(params.edge, params.connection));
    });
  });

  it('reconnects the source end onto a source-type handle (both-bounds lookup)', () => {
    cy.window().then((win) => {
      // the fixed end here is the edge's TARGET (node 2) — whose only handle is a `source` handle
      const edgeAnchor = cy.get('.vue-flow__edgeupdater[data-type="source"]');
      const newSourceHandle = cy.get(`[data-nodeid="3"].source`);

      newSourceHandle.then((handle) => {
        const { x, y } = handle[0].getBoundingClientRect();

        edgeAnchor
          .trigger('mousedown', { button: 0, force: true, view: win })
          .trigger('mousemove', { clientX: x, clientY: y, force: true })
          .trigger('mouseup', { clientX: x, clientY: y, force: true, view: win });

        cy.tryAssertion(() => {
          const edges = store.edges.value;
          expect(edges, 'still one edge').to.have.length(1);
          // the source end moved to node 3; the target (the fixed source-type handle) stayed node 2
          expect(edges[0].source, 'source reconnected').to.equal('3');
          expect(edges[0].target, 'target unchanged').to.equal('2');
        });
      });
    });
  });
});
