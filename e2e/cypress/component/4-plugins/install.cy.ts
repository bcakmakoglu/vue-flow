import type { Plugin } from '@vue-flow/core'
import { createVueFlow, useVueFlow } from '@vue-flow/core'

import { getElements } from '../../utils'

const { nodes, edges } = getElements()

const testPlugin: Plugin = (hooks) => {
  hooks.created((store) => {
    store.testProp = 'test'
    store.testAction = () => true
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
    expect(store.testProp).to.equal('test')
  })

  it('has test action', () => {
    expect(store.testAction()).to.equal(true)
  })
})
