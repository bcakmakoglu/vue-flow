import { defineComponent, h, watch } from 'vue'
import { useNodesInitialized } from '@vue-flow/core'
import { getElements } from '../../utils'

const { nodes } = getElements()

const ComposableTester = defineComponent({
  emits: ['change'],
  setup(_, { emit }) {
    const nodesInitialized = useNodesInitialized()

    watch(
      nodesInitialized,
      (value) => {
        emit('change', value)
      },
      { immediate: true },
    )

    return 'Composable Tester'
  },
})

describe('Composable: `useNodesInitialized`', () => {
  it('should return that nodes are initialized', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')

    cy.vueFlow(
      {
        nodes,
      },
      {},
      {
        default: () => h(ComposableTester, { onChange: onChangeSpy }),
      },
    )

    cy.get('@onChangeSpy').should('have.been.calledWith', true)
  })

  it('should return that nodes are not initialized', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')

    cy.vueFlow(
      {
        nodes: [],
      },
      {},
      {
        default: () => h(ComposableTester, { onChange: onChangeSpy }),
      },
    )

    cy.get('@onChangeSpy').should('have.been.calledWith', false)
  })
})
