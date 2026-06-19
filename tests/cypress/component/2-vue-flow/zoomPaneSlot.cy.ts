import { h } from 'vue';

// The `zoom-pane` slot renders inside the transformed `.vue-flow__viewport` (it pans/zooms with the graph).
// It's pulled from the provided `Slots` (via ZoomPaneSlot) instead of being drilled through
// ZoomPane → Pane → Viewport — this guards that the inject path still mounts it in the right place.
describe('zoom-pane slot', () => {
  it('renders the `zoom-pane` slot inside the transformed viewport', () => {
    cy.vueFlow(
      {
        fitView: false,
        nodes: [{ id: '1', position: { x: 0, y: 0 }, data: {} }],
      },
      undefined,
      {
        'zoom-pane': () => h('div', { class: 'zoom-pane-marker' }, 'in-pane'),
      },
    );

    // it renders...
    cy.get('.zoom-pane-marker').should('exist').and('contain.text', 'in-pane');
    // ...and it's a descendant of the transformed viewport layer (not a sibling overlay like the default slot)
    cy.get('.vue-flow__viewport .zoom-pane-marker').should('exist');
  });
});
