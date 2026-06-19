import type { VueFlowStore } from '@vue-flow/core';
import { NodeResizer } from '@vue-flow/core';
import { h } from 'vue';
import { getStore } from '../../support/component';

// xyflow/react #5326: NodeResizer handle controls scale up by `Math.max(1 / zoom, 1)` when zooming out, so
// they never render smaller than their base size. The new `autoScale` prop (default true) opts out. The
// handle is centered with the `translate` CSS property (not `transform`) so the centering composes with the
// inline `scale` and the handle stays pinned to the node corner at any zoom.
describe('NodeResizer handle autoScale (#5326)', () => {
  let store: VueFlowStore;

  function mount(autoScale?: boolean) {
    cy.vueFlow(
      {
        fitView: false,
        nodes: [{ id: '1', type: 'custom', position: { x: 100, y: 100 }, width: 80, height: 60, data: {} }],
      },
      undefined,
      {
        'node-custom': () => h('div', { style: { width: '80px', height: '60px' } }, [
          h(NodeResizer, autoScale === undefined ? {} : { autoScale }),
        ]),
      },
    );
    cy.then(() => {
      store = getStore();
      store.setViewport({ x: 0, y: 0, zoom: 0.5 });
    });
  }

  it('scales the handle up when zoomed out (autoScale default)', () => {
    mount();

    cy.tryAssertion(() => {
      const handle = Cypress.$('.vue-flow__resize-control.handle.bottom.right')[0];
      // zoom 0.5 → Math.max(1 / 0.5, 1) = 2
      expect(getComputedStyle(handle).scale, 'handle scales by 1/zoom').to.eq('2');
    });
  });

  it('does not scale the handle when autoScale is false', () => {
    mount(false);

    cy.tryAssertion(() => {
      const handle = Cypress.$('.vue-flow__resize-control.handle.bottom.right')[0];
      expect(getComputedStyle(handle).scale, 'no scale applied').to.eq('none');
    });
  });

  it('keeps the scaled handle centered on the node corner', () => {
    mount();

    cy.tryAssertion(() => {
      const node = Cypress.$('.vue-flow__node')[0].getBoundingClientRect();
      const handle = Cypress.$('.vue-flow__resize-control.handle.bottom.right')[0].getBoundingClientRect();

      const handleCenterX = handle.left + handle.width / 2;
      const handleCenterY = handle.top + handle.height / 2;

      // the bottom-right handle's center sits on the node's bottom-right corner, even with scale active
      expect(Math.abs(handleCenterX - node.right), 'handle x centered on corner').to.be.lessThan(1.5);
      expect(Math.abs(handleCenterY - node.bottom), 'handle y centered on corner').to.be.lessThan(1.5);
    });
  });
});
