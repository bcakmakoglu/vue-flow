export const createGridLinesPath = (size: number, strokeWidth: number, stroke: string) => {
  return <path stroke={stroke} stroke-width={strokeWidth} d={`M${size / 2} 0 V${size} M0 ${size / 2} H${size}`} />
}

export const createGridDotsPath = (size: number, fill: string) => {
  return <circle cx={size} cy={size} r={size} fill={fill} />
}
