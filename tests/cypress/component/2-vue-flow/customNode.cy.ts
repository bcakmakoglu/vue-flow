import type { NodeComponent } from '@vue-flow/core';
import { Handle } from '@vue-flow/core';
import { defineComponent, h, markRaw } from 'vue';

const CustomNode: NodeComponent = defineComponent(() => {
  return () =>
    h('div', { class: 'vue-flow__node-default' }, [
      h(Handle as any, { id: 'handle-1', position: 'left', type: 'target', style: { top: '5px' } }),
      h(Handle as any, { id: 'handle-2', position: 'left', type: 'target', style: { bottom: '-10px' } }),
      h('div', { class: 'test-custom-node' }, 'Custom Node'),
      h(Handle as any, { id: 'handle-3', position: 'right' }),
    ]);
});

describe('Check if custom nodes are rendered', () => {
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
          type: 'custom',
          data: { label: 'Node 2' },
          position: { x: 300, y: 300 },
        },
      ],
      nodeTypes: {
        custom: markRaw(CustomNode),
      },
    });
  });

  it('renders custom node', () => {
    cy.get('.vue-flow__node-custom').should('have.length', 1);

    cy.get('.test-custom-node').should('have.length', 1).should('contain', 'Custom Node');

    cy.get('.vue-flow__node-custom').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 300, 300)');
  });

  it('marks handles connectable by default (no explicit :connectable) so they are valid drop targets', () => {
    // regression: the `connectable` class used the raw (undefined) prop instead of the resolved value;
    // XYHandle's DOM query targets `.connectable` to find drop targets
    cy.get('.vue-flow__node-custom .vue-flow__handle').should('have.length', 3).and('have.class', 'connectable');

    // and no accidental `vue-flow__handle-null` when a handle id is set
    cy.get('.vue-flow__handle-null').should('not.exist');
  });
});
