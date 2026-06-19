import type { VueFlowStore } from '@vue-flow/core';
import { isNode } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `addSelectedNodes`', () => {
  let store: VueFlowStore;
  let randomNumber: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
      randomNumber = Math.floor(Math.random() * nodes.length);
      store.addSelectedNodes(Array.from({ length: randomNumber }, (_, i) => store.nodes.value[i]));
    });
  });

  it('adds selected nodes to store', () => {
    expect(store.getSelectedNodes.value).to.have.length(randomNumber);
  });

  it('adds `selected` class to nodes', () => {
    // todo: can we avoid the timeout? without it, the test fails in ci
    setTimeout(() => {
      cy.get('.vue-flow__node').then((els) => {
        els.each((index, node) => {
          const nodeId = node.getAttribute('data-id');
          const storedNode = store.getNode(nodeId!);

          expect(storedNode && isNode(storedNode)).to.eq(true);

          if (index < randomNumber) {
            expect(!!storedNode?.selected).to.eq(true);
            expect(node).to.have.class('selected');
          }
          else {
            expect(!!storedNode?.selected).to.eq(false);
            expect(node).to.not.have.class('selected');
          }
        });
      });
    }, 1);
  });
});
