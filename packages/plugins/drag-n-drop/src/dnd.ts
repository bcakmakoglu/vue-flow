import type { MaybeRef } from '@vueuse/core'
import type { ComponentPublicInstance } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { createEventHook } from '@vueuse/core'
import type { Plugin } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import type { DragNDropState, DragNodeType, OnDragStartEventData, OnDropData } from './types'

function createDragNDrop(container: MaybeRef<HTMLElement | ComponentPublicInstance | null>): DragNDropState {
  const onDragStart = createEventHook<OnDragStartEventData>()
  const onDragOver = createEventHook<DragEvent>()
  const onDrop = createEventHook<OnDropData>()

  const nodeType = ref<DragNodeType>()

  const initialContainer = computed(() => unref(container))
  const _container = ref<HTMLElement | ComponentPublicInstance | null>(unref(container))

  const el = computed(() => {
    const containerEl = _container.value || initialContainer.value
    if (!containerEl) return null

    if ('$el' in containerEl) return containerEl.$el as HTMLElement
    return containerEl as HTMLElement
  })

  function handleDragStart(event: DragEvent, type: DragNodeType) {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
    }

    nodeType.value = type
    onDragStart.trigger({ event, type })
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }

    onDragOver.trigger(event)
  }

  function handleDrop(event: DragEvent) {
    const type = nodeType.value as DragNodeType

    if (!type || !el.value) return

    const { left, top } = el.value.getBoundingClientRect()

    const position = {
      x: event.clientX - left,
      y: event.clientY - top,
    }

    onDrop.trigger({ event, type, position })
  }

  return {
    container: _container,
    nodeType,
    handleDragStart,
    handleDragOver,
    handleDrop,
    onDragStart: onDragStart.on,
    onDragOver: onDragOver.on,
    onDrop: onDrop.on,
  }
}

export const PluginDragNDrop: Plugin = (hooks) => {
  hooks.created((store) => {
    store.dragNDrop = createDragNDrop(store.vueFlowRef)
  })
}

export function useDragNDrop<CustomType extends string = string>(
  container?: MaybeRef<HTMLElement | ComponentPublicInstance | null>,
) {
  const { dragNDrop } = useVueFlow()

  watch(
    () => unref(container),
    (value) => {
      if (value) {
        dragNDrop.container.value = value
      }
    },
    { immediate: true },
  )

  return dragNDrop as DragNDropState<CustomType>
}
