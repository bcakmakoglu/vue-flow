---
pageClass: examples

---

# Nested Nodes

Another key feature is nested nodes (or even nested flows).

You can define parents of a node, which are then nested inside that node. 
You can also define the boundaries of a node, i.e. if the node can be dragged outside it's parent or if it's contained to the parent 
or even let Vue Flow extend the area of a node to fit all it's children.

<div class="mt-6">
  <client-only>
    <Suspense>
      <Repl example="nested"></Repl>
    </Suspense>
  </client-only>
</div>
