import type { GraphEdge, GraphNode } from '@vue-flow/core'
import { isNode, useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `removeSelectedElements`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomNumber: number
  let randomNumber2: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  it('removes passed elements from selected elements in store', () => {
    randomNumber = Math.floor(Math.random() * [...nodes, ...edges].length)
    randomNumber2 = Math.floor(Math.random() * randomNumber)
    store.addSelectedElements(Array.from({ length: randomNumber }, (_, i) => store.getElements.value[i]))
    store.removeSelectedElements(
      Array.from({ length: randomNumber2 }, (_, i) => store.getElements.value[i]).reduce(
        (acc, curr) => {
          if (isNode(curr)) {
            acc.nodes.push(curr)
          } else {
            acc.edges.push(curr)
          }

          return acc
        },
        { nodes: [] as GraphNode[], edges: [] as GraphEdge[] },
      ),
    )

    cy.wait(1).then(() => {
      expect(store.getSelectedElements.value).to.have.length(randomNumber - randomNumber2)
    })
  })

  it('resets all selected elements in store when no argument is passed', () => {
    randomNumber = Math.floor(Math.random() * [...nodes, ...edges].length)
    store.addSelectedElements(Array.from({ length: randomNumber }, (_, i) => store.getElements.value[i]))
    store.removeSelectedElements()

    cy.wait(1).then(() => {
      expect(store.getSelectedElements.value).to.have.length(0)
    })
  })
})
