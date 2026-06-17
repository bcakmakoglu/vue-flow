import { MarkerType } from '@vue-flow/core';

// xyflow/react #5419 + #5459: arrowhead markers can be themed via the `--xy-edge-stroke` CSS variable when
// no explicit color is given (`defaultMarkerColor: null`); a set color is applied inline. The closed arrow
// fills, the open arrow only strokes.
describe('arrowhead markers', () => {
  function mount(defaultMarkerColor: string | null, type: MarkerType) {
    cy.vueFlow({
      fitView: false,
      defaultMarkerColor,
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, data: {} },
        { id: '2', position: { x: 200, y: 0 }, data: {} },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', markerEnd: { type } }],
    });
  }

  it('applies an explicit defaultMarkerColor inline (closed arrow strokes + fills)', () => {
    mount('#ff0000', MarkerType.ArrowClosed);

    cy.get('.vue-flow__arrowhead polyline.arrowclosed').should('exist').then(($p) => {
      expect($p[0].style.stroke, 'inline stroke').to.eq('rgb(255, 0, 0)');
      expect($p[0].style.fill, 'inline fill').to.eq('rgb(255, 0, 0)');
    });
  });

  it('falls back to the --xy-edge-stroke variable when defaultMarkerColor is null', () => {
    mount(null, MarkerType.ArrowClosed);

    cy.get('.vue-flow__arrowhead polyline.arrowclosed').should('exist').then(($p) => {
      // no inline color → the CSS variable drives it
      expect($p[0].style.stroke, 'no inline stroke').to.eq('');
      expect($p[0].style.fill, 'no inline fill').to.eq('');

      const computed = getComputedStyle($p[0]);
      expect(computed.stroke, 'stroke resolves to --xy-edge-stroke default').to.eq('rgb(177, 177, 183)');
      expect(computed.fill, 'closed arrow fills from the variable').to.eq('rgb(177, 177, 183)');
    });
  });

  it('does not fill the open arrow (only strokes)', () => {
    mount(null, MarkerType.Arrow);

    cy.get('.vue-flow__arrowhead polyline.arrow').should('exist').then(($p) => {
      const computed = getComputedStyle($p[0]);
      expect(computed.stroke, 'open arrow strokes from the variable').to.eq('rgb(177, 177, 183)');
      expect(computed.fill, 'open arrow is not filled').to.eq('none');
    });
  });

  // xyflow/react #5196: markers are decorative, so the marker-definitions <svg> is hidden from screen readers
  it('hides the marker definitions svg from screen readers (aria-hidden)', () => {
    mount(null, MarkerType.ArrowClosed);

    cy.get('svg.vue-flow__marker').should('have.attr', 'aria-hidden', 'true');
  });
});
