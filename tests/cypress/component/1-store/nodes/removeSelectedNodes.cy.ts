import type { VueFlowStore } from '@vue-flow/core';
import { isNode } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `removeSelectedNodes`', () => {
  let store: VueFlowStore;
  let randomNumber: number;
  let randomNumber2: number;

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    });

    cy.then(() => {
      store = getStore();
      randomNumber = Math.floor(Math.random() * nodes.length);
      randomNumber2 = Math.floor(Math.random() * randomNumber);
      store.addSelectedNodes(Array.from({ length: randomNumber }, (_, i) => store.nodes.value[i]));
      store.removeSelectedNodes(Array.from({ length: randomNumber2 }, (_, i) => store.nodes.value[i]));
    });
  });

  it('removes selected nodes from store', () => {
    expect(store.getSelectedNodes.value).to.have.length(randomNumber - randomNumber2);
  });

  it('removes `selected` class from nodes', () => {
    // todo: can we avoid the timeout? without it, the test fails in ci
    setTimeout(() => {
      cy.get('.vue-flow__node').then((els) => {
        els.each((index, node) => {
          const nodeId = node.getAttribute('data-id');
          const storedNode = store.getNode(nodeId!);

          expect(storedNode && isNode(storedNode)).to.eq(true);

          if (index >= randomNumber2 && index < randomNumber) {
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

// xyflow/react #5682: unselecting must only touch nodes that are actually selected, so an unselect
// (e.g. drag start with `selectNodesOnDrag: false`) doesn't re-commit/re-render every node.
describe('Store Action: `removeSelectedNodes` skips unselected nodes', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({ nodes, edges });
    cy.then(() => {
      store = getStore();
    });
  });

  it('fires no node changes when nothing is selected', () => {
    cy.then(() => {
      let changeCalls = 0;
      store.onNodesChange(() => changeCalls++);

      store.removeSelectedNodes();

      expect(changeCalls, 'no nodesChange fired when nothing is selected').to.eq(0);
    });
  });

  it('emits a deselect change only for the selected node', () => {
    cy.then(() => {
      store.addSelectedNodes([store.nodes.value[0]]);

      // register the spy after selecting, so it only captures the `removeSelectedNodes` emission
      let captured: { id: string; selected?: boolean }[] = [];
      store.onNodesChange((changes) => {
        captured = changes as typeof captured;
      });

      store.removeSelectedNodes();

      expect(captured, 'one deselect change for the selected node only').to.have.length(1);
      expect(captured[0].id).to.eq(store.nodes.value[0].id);
      expect(captured[0].selected).to.eq(false);
    });
  });
});
