import { ConnectionMode } from '@vue-flow/core';
import { getStore } from '../../support/component';

// Regression for #1655: `connectionMode` defaults to `ConnectionMode.Strict` in 2.0 (it was `Loose` in
// v1). Strict only permits source->target connections; the system rejects same-type (source<->source)
// connections — which is what the issue asked for. This locks in the default (a Loose default would
// re-open the bug) and sanity-checks that a normal source->target connection still works.
describe('Issue #1655: ConnectionMode.Strict is the default', () => {
  beforeEach(() => {
    cy.vueFlow({
      fitView: false,
      // intentionally no `connectionMode` prop — this asserts the DEFAULT
      autoConnect: true,
      nodes: [
        { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 300, y: 300 } },
      ],
    });
  });

  it('defaults connectionMode to Strict', () => {
    cy.then(() => {
      expect(getStore().connectionMode.value).to.eq(ConnectionMode.Strict);
    });
  });

  it('connects a source handle to a target handle', () => {
    cy.dragConnection('1', '2');

    cy.get('.vue-flow__edge').should('have.length', 1);
    cy.then(() => {
      expect(getStore().edges.value).to.have.length(1);
    });
  });
});
