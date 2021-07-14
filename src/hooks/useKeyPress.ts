import { isInputDOMNode } from '../utils';
import { KeyCode } from '../types';
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';

export default (keyCode?: KeyCode): Ref<boolean> => {
  const keyPressed = ref<boolean>(false);

  const downHandler = (event: KeyboardEvent) => {
    if (!isInputDOMNode(event) && (event.key === keyCode || event.keyCode === keyCode)) {
      event.preventDefault();
      keyPressed.value = true;
    }
  };

  const upHandler = (event: KeyboardEvent) => {
    if (!isInputDOMNode(event) && (event.key === keyCode || event.keyCode === keyCode)) {
      keyPressed.value = false;
    }
  };

  const resetHandler = () => (keyPressed.value = false);

  const bindEvents = () => {
    if (typeof keyCode !== 'undefined') {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);
    }
  };

  const unbindEvents = () => {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
    window.removeEventListener('blur', resetHandler);
  };

  onMounted(() => {
    bindEvents();
  });
  onBeforeUnmount(() => {
    unbindEvents();
  });

  return keyPressed;
};
