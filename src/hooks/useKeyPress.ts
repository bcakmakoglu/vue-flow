import { ref, Ref } from 'vue';
import { KeyCode } from '../types';
import { onKeyStroke, useEventListener } from '@vueuse/core';

export default (keyCode?: KeyCode): Ref<boolean> => {
  const keyPressed = ref<boolean>(false);

  onKeyStroke(
    (event) => event.key === keyCode || event.keyCode === keyCode,
    (e) => {
      e.preventDefault();
      keyPressed.value = true;
    },
    { eventName: 'keypress' }
  );
  onKeyStroke(
    (event) => event.key === keyCode || event.keyCode === keyCode,
    (e) => {
      e.preventDefault();
      keyPressed.value = true;
    },
    { eventName: 'keydown' }
  );
  onKeyStroke(
    (event) => event.key === keyCode || event.keyCode === keyCode,
    (e) => {
      e.preventDefault();
      keyPressed.value = false;
    },
    { eventName: 'keyup' }
  );

  useEventListener(window, 'blur', () => {
    keyPressed.value = false;
  });

  return keyPressed;
};
