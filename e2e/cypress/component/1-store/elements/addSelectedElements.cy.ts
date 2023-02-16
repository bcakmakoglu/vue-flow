import { useVueFlow } from '@vue-flow/core'
import { getElements } from '../../../utils'

const { nodes, edges } = getElements()

describe('Store Action: `addSelectedElements`', () => {
  const store = useVueFlow({ id: 'test' })
  let randomNumber: number

  beforeEach(() => {
    cy.vueFlow({
      nodes,
      edges,
    })
  })

  beforeEach(() => {
    randomNumber = Math.floor(Math.random() * [...nodes, ...edges].length)
    store.addSelectedElements(Array.from({ length: randomNumber }, (_, i) => store.getElements.value[i]))
  })

  it('adds selected elements to store', () => {
    expect(store.getSelectedElements.value).to.have.length(randomNumber)
  })
})
