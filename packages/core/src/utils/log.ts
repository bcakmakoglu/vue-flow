const productionEnvs = ['production', 'prod']

export class VueFlowError extends Error {
  constructor(message: string, scope?: string) {
    super(`[Vue Flow]: ${scope ? `${scope} - ` : ''}${message}`)
  }
}

export function warn(message: string, ...args: any[]) {
  if (!productionEnvs.includes(__ENV__ || '')) {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}
