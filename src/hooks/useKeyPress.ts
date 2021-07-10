import { isInputDOMNode } from '../utils';
import { KeyCode } from '../types';
import { onMounted, ref } from 'vue-demi';

export default (keyCode?: KeyCode): boolean => {
  const keyPressed = ref<boolean>(false);

  onMounted(() => {
    if (typeof keyCode !== 'undefined') {
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

      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      window.addEventListener('blur', resetHandler);

      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
        window.removeEventListener('blur', resetHandler);
      };
    }
  });

  return keyPressed.value;
};
