import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

describe('Check if edges are reconnectable', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      fitView: false,
      edgesReconnectable: true,
      nodes: [
        {
          id: '1',
          data: { label: 'Node 1' },
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          data: { label: 'Node 2' },
          position: { x: 300, y: 300 },
        },
        {
          id: '3',
          data: { label: 'Node 3' },
          position: { x: 300, y: 0 },
        },
      ],
      edges: [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
        },
      ],
      autoConnect: true,
    });

    cy.then(() => {
      store = getStore();
      store.onReconnect(params => store.reconnectEdge(params.edge, params.connection));
    });
  });

  it('updates edge', () => {
    cy.window().then((win) => {
      const edgeAnchor = cy.get('.vue-flow__edgeupdater[data-type="target"]');
      const targetHandle = cy.get(`[data-nodeid="3"].target`);

      targetHandle.then(async (handle) => {
        const target = handle[0];
        const { x, y } = target.getBoundingClientRect();

        edgeAnchor
          .trigger('mousedown', {
            button: 0,
            force: true,
            view: win,
          })
          .trigger('mousemove', {
            clientX: x,
            clientY: y,
            force: true,
          })
          .trigger('mouseup', {
            clientX: x,
            clientY: y,
            force: true,
            view: win,
          });

        await cy.tryAssertion(() => {
          const storedEdges = store.edges.value;
          expect(storedEdges).to.have.length(1);
          expect(storedEdges[0].target).to.equal('3');
          expect(storedEdges[0].source).to.equal('1');
        });
      });
    });
  });
});
