---
pageClass: examples

---

# Save & Restore

There is no built-in storage feature, however creating a save & restore feature is simple.

This example demonstrates save & restore functionality using the `LocalStorage` of the browser.
You are of course free to implement your own logic (for example fetching the data from an API that's connected to a database).

<div class="mt-6">
  <client-only>
    <Suspense>
      <Repl example="saveRestore"></Repl>
    </Suspense>
  </client-only>
</div>
