---
pageClass: examples

---

# Basic

This is a basic example to help you familiarize with the basic features of Vue Flow. 

On the bottom left you see the viewport-controls and on the bottom right the minimap.
You can also see the built-in node (default, input, output) and edge (bezier, straight, step, smoothstep) types.

<div class="mt-6">
  <Suspense>
    <Repl 
      :files="[
        { file: 'basic/Basic', filename: 'App.vue', ext: 'vue' }, 
        { file: 'basic/initial-elements', filename: 'initial-elements.js', ext: 'js' }, 
        { file: 'basic/style', filename: 'style.css', ext: 'css' }
      ]"></Repl>
  </Suspense>
</div>
