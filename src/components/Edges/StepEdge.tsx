import { defineComponent } from 'vue'
import SmoothStepEdge from './SmoothStepEdge'
import { EdgeSmoothProps } from './utils'
import { EdgeType } from '../../types'

export default defineComponent({
  components: { SmoothStepEdge },
  inheritAttrs: false,
  props: {
    ...EdgeSmoothProps
  },
  setup(props) {
    return () => <SmoothStepEdge {...props} borderRadius={0} />
  }
}) as EdgeType
