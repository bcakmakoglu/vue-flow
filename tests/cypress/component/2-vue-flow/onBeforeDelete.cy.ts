import { getStore } from '../../support/component';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: '2' } },
];
const edges = [{ id: 'e1-2', source: '1', target: '2' }];

describe('onBeforeDelete + deleteElements (#1630)', () => {
  it('deleteElements removes a node + its connected edges and returns the deleted set', () => {
    cy.vueFlow({ fitView: false, nodes, edges });
    cy.then(() => {
      const store = getStore();
      return (store.deleteElements({ nodes: [{ id: '1' }] }) as Promise<any>).then((result: any) => {
        expect(result.deletedNodes.map((n: any) => n.id)).to.deep.eq(['1']);
        expect(result.deletedEdges.map((e: any) => e.id)).to.deep.eq(['e1-2']);
        expect(store.nodes.value.map((n: any) => n.id)).to.deep.eq(['2']);
        expect(store.edges.value).to.have.length(0);
      });
    });
  });

  it('onBeforeDelete returning false cancels the deletion', () => {
    const guard = cy.stub().resolves(false).as('guard');
    cy.vueFlow({ fitView: false, nodes, edges, onBeforeDelete: guard } as any);
    cy.then(() => {
      const store = getStore();
      return (store.deleteElements({ nodes: [{ id: '1' }] }) as Promise<any>).then((result: any) => {
        expect(result.deletedNodes).to.have.length(0);
        expect(store.nodes.value).to.have.length(2);
        expect(store.edges.value).to.have.length(1);
      });
    });
    cy.get('@guard').should('have.been.calledOnce');
  });

  it('onBeforeDelete can return a subset (delete the node, keep its edge)', () => {
    const guard = ({ nodes: n }: any) => Promise.resolve({ nodes: n, edges: [] });
    cy.vueFlow({ fitView: false, nodes, edges, onBeforeDelete: guard } as any);
    cy.then(() => {
      const store = getStore();
      return (store.deleteElements({ nodes: [{ id: '1' }] }) as Promise<any>).then(() => {
        expect(store.nodes.value.map((n: any) => n.id)).to.deep.eq(['2']);
        expect(store.edges.value, 'edge kept by the subset').to.have.length(1);
      });
    });
  });

  it('the delete key routes through onBeforeDelete', () => {
    const guard = cy.stub().resolves(false).as('guard');
    cy.vueFlow({
      fitView: false,
      nodes: [{ ...nodes[0], selected: true }, nodes[1]],
      edges,
      onBeforeDelete: guard,
    } as any);
    cy.window().then((win) => {
      win.document.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'Backspace', code: 'Backspace', bubbles: true }));
    });
    cy.get('@guard').should('have.been.calledOnce');
    cy.then(() => {
      expect(getStore().nodes.value, 'nothing deleted while the guard says no').to.have.length(2);
    });
  });
});
