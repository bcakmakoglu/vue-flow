const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/revueflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }
};

const Sidebar = () => {
  return (
    <aside>
      <div class="description">You can drag these nodes to the pane on the left.</div>
      <div class="revue-flow__node-input" onDragstart={(event: DragEvent) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div class="revue-flow__node-default" onDragstart={(event: DragEvent) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div class="revue-flow__node-output" onDragstart={(event: DragEvent) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;
