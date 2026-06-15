import type { Actions, Edge, HandleElement } from '../types';

export function getEdgeHandle(bounds: HandleElement[] | null, handleId?: string | null): HandleElement | null {
  if (!bounds) {
    return null;
  }

  // if no handleId is given, we use the first handle, otherwise we check for the id
  return (!handleId ? bounds[0] : bounds.find(d => d.id === handleId)) || null;
}

export function getEdgeZIndex(edge: Edge, getInternalNode: Actions['getInternalNode'], elevateEdgesOnSelect = false) {
  const hasZIndex = typeof edge.zIndex === 'number';
  let z = hasZIndex ? edge.zIndex! : 0;

  const source = getInternalNode(edge.source);
  const target = getInternalNode(edge.target);

  if (!source || !target) {
    return 0;
  }

  if (elevateEdgesOnSelect) {
    z = hasZIndex ? edge.zIndex! : Math.max(source.internals.z || 0, target.internals.z || 0);
  }

  return z;
}
