import routes_me from './routes/config.js'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // loading: '~/components/layouts/LoadingBar.vue',


  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'esilax',
    htmlAttrs: {
      lang: 'vi'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: "/css/style.css",rel: 'stylesheet' },

    ],
    script: [
      {
        src: "/js/jquery.min.js",
        type: "text/javascript"
      },

      // {
      //   src: "/js/main.js",
      //   type: "text/javascript"
      // },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/editor.js', ssr: false},
    { src: '~/plugins/vue-select.js', ssr: false},
    { src: '~/plugins/vue-mixin-global.js'},
   ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [

    { path: '~/components/social', level: 0 },


    // {
    //   path: "~/components/user/",
    //   prefix: "User"
    // },
  
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'vue-sweetalert2/nuxt',
    'nuxt-route-meta',
    // 'nuxt-socket-io'
  ],
  // io: {
  //   sockets: [ // Required
  //     {  url: '' }
  //   ]
  // },
  i18n: {
    baseUrl: 'http://localhost:3000',
    locales: [
      {
        code: 'vi',
        name:'Tiếng việt',
        file: 'vi.js'
      },
      {
        code: 'en',
        name:'English',
        file: 'en.js'
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'vi',
    // parsePages: false,
    // pages: {
    // 'shared/diary': {
    //   vi: '/nhat-ky-banner',
    //   en: '/diary',
    //   },
    // }
  },
  // axios: {
  //   // proxy: true
  //   baseURL: ''
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth'],
    //  routes: [
    //   {
    //     name: 'register',
    //     path: '/dang-ky',
    //     component: 'pages/register.vue'
    //   },
    //  ],
    extendRoutes(routes) {
      routes_me.forEach(item => {
        routes.push(item);
      });
    }
  },
  generate: {
    fallback: true
  }
}

