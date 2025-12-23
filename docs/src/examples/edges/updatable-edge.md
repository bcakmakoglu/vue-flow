# Updatable Edge

Existing edges can be updated, meaning their source / target position can be changed interactively.

Update an edge by simply dragging it from one node to another at the edge-anchor (handles).

You can enable updating edges either globally by passing the `edgesUpdatable` prop or you can enable it
for specific edges by using the `updatable` attribute.

Specify the `connectionEdgeType` prop on handles to define which edge type to use when creating connections from that Handle.
<div class="mt-6">
  <ClientOnly>
    <Suspense>
      <Repl example="updateEdge"></Repl>
    </Suspense>
  </ClientOnly>
</div>
