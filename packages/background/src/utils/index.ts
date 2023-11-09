// N.B. This transform is needed for Vue 2 compatability with h() render functions.
export function transformForCompatibleProps<TPropType>(props = {} as TPropType) {
  return {
    ...props,
    props: props || {},
  } as TPropType & {
    props: TPropType
  }
}

// N.B. This transform is needed for Vue 2 compatability with h() render functions.
export function transformForCompatibleAttrs<TAttrsType>(attrs = {} as TAttrsType) {
  return {
    ...attrs,
    attrs: attrs || {},
  } as TAttrsType & {
    attrs: TAttrsType
  }
}
