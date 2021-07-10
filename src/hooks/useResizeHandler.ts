import { getDimensions } from '../utils';
import store from '../store';

export default (rendererNode: HTMLDivElement) => {
  const pinia = store();

  let resizeObserver: ResizeObserver;

  const updateDimensions = () => {
    if (!rendererNode) {
      return;
    }

    const size = getDimensions(rendererNode);

    if (size.height === 0 || size.width === 0) {
      console.log('The revue Flow parent container needs a width and a height to render the graph.');
    }

    pinia.updateSize(size);
  };

  updateDimensions();
  window.onresize = updateDimensions;

  if (rendererNode) {
    resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(rendererNode);
  }
  /*
    return () => {
      window.onresize = null;

      if (resizeObserver && rendererNode) {
        resizeObserver.unobserve(rendererNode);
      }
    };

   */
};
