export enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
}

export interface BackgroundProps {
  id?: string
  /** The background pattern variant, {@link BackgroundVariant} */
  variant?: BackgroundVariant
  /** Background pattern gap */
  gap?: number | number[]
  /** Background pattern size */
  size?: number
  lineWidth?: number
  /** Background pattern color */
  patternColor?: string
  /** Background color */
  bgColor?: string
  /** Background height */
  height?: number
  /** Background width */
  width?: number
  /** Background x-coordinate (offset x) */
  x?: number
  /** Background y-coordinate (offset y) */
  y?: number
  /** Background offset */
  offset?: number
}
