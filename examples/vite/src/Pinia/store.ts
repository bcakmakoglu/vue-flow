import { defineStore } from 'pinia'
import { isNode } from '@vue-flow/core'

const useStore = defineStore('elementsStore', {
  state() {
    return {
      foo: ['bar', 'baz'],
      elements: [
        {
          id: '1',
          type: 'input',
          label: 'Node 1',
          position: { x: 250, y: 5 },
          class: 'light',
        },
        {
          id: '2',
          label: 'Node 2',
          position: { x: 100, y: 100 },
          class: 'light',
        },
        {
          id: '3',
          label: 'Node 3',
          position: { x: 400, y: 100 },
          class: 'light',
        },
        {
          id: '4',
          label: 'Node 4',
          position: { x: 400, y: 200 },
          class: 'light',
        },
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
      ],
    }
  },
  actions: {
    reset() {
      this.elements = []
    },
    log() {
      console.log('stored elements', this.elements)
    },
    toggleClass() {
      this.elements.forEach((el) => (el.class = el.class === 'light' ? 'dark' : 'light'))
    },
    updatePosition() {
      this.elements.forEach((el) => {
        if (isNode(el)) {
          el.position = {
            x: Math.random() * 400,
            y: Math.random() * 400,
          }
        }
      })
    },
  },
})

export default useStore
