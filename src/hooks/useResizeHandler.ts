import { getDimensions } from '../utils';
import { Dimensions } from '../types';
import { MaybeRef, unrefElement, until, useEventListener, useResizeObserver } from '@vueuse/core';

export default (rendererNode: MaybeRef<HTMLDivElement>, updateSize: (size: Dimensions) => any) => {
  const updateDimensions = () => {
    if (!rendererNode) {
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
    });
};
