// xyflow parity: the edge `<g>` carries a `selectable` class whenever the edge is selectable (its own
// `selectable` flag, or `elementsSelectable` when unset). The CSS keys `cursor: pointer` and the
// focus/selected stroke off `.selectable`, so a non-selectable edge must NOT get it.
describe('edge `selectable` class', () => {
  const nodes = [
    { id: 'a', position: { x: 0, y: 0 }, data: {} },
    { id: 'b', position: { x: 200, y: 0 }, data: {} },
  ];

  it('a selectable edge gets the `selectable` class', () => {
    cy.vueFlow({
      fitView: false,
      nodes,
      edges: [{ id: 'a-b', source: 'a', target: 'b' }],
    });

    cy.get('.vue-flow__edge[data-id="a-b"]').should('have.class', 'selectable');
  });

  it('an edge with `selectable: false` omits the class', () => {
    cy.vueFlow({
      fitView: false,
      nodes,
      edges: [{ id: 'a-b', source: 'a', target: 'b', selectable: false }],
    });

    cy.get('.vue-flow__edge[data-id="a-b"]').should('not.have.class', 'selectable');
  });

  it('`elementsSelectable: false` strips the class from all edges', () => {
    cy.vueFlow({
      fitView: false,
      elementsSelectable: false,
      nodes,
      edges: [{ id: 'a-b', source: 'a', target: 'b' }],
    });

    cy.get('.vue-flow__edge[data-id="a-b"]').should('not.have.class', 'selectable');
  });
});
