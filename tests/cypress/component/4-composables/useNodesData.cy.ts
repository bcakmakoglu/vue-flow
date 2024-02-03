import type { Node } from '@vue-flow/core'
import { useNodesData } from '@vue-flow/core'
import { defineComponent, h } from 'vue'
import { getElements } from '../../utils'

const { nodes } = getElements()

describe('Composable: `useNodesData`', () => {
  describe('returns node data for a single node', () => {
    let data: any = null

    const node = nodes[0]

    beforeEach(() => {
      cy.vueFlow(
        {
          nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
        },
        {},
        {
          'node-custom': defineComponent({
            setup() {
              data = useNodesData(nodes[0].id)

              return () => h('div', 'Custom Node')
            },
          }),
        },
      )
    })

    it('should return the node data', () => {
      expect(data.value).to.deep.equal(node.data)
    })
  })

  describe('returns node data for multiple nodes', () => {
    let data: any = null

    const nodeIds = nodes.map((node) => node.id)

    beforeEach(() => {
      cy.vueFlow(
        {
          nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
        },
        {},
        {
          'node-custom': defineComponent({
            setup() {
              data = useNodesData(nodeIds)

              return () => h('div', 'Custom Node')
            },
          }),
        },
      )
    })

    it('should return the node data', () => {
      expect(data.value).to.deep.equal(nodes.map((node) => node.data))
    })
  })

  describe('returns node data for multiple nodes with a guard', () => {
    let data: any = null

    const nodeIds = nodes.map((node) => node.id)

    beforeEach(() => {
      cy.vueFlow(
        {
          nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
        },
        {},
        {
          'node-custom': defineComponent({
            setup() {
              data = useNodesData(nodeIds, (node): node is Node<{ randomData: number }> => node.type === 'custom')

              return () => h('div', 'Custom Node')
            },
          }),
        },
      )
    })

    it('should return the node data', () => {
      expect(data.value).to.deep.equal(nodes.map((node) => node.data))
    })
  })
})
