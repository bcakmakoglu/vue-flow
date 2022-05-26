---
pageClass: examples

---

# Hidden

You can toggle the visibility of nodes by simply setting their `hidden` attribute to either `true` or `false`.

Edges that are connected to a hidden node will also be hidden.

If you set the `onlyRenderVisibleElements` prop to `true`, hidden elements will not be rendered at all instead of just hiding them with
css. This behavior is disabled by default, meaning all elements are rendered whether they are hidden or not.

<div class="mt-6">
  <client-only>
    <Suspense>
      <Repl example="hidden"></Repl>
    </Suspense>
  </client-only>
</div>
