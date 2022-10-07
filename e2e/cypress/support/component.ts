// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import necessary styles
import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import { VueFlow } from '@braks/vue-flow'
import type { FlowProps } from '@braks/vue-flow'

const mountVueFlow = (props?: FlowProps, attrs?: Record<string, any>) => {
  cy.mount(VueFlow, {
    props: {
      id: 'test',
      fitViewOnInit: true,
      ...props,
    },
    attrs: {
      key: 'flowy',
      style: {
        height: '100vh',
        width: '100vw',
      },
      ...attrs,
    },
  })
}

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      vueFlow: typeof mountVueFlow
    }
  }
}

Cypress.Commands.add('mount', mount)

Cypress.Commands.add('vueFlow', mountVueFlow)

// Example use:
// cy.mount(MyComponent)
