# Updatable Edge

Existing edges can be updated, meaning their source / target position can be changed interactively.

Update an edge by simply dragging it from one node to another at the edge-anchor (handles).

You can enable reconnecting edges either globally by passing the `edgesReconnectable` prop or you can enable it
for specific edges by using the `reconnectable` attribute.


<div class="mt-6">
  <ClientOnly>
    <Suspense>
      <Repl example="reconnectEdge"></Repl>
    </Suspense>
  </ClientOnly>
</div>
