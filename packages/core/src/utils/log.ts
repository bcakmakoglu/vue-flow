const productionEnvs = ['production', 'prod']

export const warn = (message: string, ...args: any[]) => {
  if (!productionEnvs.includes(__ENV__ || '')) {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}
