---
layout: page

---

# Hidden

You can toggle the visibility of nodes by simply setting their `hidden` attribute to either `true` or `false`.

Edges that are connected to a hidden node will also be hidden.

If you set the `onlyRenderVisibleElements` prop to `true`, only elements that are visible inside the current viewpane will be rendered. 
This behavior is disabled by default, meaning all elements are rendered whether they are inside the view or not.

This can save you some time on initial renders but consider that moving the pane can cause multiple renders of nodes into the dom,
which can cause performance spikes depending on the complexity of the components that have to be mounted.

<div class="mt-6">
  <client-only>
    <Suspense>
      <Repl example="hidden"></Repl>
    </Suspense>
  </client-only>
</div>
