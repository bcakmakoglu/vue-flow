import type { VueFlowStore } from '@vue-flow/core';
import { getStore } from '../../support/component';

// `connectionDragThreshold` is the distance the pointer must travel from a handle before a connection
// line starts to drag. The gating itself lives in `@xyflow/system`'s `XYHandle.onPointerDown`; these
// specs assert vue-flow threads the prop through so the start is deferred until the threshold is crossed.
describe('connectionDragThreshold', () => {
  let store: VueFlowStore;

  function mountWithThreshold(threshold: number) {
    cy.vueFlow({
      fitView: false,
      connectionDragThreshold: threshold,
      nodes: [
        { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 300, y: 300 } },
      ],
      autoConnect: true,
    });

    cy.then(() => {
      store = getStore();
    });
  }

  // a single native drag on the source handle by `dx`/`dy` px, released in place. XYHandle starts on
  // `mousedown` then listens for `mousemove`/`mouseup` on `document`, so we dispatch natively in one block
  // (a cypress command between steps would cancel the in-progress connection — see `dragConnection`).
  function dragSourceHandleBy(nodeId: string, dx: number, dy: number) {
    cy.get(`[data-nodeid="${nodeId}"].source`).then(($src) => {
      const el = $src[0];
      const win = el.ownerDocument.defaultView as Window;
      const doc = el.ownerDocument;

      const fire = (target: EventTarget, type: string, x: number, y: number, buttons: number) =>
        target.dispatchEvent(new win.MouseEvent(type, { bubbles: true, cancelable: true, view: win, button: 0, buttons, clientX: x, clientY: y }));
      const settle = () => new Promise<void>(resolve => win.setTimeout(resolve, 24));

      const r = el.getBoundingClientRect();
      const sx = r.x + r.width / 2;
      const sy = r.y + r.height / 2;

      return (async () => {
        fire(el, 'mousedown', sx, sy, 1);
        await settle();
        fire(doc, 'mousemove', sx + dx, sy + dy, 1);
        await settle();
        fire(doc, 'mouseup', sx + dx, sy + dy, 0);
        await settle();
      })();
    });
  }

  it('does not start a connection while the pointer stays within the threshold', () => {
    mountWithThreshold(100);

    let startCount = 0;
    cy.then(() => {
      store.onConnectStart(() => startCount++);
    });

    // ~14px of movement — well under the 100px threshold
    dragSourceHandleBy('1', 10, 10);

    cy.then(() => {
      expect(startCount, 'onConnectStart did not fire below the threshold').to.eq(0);
      expect(store.connectionStartHandle.value, 'no connection was started').to.eq(null);
      expect(store.edges.value, 'no edge was created').to.have.length(0);
    });
  });

  it('starts the connection once the pointer moves past the threshold', () => {
    mountWithThreshold(20);

    let startCount = 0;
    cy.then(() => {
      store.onConnectStart(() => startCount++);
    });

    // ~57px of movement — past the 20px threshold
    dragSourceHandleBy('1', 40, 40);

    cy.then(() => {
      expect(startCount, 'onConnectStart fired once past the threshold').to.eq(1);
    });
  });
});
