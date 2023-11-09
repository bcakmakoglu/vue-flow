import { BackgroundVariant } from '../types'

import DotPattern from './dot'
import LinePattern from './line'

export const Patterns = {
  [BackgroundVariant.Lines]: LinePattern,
  [BackgroundVariant.Dots]: DotPattern,
}

export const DefaultBgColors: Record<BackgroundVariant, string> = {
  [BackgroundVariant.Dots]: '#81818a',
  [BackgroundVariant.Lines]: '#eee',
}

export { DotPattern, LinePattern }
