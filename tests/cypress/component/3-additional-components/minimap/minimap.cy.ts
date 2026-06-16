import { getElements } from '../../../utils';
import App from './App.vue';

const { nodes, edges } = getElements();

describe('Render MiniMap', () => {
  beforeEach(() => {
    cy.mount(App, {
      props: {
        nodes,
        edges,
      },
      attrs: {
        style: {
          width: '100vw',
          height: '100vh',
        },
      },
    });
  });

  it('renders minimap', () => {
    cy.get('.vue-flow__minimap').should('exist');
  });

  it('renders minimap nodes', () => {
    cy.get('.vue-flow__minimap-node').should('have.length', nodes.length);
  });
});

// xyflow/react & xyflow/svelte #5546: the minimap must not break when every node is hidden — the bounds
// must stay finite (no Infinity/NaN viewBox) and hidden nodes must be excluded from the minimap.
describe('MiniMap with all nodes hidden', () => {
  beforeEach(() => {
    cy.mount(App, {
      props: {
        nodes: nodes.map(n => ({ ...n, hidden: true })),
        edges,
      },
      attrs: {
        style: {
          width: '100vw',
          height: '100vh',
        },
      },
    });
  });

  it('renders with a finite viewBox', () => {
    cy.get('.vue-flow__minimap svg').should('exist').then(($svg) => {
      const viewBox = $svg.attr('viewBox') ?? '';
      expect(viewBox, 'viewBox has no NaN/Infinity').to.match(/^-?[\d.]+ -?[\d.]+ -?[\d.]+ -?[\d.]+$/);
    });
  });

  it('renders no minimap nodes', () => {
    cy.get('.vue-flow__minimap-node').should('have.length', 0);
  });
});
