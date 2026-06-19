import type { VueFlowStore } from '@vue-flow/core';
import { Position } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5376: smoothstep/step edges accept a `pathOptions.stepPosition` (0 = bend at source,
// 1 = at target, 0.5 = midpoint, the default). The engine lives in `@xyflow/system`'s `getSmoothStepPath`;
// this guards that vue-flow forwards `pathOptions.stepPosition` through to it.
describe('smoothstep edge stepPosition (#5376)', () => {
  let store: VueFlowStore;

  const PATH = '.vue-flow__edge[data-id="e1-2"] .vue-flow__edge-path';

  beforeEach(() => {
    cy.vueFlow({
      fitView: false,
      // opposite horizontal handles (source → right, target → left) so the bend's X tracks stepPosition
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, width: 40, height: 40, data: {}, sourcePosition: Position.Right, targetPosition: Position.Left },
        { id: '2', position: { x: 300, y: 150 }, width: 40, height: 40, data: {}, sourcePosition: Position.Right, targetPosition: Position.Left },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep', pathOptions: { stepPosition: 0.2 } }],
    });
    cy.then(() => {
      store = getStore();
    });
  });

  it('moves the bend when stepPosition changes', () => {
    let near: string | undefined;
    cy.get(PATH).invoke('attr', 'd').then((d) => {
      near = d as string;
    });

    cy.then(() => store.updateEdge('e1-2', { pathOptions: { stepPosition: 0.8 } }));

    cy.get(PATH).should(($p) => {
      expect($p.attr('d'), 'stepPosition 0.8 produces a different path than 0.2').to.not.eq(near);
    });
  });

  it('treats an unset stepPosition as the 0.5 default', () => {
    cy.then(() => store.updateEdge('e1-2', { pathOptions: {} }));

    let unset: string | undefined;
    cy.get(PATH).invoke('attr', 'd').then((d) => {
      unset = d as string;
    });

    cy.then(() => store.updateEdge('e1-2', { pathOptions: { stepPosition: 0.5 } }));

    cy.get(PATH).should(($p) => {
      expect($p.attr('d'), 'explicit 0.5 matches the unset default').to.eq(unset);
    });
  });
});
