import { defineConfig } from 'windicss/helpers'
import { resolve } from 'path'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, 'components/**/*.{ts,md,vue}')
    ],
  },
  attributify: true,
})
