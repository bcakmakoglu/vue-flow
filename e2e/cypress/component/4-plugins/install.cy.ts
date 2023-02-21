import type { Plugin } from '@vue-flow/core'
import { createVueFlow, useVueFlow } from '@vue-flow/core'

import { getElements } from '../../utils'

const { nodes, edges } = getElements()

const testId = Math.random().toString(36).substr(2, 9)
const testNumber = Math.random()

function add(num: number) {
  return num + 1
}

const testPlugin: Plugin = (hooks) => {
  hooks.created(([_, extend]) => {
    extend({
      testId,
      testAction: add,
    })
  })
}

createVueFlow().use(testPlugin)

describe('Install test plugin', () => {
  const store = useVueFlow({ id: 'test' })

  beforeEach(() => {
    cy.vueFlow({
      modelValue: [...nodes, ...edges],
    })
  })

  it('has test prop', () => {
    expect(store.testId).to.equal(testId)
  })

  it('has test action', () => {
    expect(store.testAction(testNumber)).to.equal(add(testNumber))
  })
})
