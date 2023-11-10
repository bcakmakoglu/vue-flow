import { type PropType, computed, defineComponent, h } from 'vue-demi'

import { useVueFlow } from '@vue-flow/core'

import { type BackgroundProps, BackgroundVariant, type BackgroundVariantType } from '../types'
import { DefaultBgColors, DotPattern, LinePattern } from '../Pattern'

import { transformForCompatibleAttrs, transformForCompatibleProps } from '../utils'

const Background = defineComponent({
  name: 'Background',
  compatConfig: { MODE: 2 },
  props: {
    id: {
      type: String,
      default: '',
      required: false,
    },
    variant: {
      type: String as PropType<BackgroundVariant | BackgroundVariantType>,
      default: BackgroundVariant.Dots,
      required: false,
    },
    gap: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: 20,
      required: false,
    },
    size: {
      type: Number,
      default: () => 1,
      required: false,
    },
    lineWidth: {
      type: Number,
      default: () => 1,
      required: false,
    },
    height: {
      type: Number,
      default: () => 100,
      required: false,
    },
    width: {
      type: Number,
      default: () => 100,
      required: false,
    },
    x: {
      type: Number,
      default: () => 0,
      required: false,
    },
    y: {
      type: Number,
      default: () => 0,
      required: false,
    },
    offset: {
      type: Number,
      default: () => 2,
      required: false,
    },
    bgColor: {
      type: String,
      default: '',
      required: false,
    },
    patternColor: {
      type: String,
      default: '',
      required: false,
    },
  },
  setup(props: BackgroundProps, { slots }) {
    const { id: vueFlowId, viewport } = useVueFlow()

    const background = computed(() => {
      const offset = props.offset || 2

      const [gapX = 20, gapY = 20] = Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]

      const scaledGap: [number, number] = [gapX * (viewport.value.zoom || 1), gapY * (viewport.value.zoom || 1)]

      const scaledSize = (props.size || 1) * viewport.value.zoom

      const patternOffset =
        props.variant === BackgroundVariant.Dots
          ? [scaledSize / offset, scaledSize / offset]
          : [scaledGap[0] / offset, scaledGap[1] / offset]

      return {
        scaledGap,
        offset: patternOffset,
        size: scaledSize,
      }
    })

    // when there are multiple flows on a page we need to make sure that every background gets its own pattern.
    const patternId = computed(() => `pattern-${vueFlowId}${props.id ? `-${props.id}` : ''}`)

    const patternColor = computed(() => props.patternColor || DefaultBgColors[props.variant || BackgroundVariant.Dots])

    const height = computed(() => {
      return props.height || 100
    })

    const width = computed(() => {
      return props.width || 100
    })

    return () =>
      h(
        'svg',
        {
          class: ['vue-flow__background vue-flow__container'],
          style: {
            height: `${height.value > 100 ? 100 : height.value}%`,
            width: `${width.value > 100 ? 100 : width.value}%`,
          },
        },
        [
          slots.patternContainer
            ? slots.patternContainer(
                transformForCompatibleProps({
                  id: patternId.value,
                }),
              )
            : h(
                'pattern',
                transformForCompatibleAttrs({
                  id: patternId.value,
                  x: viewport.value.x % background.value.scaledGap[0],
                  y: viewport.value.y % background.value.scaledGap[1],
                  width: background.value.scaledGap[0],
                  height: background.value.scaledGap[1],
                  patternTransform: `translate(-${background.value.offset[0]},-${background.value.offset[1]})`,
                  patternUnits: 'userSpaceOnUse',
                }),
                slots.pattern
                  ? slots.pattern
                  : [
                      props.variant === BackgroundVariant.Lines
                        ? h(
                            LinePattern,
                            transformForCompatibleProps({
                              size: props.lineWidth,
                              color: patternColor.value,
                              dimensions: background.value.scaledGap,
                            }),
                          )
                        : h(
                            DotPattern,
                            transformForCompatibleProps({
                              color: patternColor.value,
                              radius: background.value.size / (props.offset || 2),
                            }),
                          ),
                      props.bgColor
                        ? h(
                            'svg',
                            transformForCompatibleAttrs({
                              height: '100',
                              width: '100',
                            }),
                            [
                              h(
                                'rect',
                                transformForCompatibleAttrs({
                                  height: '100%',
                                  width: '100%',
                                  fill: props.bgColor,
                                }),
                              ),
                            ],
                          )
                        : null,
                    ],
              ),
          h(
            'rect',
            transformForCompatibleAttrs({
              x: props.x,
              y: props.y,
              width: '100%',
              height: '100%',
              fill: `url(#${patternId.value})`,
            }),
          ),
          slots.default &&
            slots.default(
              transformForCompatibleProps({
                id: patternId.value,
              }),
            ),
        ],
      )
  },
})

export default Background
