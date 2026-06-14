import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

describe('colorMode', () => {
  let store: VueFlowStore;

  it('defaults to the `light` class', () => {
    cy.vueFlow();

    cy.get('.vue-flow').should('have.class', 'light').and('not.have.class', 'dark');
  });

  it('applies the `dark` class when `colorMode` is `dark`', () => {
    cy.vueFlow({ colorMode: 'dark' });

    cy.get('.vue-flow').should('have.class', 'dark').and('not.have.class', 'light');
  });

  it('reactively updates the class when `colorMode` changes', () => {
    cy.vueFlow({ colorMode: 'light' });

    cy.then(() => {
      store = getStore();
    });

    cy.get('.vue-flow').should('have.class', 'light');

    cy.then(() => {
      store.setState({ colorMode: 'dark' });
    });

    cy.get('.vue-flow').should('have.class', 'dark').and('not.have.class', 'light');
  });

  it('resolves `system` to `light`/`dark` via `prefers-color-scheme`', () => {
    cy.vueFlow({ colorMode: 'system' });

    cy.get('.vue-flow').should(($el) => {
      const resolved = $el.hasClass('dark') ? 'dark' : $el.hasClass('light') ? 'light' : null;
      expect(resolved, 'resolves to a concrete color-mode class').to.be.oneOf(['light', 'dark']);
    });
  });
});
