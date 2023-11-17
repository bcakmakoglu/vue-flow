// todo: replace with a simple string type
export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

export type BackgroundVariantType = Lowercase<keyof typeof BackgroundVariant>

export interface BackgroundProps {
  id?: string
  /** The background pattern variant */
  variant?: BackgroundVariant | BackgroundVariantType
  /** Background pattern gap */
  gap?: number | number[]
  /** Background pattern size */
  size?: number
  lineWidth?: number
  /** Background pattern color */
  patternColor?: string
  /** Background color */
  bgColor?: string
  /** @deprecated Background height */
  height?: number
  /** @deprecated Background width */
  width?: number
  /** Background x-coordinate (offset x) */
  x?: number
  /** Background y-coordinate (offset y) */
  y?: number
  /** Background offset */
  offset?: number
}
