const productionEnvs = ['production', 'prod']

export function warn(message: string, ...args: any[]) {
  if (isDev()) {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}

export function isDev() {
  return !productionEnvs.includes(__ENV__ || '')
}
