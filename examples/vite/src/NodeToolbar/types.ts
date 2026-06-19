import type { Position } from '@vue-flow/core';

// `interface … extends Record<string, unknown>` satisfies `Node`'s `NodeData extends Record<string, unknown>`
// constraint (a plain interface has no index signature) while keeping the `interface` style.
export interface ToolbarNodeData extends Record<string, unknown> {
  label?: string;
  toolbarVisible?: boolean;
  toolbarPosition?: Position;
}
