import { watchEffect } from 'vue'
import type { VueFlowStore } from '@vue-flow/core'
import { getStore } from '../support/component'

/**
 * Regression: adoption used to run `@xyflow/system`'s `adoptUserNodes` directly on the `reactive(Map)`
 * lookups, whose clear+refill invalidated EVERY lookup subscriber on every commit (= every drag frame).
 * Adoption now runs against plain system maps and is mirrored with targeted `.set`/`.delete`, so a
 * change to one node must not re-trigger effects tracking other nodes' lookup keys.
 */
describe('lookup sync is O(changed)', () => {
  let store: VueFlowStore

  beforeEach(() => {
    cy.vueFlow({
      nodes: [
        { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: '2', type: 'default', position: { x: 200, y: 0 }, data: { label: 'Node 2' } },
        { id: '3', type: 'default', position: { x: 400, y: 0 }, data: { label: 'Node 3' } },
      ],
    })

    cy.then(() => {
      store = getStore()
    })
  })

  it('does not invalidate unrelated lookup keys on a position change', () => {
    let changedRuns = 0
    let unrelatedRuns = 0

    // watchEffect re-runs on every trigger of its deps, with no value-equality gate — exactly what a
    // render effect tracking a raw `nodeLookup.get` does
    watchEffect(
      () => {
        store.nodeLookup.get('1')
        changedRuns++
      },
      { flush: 'sync' },
    )

    watchEffect(
      () => {
        store.nodeLookup.get('2')
        unrelatedRuns++
      },
      { flush: 'sync' },
    )

    expect(changedRuns).to.equal(1)
    expect(unrelatedRuns).to.equal(1)

    store.applyNodeChanges([{ id: '1', type: 'position', position: { x: 50, y: 50 } }])

    // the moved node's entry was replaced (new InternalNode) — its key must trigger
    expect(changedRuns, 'effect tracking the moved node').to.be.greaterThan(1)
    // the untouched node's InternalNode is reused by reference — its key must NOT trigger
    expect(unrelatedRuns, 'effect tracking an untouched node').to.equal(1)
  })

  it('edge changes do not invalidate unrelated edge lookup keys', () => {
    cy.then(() => {
      store.addEdges([
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ])
    })

    cy.then(() => {
      let changedRuns = 0
      let unrelatedRuns = 0

      watchEffect(
        () => {
          store.edgeLookup.get('e1-2')
          changedRuns++
        },
        { flush: 'sync' },
      )

      watchEffect(
        () => {
          store.edgeLookup.get('e2-3')
          unrelatedRuns++
        },
        { flush: 'sync' },
      )

      store.applyEdgeChanges([{ id: 'e1-2', type: 'select', selected: true }])

      expect(changedRuns, 'effect tracking the changed edge').to.be.greaterThan(1)
      expect(unrelatedRuns, 'effect tracking an untouched edge').to.equal(1)
    })
  })

  it('removals only touch the removed key', () => {
    let removedRuns = 0
    let unrelatedRuns = 0

    watchEffect(
      () => {
        store.nodeLookup.get('3')
        removedRuns++
      },
      { flush: 'sync' },
    )

    watchEffect(
      () => {
        store.nodeLookup.get('2')
        unrelatedRuns++
      },
      { flush: 'sync' },
    )

    store.removeNodes(['3'])

    cy.tryAssertion(() => {
      expect(store.getNode('3')).to.equal(undefined)
      expect(removedRuns, 'effect tracking the removed node').to.be.greaterThan(1)
      expect(unrelatedRuns, 'effect tracking an untouched node').to.equal(1)
    })
  })
})
