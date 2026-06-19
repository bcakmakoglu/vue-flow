import { Controls, MiniMap } from '@vue-flow/core';
import { h } from 'vue';

// xyflow/react #5277: `ariaLabelConfig` prop customizes the a11y text (node/edge descriptions, the aria-live
// move message, and the Controls/MiniMap/Handle labels). The prop is a Partial merged over the defaults.
describe('ariaLabelConfig (#5277)', () => {
  beforeEach(() => {
    cy.vueFlow(
      {
        fitView: false,
        ariaLabelConfig: {
          'handle.ariaLabel': 'Custom handle',
          'minimap.ariaLabel': 'Custom minimap',
          'controls.zoomIn.ariaLabel': 'Custom zoom in',
          'node.a11yDescription.keyboardDisabled': 'CUSTOM NODE DESC',
        },
        nodes: [{ id: '1', position: { x: 0, y: 0 }, data: { label: 'n' } }],
      },
      undefined,
      { default: () => [h(Controls), h(MiniMap)] },
    );
  });

  it('applies the overridden labels across handle, minimap, controls, and node description', () => {
    cy.get('.vue-flow__handle').first().should('have.attr', 'aria-label', 'Custom handle');
    cy.get('#vue-flow__minimap-test').should('have.text', 'Custom minimap');
    cy.get('.vue-flow__controls-zoomin').should('have.attr', 'aria-label', 'Custom zoom in');
    // the zoom-in button also mirrors the label onto `title`
    cy.get('.vue-flow__controls-zoomin').should('have.attr', 'title', 'Custom zoom in');
    cy.get('#vue-flow__node-desc-test').should('contain.text', 'CUSTOM NODE DESC');
  });

  it('keeps the defaults for unspecified keys (merged over defaults)', () => {
    cy.get('.vue-flow__controls-zoomout').should('have.attr', 'aria-label', 'Zoom Out');
    cy.get('.vue-flow__controls-fitview').should('have.attr', 'aria-label', 'Fit View');
    cy.get('.vue-flow__controls').should('have.attr', 'aria-label', 'Control Panel');
  });
});
