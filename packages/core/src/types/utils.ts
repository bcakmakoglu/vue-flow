import type { MaybeRef } from '@vueuse/core'

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)
