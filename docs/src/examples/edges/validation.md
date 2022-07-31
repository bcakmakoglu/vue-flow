---
layout: page

---

# Connection Validation

Connections can be validated before edges are created and nodes get connected. 

## Using a handle in a custom node
```vue
<div>
  [ ... ]

  <Handle type="source" :is-valid-connection="isValidConnection" />
</div>
```

## Passing as node option
```ts
const nodes = [
  {
    id: '1',
    label: 'Node 1',
    position: { x: 0, y: 0 },
    isValidSourcePos: (connection) => {
      return connection.target === '2'
    },
  },
]
```

<div class="mt-6">
  <ClientOnly>
    <Suspense>
      <Repl example="validation"></Repl>
    </Suspense>
  </ClientOnly>
</div>
