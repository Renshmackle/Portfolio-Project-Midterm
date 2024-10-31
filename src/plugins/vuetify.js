// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#ffbd39',
          // Add other colors as needed
        },
      },
    },
  },
  defaults: {
    VBtn: {
      style: [
        { fontFamily: 'Bowlby One, sans-serif' }
      ],
    },
    VToolbar: {
      style: [
        { fontFamily: 'Bowlby One, sans-serif' }
      ],
    },
  },
})