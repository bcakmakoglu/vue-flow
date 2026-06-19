import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// xyflow/react #5276: viewport-altering functions accept `ease` + `interpolate` options (alongside
// `duration`). The transition curve lives in `@xyflow/system`; this guards that vue-flow forwards the
// options through to it and the viewport still settles at the requested target.
describe('viewport ease + interpolate options (#5276)', () => {
  let store: VueFlowStore;

  function mount() {
    cy.vueFlow({
      fitView: false,
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, width: 40, height: 40, data: {} },
        { id: '2', position: { x: 300, y: 200 }, width: 40, height: 40, data: {} },
      ],
    });
    cy.then(() => {
      store = getStore();
    });
  }

  it('setViewport with ease + interpolate settles at the target', () => {
    mount();

    cy.then(() => store.setViewport({ x: 120, y: 80, zoom: 1.5 }, { duration: 60, ease: t => t, interpolate: 'linear' }));

    cy.tryAssertion(() => {
      expect(store.viewport.value).to.deep.eq({ x: 120, y: 80, zoom: 1.5 });
    });
  });

  it('fitView accepts ease + interpolate', () => {
    mount();

    cy.then(async () => {
      const ok = await store.fitView({ duration: 0, ease: t => t, interpolate: 'linear' });
      expect(ok, 'fitView resolved true with ease + interpolate').to.eq(true);
    });
  });

  it('zoomTo accepts ease + interpolate', () => {
    mount();

    cy.then(() => store.zoomTo(2, { duration: 60, ease: t => t, interpolate: 'linear' }));

    cy.tryAssertion(() => {
      expect(store.viewport.value.zoom).to.eq(2);
    });
  });
});
