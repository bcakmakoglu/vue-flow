import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `getEdge`', () => {
  let store: VueFlowStore;
  let randomIndex: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
    });
  });

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * edges.length);
  });

  it('finds edge in store when passed a valid (string) and existing id', () => {
    const storedEdge = store.getEdge(edges[randomIndex].id);

    if (!storedEdge) {
      throw new Error('Edge not found in store');
    }

    expect(storedEdge.id).to.equal(edges[randomIndex].id);
  });

  it('does not find edge in store when passed invalid id', () => {
    expect(store.getEdge('some-invalid-id')).to.equal(undefined);
  });

  it('does not find edge in store when passed undefined', () => {
    expect(store.getEdge(undefined)).to.equal(undefined);
  });

  it('does not find edge in store when passed empty string', () => {
    expect(store.getEdge('')).to.equal(undefined);
  });

  it('does not find edge in store when passed number', () => {
    expect(store.getEdge(123 as any)).to.equal(undefined);
  });
});
