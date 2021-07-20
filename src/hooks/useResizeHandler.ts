import { getDimensions } from '../utils';
import { Dimensions } from '../types';

export default (rendererNode: HTMLDivElement, updateSize: (size: Dimensions) => any) => {
  let resizeObserver: ResizeObserver;

  const updateDimensions = () => {
    if (!rendererNode) {
      return;
    }

    const size = getDimensions(rendererNode);

    if (size.height === 0 || size.width === 0) {
      console.log('The revue Flow parent container needs a width and a height to render the graph.');
    }

    updateSize(size);
  };

  updateDimensions();
  window.onresize = updateDimensions;

  if (rendererNode) {
    resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(rendererNode);
  }
};
