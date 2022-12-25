---
'@vue-flow/core': minor
---

Allow customizing the controls of the viewport and the selection box.

## Props
- `selectionOnDrag`: Selection box without extra button press (need to set `:pan-on-drag="false"` or `:pan-on-drag="[2]"`[RightClick]).
- `panOnDrag`: Can now be a boolean or a number[], this allows you to configure every mouse button as a drag button. [1, 2] would mean that you can drag via middle and right mouse button.
- `panActivationKeyCode`: Key code (or KeyFilter) for activating dragging (useful when using selectionOnDrag).
- `selectionMode`: You can choose if the selection box needs to contain a node fully (`SelectionMode.Full`) or partially (`SelectionMode.Partial`) to select.

## Events

- `onSelectionStart`: Emitted when the selection box is started.
- `onSelectionEnd`: Emitted when the selection box is ended.
- `onViewportChangeStart`: Emitted when viewport change has started.
- `onViewportChange`: Emitted when viewport is changed.
- `onViewportChangeEnd`: Emitted when viewport change has ended.
