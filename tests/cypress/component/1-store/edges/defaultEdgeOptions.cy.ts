import type { DefaultEdgeOptions, Edge, EdgeComponent, VueFlowStore } from '@vue-flow/core'
import { BaseEdge, MarkerType, getBezierPath } from '@vue-flow/core'
import { h, markRaw } from 'vue'
import { getStore } from '../../../support/component'

// minimal edge components so the wrapper applies a `vue-flow__edge-<type>` class we can assert per edge
const TypeA: EdgeComponent = (props) => h(BaseEdge as any, { path: getBezierPath(props)[0] })
const TypeB: EdgeComponent = (props) => h(BaseEdge as any, { path: getBezierPath(props)[0] })

const baseNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 300, y: 300 } },
]

describe('Default Edge Options', () => {
  let store: VueFlowStore

  const defaultEdgeOptions: DefaultEdgeOptions = {
    class: 'custom-class',
    type: 'typeA',
  }

  beforeEach(() => {
    cy.vueFlow({
      fitViewOnInit: false,
      nodes: baseNodes,
      edges: [
        // no own type/class → should render with the DEFAULT type and pick up the default class
        { id: 'inherits', source: '1', target: '2' },
        // own type → its own value must WIN over the default
        { id: 'owns', source: '2', target: '1', type: 'typeB' },
      ],
      edgeTypes: { typeA: markRaw(TypeA), typeB: markRaw(TypeB) },
      defaultEdgeOptions,
    })

    cy.then(() => {
      store = getStore()
    })
  })

  it('applies default edge options at render without stamping stored edges', () => {
    // stored edges stay the user's objects verbatim (xyflow parity) — defaults merge only at render time
    store.edges.value.forEach((edge) => {
      expect(edge.class).to.be.undefined
    })

    cy.get('[data-id="inherits"]').should('have.class', defaultEdgeOptions.class)
  })

  it('render-merge precedence: the edge own value wins over the default type', () => {
    // the typeless edge renders as the default type; the typed edge keeps its own type
    cy.get('[data-id="inherits"]').should('have.class', 'vue-flow__edge-typeA')
    cy.get('[data-id="owns"]').should('have.class', 'vue-flow__edge-typeB').and('not.have.class', 'vue-flow__edge-typeA')

    // ...and the store still holds the user's verbatim types (undefined / 'typeB')
    expect(store.findEdge('inherits')?.type).to.be.undefined
    expect(store.findEdge('owns')?.type).to.equal('typeB')
  })

  it('class/style callbacks receive the RAW stored edge, not the merged render view', () => {
    let captured: Edge | undefined

    cy.vueFlow({
      fitViewOnInit: false,
      nodes: baseNodes,
      edges: [{ id: 'cb', source: '1', target: '2' }],
      // a function-form default class — must be invoked with the raw stored edge
      defaultEdgeOptions: {
        class: (edge: Edge) => {
          captured = edge
          return 'from-default-cb'
        },
      } as DefaultEdgeOptions,
    })

    cy.get('[data-id="cb"]').should('have.class', 'from-default-cb')

    cy.then(() => {
      const stored = getStore().findEdge('cb')
      // identity: the callback arg is the exact stored edge (=== the array element), not a merged copy
      expect(captured).to.equal(stored)
      // and therefore carries none of the render-merge fields
      expect((captured as any).class).to.not.be.a('function')
    })
  })

  it('resolves markers through defaultEdgeOptions at render', () => {
    cy.vueFlow({
      fitViewOnInit: false,
      nodes: baseNodes,
      edges: [{ id: 'marked', source: '1', target: '2' }],
      defaultEdgeOptions: { markerEnd: MarkerType.ArrowClosed } as DefaultEdgeOptions,
    })

    // a marker def is emitted and the edge path references it, even though the edge sets no marker itself
    cy.get('.vue-flow__edge-default marker, marker').should('have.length.greaterThan', 0)
    cy.get('[data-id="marked"] .vue-flow__edge-path').should('have.attr', 'marker-end').and('match', /url\(['"]?#/)
  })
})
