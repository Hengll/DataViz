/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'

// const lightTheme = {
//   dark: false,
//   colors: {
//     background: '#F5F5F5',
//     surface: '#FFFFFF',
//     'surface-bright': '#FFFFFF',
//     'surface-light': '#EEEEEE',
//     'surface-variant': '#424242',
//     'on-surface-variant': '#EEEEEE',
//     primary: '#F57C00',
//     'primary-darken-1': '#E65100',
//     secondary: '#1ABC9C',
//     'secondary-darken-1': '#16A085',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   },
//   variables: {
//     'border-color': '#000000',
//     'border-opacity': 0.12,
//     'high-emphasis-opacity': 0.87,
//     'medium-emphasis-opacity': 0.6,
//     'disabled-opacity': 0.38,
//     'idle-opacity': 0.04,
//     'hover-opacity': 0.04,
//     'focus-opacity': 0.12,
//     'selected-opacity': 0.08,
//     'activated-opacity': 0.12,
//     'pressed-opacity': 0.12,
//     'dragged-opacity': 0.08,
//     'theme-kbd': '#212529',
//     'theme-on-kbd': '#FFFFFF',
//     'theme-code': '#F5F5F5',
//     'theme-on-code': '#000000',
//   },
// }

// const darkTheme = {
//   dark: true,
//   colors: {
//     background: '#121212',
//     surface: '#212121',
//     'surface-bright': '#ccbfd6',
//     'surface-light': '#424242',
//     'surface-variant': '#424242',
//     'on-surface-variant': '#a3a3a3',
//     primary: '#FFA726',
//     'primary-darken-1': '#FB8C00',
//     secondary: '#4DD0E1',
//     'secondary-darken-1': '#26C6DA',
//     error: '#CF6679',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   },
//   variables: {
//     'border-color': '#FFFFFF',
//     'border-opacity': 0.12,
//     'high-emphasis-opacity': 1,
//     'medium-emphasis-opacity': 0.7,
//     'disabled-opacity': 0.38,
//     'idle-opacity': 0.1,
//     'hover-opacity': 0.04,
//     'focus-opacity': 0.12,
//     'selected-opacity': 0.08,
//     'activated-opacity': 0.12,
//     'pressed-opacity': 0.16,
//     'dragged-opacity': 0.08,
//     'theme-kbd': '#212529',
//     'theme-on-kbd': '#FFFFFF',
//     'theme-code': '#343434',
//     'theme-on-code': '#CCCCCC',
//   },
// }

const lightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#E0E0E0',
    'on-surface-variant': '#424242',
    primary: '#FE5300', // 橘紅色
    'primary-darken-1': '#F49610',
    secondary: '#FBBB11', // 黃色
    'secondary-darken-1': '#F49610',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    'surface-bright': '#333333',
    'surface-light': '#424242',
    'surface-variant': '#424242',
    'on-surface-variant': '#A3A3A3',
    primary: '#FE5300', // 橘紅色
    'primary-darken-1': '#F49610',
    secondary: '#FBBB11', // 黃色
    'secondary-darken-1': '#F49610',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.7,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.1,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#343434',
    'theme-on-code': '#CCCCCC',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})
