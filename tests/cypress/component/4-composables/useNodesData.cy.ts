import type { Node } from '@vue-flow/core'
import { useNodesData } from '@vue-flow/core'
import { defineComponent, h } from 'vue'
import { getElements } from '../../utils'

const { nodes } = getElements()

describe('Composable: `useNodesData`', () => {
  it('should return node data', () => {
    const node = nodes[0]

    const ComposableTester = defineComponent({
      emits: ['change'],
      setup(_, { emit }) {
        const data = useNodesData(node.id)

        emit('change', data.value)

        return ''
      },
    })

    const onChangeSpy = cy.spy().as('onChangeSpy')

    cy.vueFlow(
      {
        nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
      },
      {},
      {
        default: () =>
          h(ComposableTester, {
            onChange: onChangeSpy,
            nodes: node.id,
          }),
      },
    )

    cy.get('@onChangeSpy').should('have.been.calledWith', { id: node.id, type: node.type, data: node.data })
  })

  it('should return nodes data', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')

    const nodeIds = nodes.map((node) => node.id)

    const ComposableTester = defineComponent({
      emits: ['change'],
      setup(_, { emit }) {
        const data = useNodesData(nodeIds)

        emit('change', data.value)

        return ''
      },
    })

    cy.vueFlow(
      {
        nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
      },
      {},
      {
        default: () =>
          h(ComposableTester, {
            onChange: onChangeSpy,
            nodes: nodeIds,
          }),
      },
    )

    cy.get('@onChangeSpy').should(
      'have.been.calledWith',
      nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
      })),
    )
  })

  it('should return the node data with typeguard', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')

    const nodeIds = nodes.map((node) => node.id)

    const ComposableTester = defineComponent<{ guard?: (node: Node) => node is Node }>({
      emits: ['change'],
      setup(props, { emit }) {
        const data = useNodesData(nodeIds, props.guard || ((node): node is Node => true))

        emit('change', data.value)

        return ''
      },
    })

    cy.vueFlow(
      {
        nodes: nodes.map((node) => ({ ...node, type: 'custom' })),
      },
      {},
      {
        default: () =>
          h(ComposableTester, {
            onChange: onChangeSpy,
            nodes: nodeIds,
            guard: (node): node is Node<{ randomData: number }> => node.type === 'custom',
          }),
      },
    )

    cy.get('@onChangeSpy').should(
      'have.been.calledWith',
      nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
      })),
    )
  })
})
