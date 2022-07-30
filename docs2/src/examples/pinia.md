---
layout: page

---

# Pinia

Using your existing storage implementation is not an issue. 
You can store your elements in whatever store you're already using, mutate them there and pass the result to Vue Flow.

In this example we use [pinia](https://pinia.vuejs.org/) to store our elements, update their positions and toggle classes.

<div class="mt-6">
  <PiniaExample />
</div>
