---
layout: page

---

# Save & Restore

There is no built-in persistent storage feature, however you can use your own storage implementation.

::: tip State Management Libraries
  Check the [pinia](/examples/pinia.html) example to see how to use Vue Flow with a state management library.
:::

This example demonstrates save & restore functionality using the [`LocalStorage`](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage) of the browser.

You can extend on this basic idea however you like, i.e. fetch data that you transform into elements which are then passed to Vue Flow or 
some other business logic you would like to handle.

<div class="mt-6">
  <client-only>
    <Suspense>
      <Repl example="saveRestore"></Repl>
    </Suspense>
  </client-only>
</div>
