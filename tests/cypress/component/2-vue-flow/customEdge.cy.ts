import type { EdgeComponent } from '@vue-flow/core';
import { BaseEdge, getBezierPath } from '@vue-flow/core';
import { h, markRaw } from 'vue';

const CustomEdge: EdgeComponent = (props) => {
  const path = getBezierPath(props);
  return h(BaseEdge as any, { path: path[0], class: 'test-custom-edge' });
};

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
          type: 'output',
          data: { label: 'Node 2' },
          position: { x: 300, y: 300 },
        },
      ],
      edges: [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          type: 'custom',
        },
      ],
      edgeTypes: {
        custom: markRaw(CustomEdge),
      },
    });
  });

  it('renders custom edge', () => {
    cy.get('.vue-flow__edge-custom').should('have.length', 1);

    cy.get('.test-custom-edge').should('have.length', 1);
  });
});

describe('EdgeProps surface (xyflow/react parity)', () => {
  it('passes the RF prop set — no sourceNode/targetNode, handles as ids, markers as url strings', () => {
    let captured: Record<string, any> = {};

    const RecordingEdge: EdgeComponent = (props) => {
      captured = { ...props };
      const path = getBezierPath(props);
      return h(BaseEdge as any, { path: path[0], class: 'test-custom-edge' });
    };

    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 300, y: 300 } },
      ],
      edges: [{ id: 'e1-2', source: '1', target: '2', type: 'custom', data: { foo: 'bar' }, markerEnd: 'arrow' }],
      edgeTypes: { custom: markRaw(RecordingEdge) },
    });

    cy.get('.test-custom-edge').should('exist');

    cy.then(() => {
      // the removed enrichment props must NOT be present (custom edges resolve nodes via useInternalNode)
      expect('sourceNode' in captured, 'sourceNode prop dropped').to.eq(false);
      expect('targetNode' in captured, 'targetNode prop dropped').to.eq(false);

      // the RF-shaped surface that IS passed
      expect(captured.id).to.eq('e1-2');
      expect(captured.source).to.eq('1');
      expect(captured.target).to.eq('2');
      expect(captured.data).to.deep.eq({ foo: 'bar' });
      expect(captured).to.have.property('sourceHandleId');
      expect(captured).to.have.property('targetHandleId');
      expect(captured).to.have.property('selectable');
      expect(captured).to.have.property('deletable');
      // a set marker is pre-resolved to a url() string; an absent one is `undefined` (xyflow/react parity —
      // RF passes undefined rather than a bogus `url('#')`)
      expect(captured.markerEnd).to.eq('url(\'#arrow\')');
      expect(captured.markerStart, 'absent marker → undefined').to.eq(undefined);
      // render-output positions are present
      expect(captured.sourceX).to.be.a('number');
      expect(captured.targetY).to.be.a('number');
    });
  });
});
