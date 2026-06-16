import type { ConnectingHandle, VueFlowStore } from '@vue-flow/core';
import { Handle, Position } from '@vue-flow/core';
import { defineComponent, h } from 'vue';
import { getStore } from '../../support/component';

// xyflow/react #5042 + full model alignment: the `connectionindicator` class must reflect `isConnectableEnd`
// for possible end handles while a connection is in progress (drag OR click) — previously vue-flow keyed it
// on a per-handle "is this the start/end handle" check, so an end-only handle never lit up as a target.
const EndOnlyNode = defineComponent({
  name: 'EndOnlyNode',
  setup: () => () => h(Handle, { type: 'target', position: Position.Left, connectableStart: false, connectableEnd: true }),
});

describe('Handle connectionindicator', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow(
      {
        fitView: false,
        nodes: [
          { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: 'start' } },
          { id: '2', type: 'endonly', position: { x: 200, y: 0 }, data: {} },
        ],
      },
      {},
      { 'node-endonly': (props: any) => h(EndOnlyNode, props) },
    );
    cy.then(() => {
      store = getStore();
    });
  });

  function endOnlyHandle() {
    return cy.get('[data-nodeid="2"].vue-flow__handle');
  }

  it('does not mark an end-only handle as an indicator while idle', () => {
    endOnlyHandle().should('exist').and('not.have.class', 'connectionindicator');
  });

  it('marks the end-only handle as an indicator during a drag connection', () => {
    cy.then(() => {
      store.connectionStartHandle.value = {
        nodeId: '1',
        id: null,
        type: 'source',
        position: Position.Right,
        x: 0,
        y: 0,
      } satisfies ConnectingHandle;
    });

    endOnlyHandle().should('have.class', 'connectionindicator');
  });

  it('marks the end-only handle as an indicator during a click connection', () => {
    cy.then(() => {
      store.connectionClickStartHandle.value = {
        nodeId: '1',
        id: null,
        type: 'source',
        position: Position.Right,
        x: 0,
        y: 0,
      } satisfies ConnectingHandle;
    });

    endOnlyHandle().should('have.class', 'connectionindicator');
  });
});
