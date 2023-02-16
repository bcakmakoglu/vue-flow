# Update Node

Updating internal node data is simple.
After initializing your elements and parsing them into either `GraphNode` or `GraphEdge`
Vue Flow will emit the changes back into your initial `ref`.

That means you can manipulate any property of your original nodes, and it will trigger changes in the graph.

You can of course also access the nodes directly from the state and change their properties from there.

<div class="mt-6">
  <Repl example="updateNode"></Repl> 
</div>
