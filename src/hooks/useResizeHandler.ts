import { createEventHook, MaybeRef, unrefElement, until, useEventListener, useResizeObserver } from '@vueuse/core';
import { getDimensions } from '../utils';
import { Dimensions } from '../types';

export default (rendererNode: MaybeRef<HTMLDivElement>, updateSize: (size: Dimensions) => any) => {
  const resizeHandlerHook = createEventHook();
  const updateDimensions = () => {
    if (!unrefElement(rendererNode)) {
      return;
    }

    const size = getDimensions(unrefElement(rendererNode));

    if (size.height === 0 || size.width === 0) {
      console.log('The revue Flow parent container needs a width and a height to render the graph.');
    }

    updateSize(size);
  };

  until(rendererNode)
    .toBeTruthy()
    .then(() => {
      updateDimensions();
      useEventListener(window, 'resize', updateDimensions);
      useResizeObserver(unrefElement(rendererNode), () => updateDimensions());
      resizeHandlerHook.trigger(true);
    });

  return {
    onReady: resizeHandlerHook.on
  };
};
