import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `getNode`', () => {
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
    randomIndex = Math.floor(Math.random() * nodes.length);
  });

  it('finds node in store', () => {
    const storedNode = store.getNode(nodes[randomIndex].id);

    if (!storedNode) {
      throw new Error('Node not found in store');
    }

    expect(storedNode.id).to.equal(nodes[randomIndex].id);
  });

  it('does not find node in store when passed invalid id', () => {
    expect(store.getNode('some-invalid-id')).to.equal(undefined);
  });

  it('does not find node in store when passed undefined', () => {
    expect(store.getNode(undefined)).to.equal(undefined);
  });

  it('does not find node in store when passed empty string', () => {
    expect(store.getNode('')).to.equal(undefined);
  });

  it('does not find node in store when passed number', () => {
    expect(store.getNode(123 as any)).to.equal(undefined);
  });
});
