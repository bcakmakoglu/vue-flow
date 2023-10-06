import { resolve } from 'node:path'
import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'
import scrollbar from '@windicss/plugin-scrollbar'

export default defineConfig({
  extract: {
    include: [
      resolve(__dirname, './theme/**/*.{ts,md,vue}'),
      resolve(__dirname, '../../components/**/*.{ts,md,vue}'),
      resolve(__dirname, '../**/*.{ts,md,vue}'),
    ],
  },

  darkMode: 'class',

  plugins: [
    typography({
      dark: true,
    }),
    scrollbar,
  ],

  shortcuts: {
    'primary-gradient': 'bg-gradient-to-b from-accent-500 via-accent-700 to-accent-900',
  },

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#42B983',
          50: '#C7EBDB',
          100: '#B8E6D1',
          200: '#9ADBBE',
          300: '#7CD0AA',
          400: '#5EC697',
          500: '#42B983',
          600: '#339066',
          700: '#246648',
          800: '#163D2B',
          900: '#07140E',
          950: '#000000',
        },
        secondary: {
          DEFAULT: '#35495E',
          50: '#8CA5BE',
          100: '#7F9AB7',
          200: '#6586A8',
          300: '#527292',
          400: '#445D78',
          500: '#35495E',
          600: '#212D3A',
          700: '#0D1116',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        accent: {
          DEFAULT: '#F15A16',
          50: '#FBD5C3',
          100: '#FAC7B0',
          200: '#F8AC89',
          300: '#F69163',
          400: '#F3753C',
          500: '#F15A16',
          600: '#C3450C',
          700: '#8E3209',
          800: '#591F05',
          900: '#240D02',
          950: '#0A0401',
        },
      },
    },
  },
})
