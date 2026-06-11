import { isReactive } from 'vue'
import { getElements } from '../utils/elements'
import { getStore } from '../support/component'

// Regression guard for the markRaw node split (#40 S4): nodes are NOT deep-reactive. Reactivity for the UI
// comes from re-adopting (the lookup `.set` + the per-node render computed), never from deep-proxying — so
// large `data` objects stay raw. If this flips, the perf model has regressed.
describe('node reactivity (markRaw)', () => {
  it('user nodes, InternalNodes and their data are raw (not deep-proxied)', () => {
    cy.vueFlow({ nodes: getElements(5, 5).nodes, edges: [] })

    cy.then(() => {
      const store = getStore()
      const id = store.nodes.value[0].id

      // the array itself is reactive (membership), but its elements are raw
      expect(isReactive(store.nodes.value[0]), 'user node is raw').to.eq(false)
      expect(isReactive(store.getInternalNode(id)!), 'internal node is raw').to.eq(false)
      expect(isReactive(store.getInternalNode(id)!.data), 'node data is raw').to.eq(false)
    })
  })

  it('re-renders on store helpers despite markRaw (lookup .set reactivity)', () => {
    cy.vueFlow({ nodes: getElements(3, 3).nodes, edges: [] })

    cy.then(() => {
      const store = getStore()
      const id = store.nodes.value[0].id
      store.updateNodeData(id, { label: 'updated' })
    })

    // the change flows through re-adopt -> lookup .set -> per-node computed -> DOM
    cy.get('[data-id="1"]').should('contain.text', 'updated')
  })
})
