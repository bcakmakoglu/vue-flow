import { defineComponent, h, ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

// Regression for #1999: while a modifier (e.g. Shift) is held, vue-flow's pan/zoom/selection key
// detection must NOT `preventDefault` keystrokes that target a page input. `panActivationKeyCode`
// defaults to `Space` and `selectionKeyCode` to `Shift`, so Shift+Space used to be swallowed in inputs.
const App = defineComponent({
  setup() {
    const text = ref('')
    const nodes = ref<any[]>([{ id: '1', position: { x: 0, y: 0 }, data: { label: 'n1' } }])

    return () =>
      h('div', [
        h('input', {
          'data-testid': 'page-input',
          'value': text.value,
          'onInput': (e: any) => (text.value = e.target.value),
        }),
        h('div', { style: 'width: 300px; height: 300px' }, [
          h(VueFlow, { 'nodes': nodes.value, 'onUpdate:nodes': (v: any[]) => (nodes.value = v) }),
        ]),
      ])
  },
})

describe('Issue #1999: key press inside a page input', () => {
  it('does not swallow Space typed while Shift is held (pan key + selection modifier)', () => {
    cy.mount(App)

    cy.get('[data-testid=page-input]').focus().type('a{shift} b', { delay: 20 })

    // the input keeps every character it was given — the Shift+Space is not preventDefaulted away
    cy.get('[data-testid=page-input]').invoke('val').should('contain', ' ')
    cy.get('[data-testid=page-input]').invoke('val').should('have.length', 3)
  })
})
