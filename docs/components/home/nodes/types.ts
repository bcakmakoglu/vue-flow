import type { Node } from '@vue-flow/core';
import type { ComputedRef, Ref } from 'vue';
import type { Colors } from '../flows/utils';

export type RGBInputNode = Node<
  {
    color: Colors;
    val: Ref<number>;
  },
  'rgb-input'
>;

export type RGBOutputNode = Node<
  {
    rgb: ComputedRef<string>;
  },
  'rgb-output'
>;

export type RGBNode = RGBInputNode | RGBOutputNode;
