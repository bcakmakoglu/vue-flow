import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

describe('Check if nodes can be connected', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      fitView: false,
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
      ],
      autoConnect: true,
    });

    cy.then(() => {
      store = getStore();
    });
  });

  // one drag, all outcomes asserted together: the connect lifecycle events and the resulting edge are all
  // consequences of the SAME drag, so splitting them across `it`s (each re-dragging in `beforeEach`) ran
  // the synthetic drag 4× per spec — every one a flake chance (p⁴). Consolidated, cypress retries the
  // whole interaction as one unit.
  describe('by dragging', () => {
    it('creates a connection and emits the connect lifecycle once', () => {
      let startCount = 0;
      let connectCount = 0;
      let endCount = 0;

      cy.then(() => {
        store.onConnectStart(() => startCount++);
        store.onConnect(() => connectCount++);
        store.onConnectEnd(() => endCount++);
      });

      cy.dragConnection('1', '2');

      cy.get('.vue-flow__edge').should('have.length', 1);

      cy.then(() => {
        expect(store.edges.value).to.have.length(1);

        const edge = store.edges.value[0];
        expect(edge.source).to.eq('1');
        expect(edge.target).to.eq('2');
        expect(edge.sourceHandle).to.eq(null);
        expect(edge.targetHandle).to.eq(null);

        expect(startCount, 'onConnectStart fired once').to.eq(1);
        expect(connectCount, 'onConnect fired once').to.eq(1);
        expect(endCount, 'onConnectEnd fired once').to.eq(1);
      });
    });
  });

  describe('by clicking', () => {
    beforeEach(() => {
      cy.then(() => {
        store.connectOnClick.value = true;
      });

      cy.connect('1', '2');

      cy.get('.vue-flow__edge').should('have.length', 1);
    });

    it('creates connection by clicking', () => {
      cy.get('.vue-flow__edge').should('have.length', 1);

      expect(store.edges.value).to.have.length(1);

      const edge = store.edges.value[0];
      expect(edge.source).to.eq('1');
      expect(edge.target).to.eq('2');

      expect(edge.sourceHandle).to.eq(null);
      expect(edge.targetHandle).to.eq(null);
    });
  });
});
