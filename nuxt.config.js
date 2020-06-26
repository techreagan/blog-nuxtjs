import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1976D2' },
  /*
   ** Global CSS
   */
  css: [
    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
    // for bubble theme
    'quill/dist/quill.bubble.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/api.js', mode: 'Client' },
    { src: '@/plugins/vee-validate.js', mode: 'Client' },
    { src: '@/plugins/vue-quil-editor.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: `${process.env.VUE_APP_URL}/api/v1`
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/auth/me', method: 'post', propertyName: 'data' }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },
    redirect: {
      login: '/admin',
      logout: '/admin',
      callback: '/admin',
      home: '/admin/dashboard'
    }
  },
  router: {
    middleware: ['auth']
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: '#00a86b'
        },
        light: {
          background: '#d0f0c0'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {}
  }
}
