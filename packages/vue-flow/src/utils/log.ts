export const warn = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Vue Flow]: ${message}`, ...args)
  }
}
