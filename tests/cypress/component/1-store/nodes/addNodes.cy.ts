import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes } = getElements();

const initialNodes = [{ id: '1e3', position: { x: 0, y: 0 }, data: { label: 'Node 1e3' } }];

describe('Store Action: `addNodes`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({
      nodes: initialNodes,
    });

    cy.then(() => {
      store = getStore();
      store.addNodes(nodes);
    });
  });

  it('adds nodes to store', () => {
    expect(store.nodes.value).to.have.length(nodes.length + initialNodes.length);
  });

  it('adds nodes to view', () => {
    cy.get('.vue-flow__node').should('have.length', nodes.length + initialNodes.length);
  });

  it('adds nodes to DOM', () => {
    cy.get('.vue-flow__node').then((els) => {
      els.each((index, node) => {
        const nodeId = node.getAttribute('data-id');
        const storedNode = store.getNode(nodeId);

        expect(storedNode).to.not.eq(undefined);
        expect(storedNode?.id).to.eq(nodeId);
      });
    });
  });

  it('does not add invalid nodes', () => {
    // @ts-expect-error invalid nodes
    store.addNodes([null, undefined, '', 0, false, true, {}, []]);
    expect(store.nodes.value).to.have.length(nodes.length + initialNodes.length);
  });
});
