import { defineConfig } from 'windicss/helpers'
import { resolve } from 'path'
import typography from 'windicss/plugin/typography'
import scrollbar from '@windicss/plugin-scrollbar'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, 'components/**/*.{ts,md,vue}'),
      resolve(__dirname, '../src/**/*.{ts,md,vue}')
    ],
  },

  attributify: true,
  darkMode: 'media',

  plugins: [
    typography({
      dark: true,
    }),
    scrollbar
  ],

  shortcuts: {
    'primary-gradient': 'bg-gradient-to-b from-accent-500 via-accent-700 to-accent-900',
  },

  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fcf9ff',
          '100': '#f8f3ff',
          '200': '#eee1fe',
          '300': '#e4cffe',
          '400': '#cfaafd',
          '500': '#BB86FC',
          '600': '#a879e3',
          '700': '#8c65bd',
          '800': '#705097',
          '900': '#5c427b',
          'DEFAULT': '#BB86FC',
        },
        secondary: {
          '50': '#c4fef9',
          '100': '#9df7ef',
          '200': '#77f0e4',
          '300': '#50e8da',
          '400': '#2ae1cf',
          '500': '#03dac5',
          '600': '#03ae9d',
          '700': '#028276',
          '800': '#02564e',
          '900': '#012a26',
          'DEFAULT': '#03dac5',
        },
        accent: {
          '50': '#e6d4ff',
          '100': '#ccaafc',
          '200': '#b17ff8',
          '300': '#9755f5',
          '400': '#7c2af1',
          '500': '#6200ee',
          '600': '#5000c1',
          '700': '#3d0095',
          '800': '#2b0068',
          '900': '#18003b',
          'DEFAULT': '#6200ee',
        },
      },
    },
  },
})
