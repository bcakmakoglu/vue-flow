import { Ref } from 'vue';
import { KeyCode } from '../types';
import { controlledRef, onKeyStroke, useEventListener } from '@vueuse/core';

export default (keyCode?: KeyCode, cb?: (keyPress: boolean) => void): Ref<boolean> => {
  const keyPressed = controlledRef<boolean>(false, {
    onBeforeChange(val, oldVal) {
      if (val === oldVal) return false;
    },
    onChanged() {
      if (cb && typeof cb === 'function') cb(keyPressed.value);
    }
  });

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

  if (cb && typeof cb === 'function') cb(keyPressed.value);

  return keyPressed;
};
