const productionEnvs = ['production', 'prod']

export function warn(message: string, ...args: any[]) {
  if (!productionEnvs.includes(__ENV__ || '')) {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}
