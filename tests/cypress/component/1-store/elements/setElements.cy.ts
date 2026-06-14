import type { VueFlowStore } from '@vue-flow/core';
import { defaultEdgeTypes, defaultNodeTypes, isEdge, isNode } from '@vue-flow/core';
import { getStore } from '../../../support/component';
import { getElements } from '../../../utils';

const { nodes, edges } = getElements();

describe('Store Action: `setNodes` / `setEdges`', () => {
  let store: VueFlowStore;

  beforeEach(() => {
    cy.vueFlow({});

    cy.then(() => {
      store = getStore();
      store.setNodes(nodes);
      store.setEdges(edges);
    });
  });

  it('sets elements', () => {
    expect(store.nodes.value).to.have.length(nodes.length);
    expect(store.edges.value).to.have.length(edges.length);
  });

  it('parses elements to flow-elements', () => {
    store.getEdges.value.forEach(edge => expect(isEdge(edge)).to.be.true);
    store.getNodes.value.forEach(node => expect(isNode(node)).to.be.true);
  });

  it('has correct element ids', () => {
    const nodeIds = nodes.map(node => node.id);
    const edgeIds = edges.map(edge => edge.id);

    store.nodes.value.forEach(el => expect(nodeIds).to.include(el.id));
    store.edges.value.forEach(el => expect(edgeIds).to.include(el.id));
  });

  it('has correct element types', () => {
    const nodeTypes = nodes.reduce((types, node) => {
      if (node.type && !types.includes(node.type)) {
        types.push(node.type);
      }
      return types;
    }, Object.keys(defaultNodeTypes));

    store.nodes.value.forEach(el => expect(nodeTypes).to.include(el.type));

    const edgeTypes = edges.reduce((types, edge) => {
      if (edge.type && !types.includes(edge.type)) {
        types.push(edge.type);
      }
      return types;
    }, Object.keys(defaultEdgeTypes));

    store.edges.value.forEach(el => expect(edgeTypes).to.include(el.type ?? 'default'));
  });

  describe('test node properties', () => {
    it('has correct label', () => {
      store.getNodes.value.forEach((el) => {
        const node = nodes.find(node => node.id === el.id);
        expect(el.data?.label).to.eq(node?.data?.label);
      });
    });

    it('has correct position', () => {
      store.getNodes.value.forEach((el) => {
        const node = nodes.find(node => node.id === el.id);
        expect(JSON.stringify(el.position)).to.eq(JSON.stringify(node?.position || {}));
      });
    });

    it('has correct random data', () => {
      store.getNodes.value.forEach((el) => {
        const node = nodes.find(node => node.id === el.id);
        expect(el.data.randomData).to.eq(node?.data.randomData);
      });
    });
  });

  describe('test edge properties', () => {
    it('has correct target and source', () => {
      store.getEdges.value.forEach((el) => {
        const edge = edges.find(edge => edge.id === el.id);

        expect(el.source).to.eq(edge?.source);
        expect(el.target).to.eq(edge?.target);
      });
    });

    it('resolves source-node and target-node for every edge', () => {
      // edges no longer carry sourceNode/targetNode (xyflow parity) — nodes resolve via the lookup
      store.getEdges.value.forEach((el) => {
        expect(store.getInternalNode(el.source)?.id).to.eq(el.source);
        expect(store.getInternalNode(el.target)?.id).to.eq(el.target);
      });
    });

    it('has correct random data', () => {
      store.getEdges.value.forEach((el) => {
        const edge = edges.find(edge => edge.id === el.id);
        expect(el.data.randomData).to.eq(edge?.data.randomData);
      });
    });

    it('is animated', () => {
      store.getEdges.value.forEach((el) => {
        const edge = edges.find(edge => edge.id === el.id);

        expect(el.animated).to.eq(edge?.animated);
      });
    });
  });
});
