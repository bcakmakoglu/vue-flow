---
layout: page

---

# Drag & Drop

Adding nodes to an already existing graph can be done multiple ways. To create an interactive editor, you would probably
like them to be inserted with drag and drop.

In this example we demonstrate how to build a basic Sidebar and implement drag and drop handlers to create new nodes.

## State access

This example shows another key feature of Vue Flow. You can initialize the Flow state at any point before the `VueFlow` component
is actually mounted. This can be achieved by using the [`useVueFlow`](/guide/composables.html#usevueflow) composable.

<div class="mt-6">
  <ClientOnly>
    <Suspense>
      <Repl example="dnd"></Repl>
    </Suspense>
  </ClientOnly>
</div>
