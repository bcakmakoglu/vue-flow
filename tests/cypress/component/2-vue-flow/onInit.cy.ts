// Coverage for the `@init` event timing: it must fire once, after the viewport is initialized, with a
// usable flow instance. Guards the `useOnInitHandler` emit (which uses `watch(..., { flush: 'post' })`).
describe('VueFlow `@init` event', () => {
  it('emits init once, after the viewport is ready, with the instance', () => {
    const onInit = cy.spy().as('onInit');

    cy.vueFlow(
      {
        fitView: false,
        nodes: [{ id: '1', position: { x: 0, y: 0 }, data: { label: 'n1' } }],
      },
      { onInit },
    );

    cy.get('@onInit').should('have.been.calledOnce');
    cy.get('@onInit').then((spy: any) => {
      const instance = spy.args[0][0];
      expect(instance, 'init receives the flow instance').to.exist;
      expect(typeof instance.fitView, 'instance is usable').to.eq('function');
      // the viewport must be set up by the time init fires (the whole point of deferring the emit)
      expect(instance.viewportInitialized.value, 'viewport initialized at init time').to.eq(true);
      expect(instance.viewport.value.zoom, 'viewport transform applied').to.be.a('number');
    });
  });
});
