import type { ConnectionLineProps } from '@vue-flow/core';
import { BaseEdge, getBezierPath } from '@vue-flow/core';
import { defineComponent, h, watch } from 'vue';

const connectionLineId = 'test-custom-connection-line';

describe('Custom Connection Line', () => {
  it('renders a custom connection line component', () => {
    const CustomConnectionLine = defineComponent<ConnectionLineProps>({
      props: ['fromNode', 'fromHandle', 'toNode', 'toHandle', 'fromX', 'fromY', 'toX', 'toY', 'pointer'] as any,
      emits: ['change'],
      setup(props, { emit }) {
        watch(
          () => props,
          (currProps) => {
            emit('change', {
              sourceNodeId: currProps.fromNode?.id,
              sourceHandleId: currProps.fromHandle?.id ?? null,
              targetNodeId: currProps.toNode?.id,
              targetHandleId: currProps.toHandle?.id ?? null,
              // the raw pointer + the (snapped) line end must be finite flow-space coordinates
              pointerIsFinite: Number.isFinite(currProps.pointer?.x) && Number.isFinite(currProps.pointer?.y),
              toIsFinite: Number.isFinite(currProps.toX) && Number.isFinite(currProps.toY),
            });
          },
          { immediate: true, deep: true },
        );

        return () => {
          const path = getBezierPath({ sourceX: props.fromX, sourceY: props.fromY, targetX: props.toX, targetY: props.toY });

          return h(BaseEdge, { path: path[0], class: connectionLineId });
        };
      },
    });

    const onChangeSpy = cy.spy().as('onChangeSpy');

    cy.vueFlow(
      {
        autoConnect: true,
        fitView: false,
        nodes: [
          {
            id: '1',
            data: { label: 'Node 1' },
            position: { x: 0, y: 0 },
          },
          {
            id: '2',
            type: 'output',
            data: { label: 'Node 2' },
            position: { x: 300, y: 300 },
          },
        ],
      },
      {},
      { 'connection-line': (props: ConnectionLineProps) => h(CustomConnectionLine, { ...props, onChange: onChangeSpy }) },
    );

    // Native drag (no chained `cy.trigger`, which can cancel the in-progress connection): dispatch
    // mousedown + smooth moves to leave the connection IN PROGRESS, assert the custom line mid-drag, then
    // mouseup natively. Settles via `setTimeout` (rAF throttles headless).
    cy.get(`[data-nodeid="1"].source`).then(($src) => {
      cy.get(`[data-nodeid="2"].target`).then(($tgt) => {
        const src = $src[0];
        const tgt = $tgt[0];
        const win = src.ownerDocument.defaultView as Window;
        const doc = src.ownerDocument;
        const s = src.getBoundingClientRect();
        const t = tgt.getBoundingClientRect();
        const sx = s.x + s.width / 2;
        const sy = s.y + s.height / 2;
        const tx = t.x + t.width / 2;
        const ty = t.y + t.height / 2;
        const fire = (target: EventTarget, type: string, x: number, y: number, b: number) =>
          target.dispatchEvent(new win.MouseEvent(type, { bubbles: true, cancelable: true, view: win, button: 0, buttons: b, clientX: x, clientY: y }));
        const settle = () => new Promise<void>(r => win.setTimeout(r, 24));

        return (async () => {
          fire(src, 'mousedown', sx, sy, 1);
          await settle();
          for (let i = 1; i <= 5; i++) {
            fire(doc, 'mousemove', sx + ((tx - sx) * i) / 5, sy + ((ty - sy) * i) / 5, 1);
            await settle();
          }
          fire(tgt, 'mousemove', tx, ty, 1);
          await settle();
        })();
      });
    });

    // connection is in progress → the custom line is rendered and onChange has fired with the resolved ends
    cy.get(`.${connectionLineId}`).should('have.length', 1);
    cy.get('@onChangeSpy').should('have.been.calledWith', {
      sourceNodeId: '1',
      sourceHandleId: null,
      targetNodeId: '2',
      targetHandleId: null,
      pointerIsFinite: true,
      toIsFinite: true,
    });

    // finish the drag (mouseup over the target) → line removed, edge committed
    cy.get(`[data-nodeid="2"].target`).then(($tgt) => {
      const tgt = $tgt[0];
      const win = tgt.ownerDocument.defaultView as Window;
      const t = tgt.getBoundingClientRect();
      const tx = t.x + t.width / 2;
      const ty = t.y + t.height / 2;
      const up = (target: EventTarget) =>
        target.dispatchEvent(new win.MouseEvent('mouseup', { bubbles: true, cancelable: true, view: win, button: 0, buttons: 0, clientX: tx, clientY: ty }));
      up(tgt);
      up(tgt.ownerDocument);
    });

    cy.get(`.${connectionLineId}`).should('have.length', 0);
    cy.get('.vue-flow__edge').should('have.length', 1);
  });
});
