import { defineComponent, h, markRaw } from 'vue';

// xyflow/react #5384: when a node/edge has an unknown `type`, it falls back to the `'default'` type — and
// that fallback must honor a user's CUSTOM `default` registered via `nodeTypes`/`edgeTypes`, not the
// built-in. vue-flow resolves the fallback through the merged `getNodeTypes`/`getEdgeTypes`
// (`{ ...builtin, ...userTypes }`), so a custom default already wins. This guards that behavior.
describe('unknown type falls back to the custom default override (#5384)', () => {
  const CustomDefaultNode = markRaw(
    defineComponent({
      name: 'CustomDefaultNode',
      setup: () => () => h('div', { class: 'custom-default-node' }, 'custom default node'),
    }),
  );

  const CustomDefaultEdge = markRaw(
    defineComponent({
      name: 'CustomDefaultEdge',
      setup: () => () => h('path', { 'class': 'custom-default-edge', 'd': 'M0,0 L10,10', 'data-testid': 'custom-edge' }),
    }),
  );

  it('renders an unknown node type with the custom default node', () => {
    cy.vueFlow({
      fitView: false,
      nodeTypes: { default: CustomDefaultNode },
      nodes: [{ id: '1', type: 'unregistered', position: { x: 0, y: 0 }, data: {} }],
    });

    cy.get('.vue-flow__node[data-id="1"] .custom-default-node').should('exist');
  });

  it('renders an unknown edge type with the custom default edge', () => {
    cy.vueFlow({
      fitView: false,
      edgeTypes: { default: CustomDefaultEdge },
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: {} },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: {} },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', type: 'unregistered' }],
    });

    cy.get('.vue-flow__edge[data-id="e1-2"] .custom-default-edge').should('exist');
  });
});
