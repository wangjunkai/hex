let auth = 'https://auth.hex.com'
let api = 'https://api.hex.com'

let authapi = 'http://10.33.0.110:9000'
let localapi = 'http://10.33.0.110:9090'

let testauth = 'http://testauth.hex.com'
let testapi = 'http://13.115.43.192:9090'
const initproxy = false
const initauth = auth
const initapi = api

let obj = {
  /*
 ** Headers of the page
 */
  buildDir: '.hex',
  messages: {
    server_error: 'Hex.com Server error',
    nuxtjs: '',
    server_error_details: '',
  },
  head: {
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=Edge,chrome=1'},
      {name: 'format-detection', content: 'telephone=no'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: "https://www.googletagmanager.com/gtag/js?id=UA-127405416-1", defer: true},
      {src: 'https://ssl.captcha.qq.com/TCaptcha.js', defer: true},
      {src: 'https://pv.sohu.com/cityjson?ie=utf-8', defer: true}
    ]
  },

  /*
  ** Customize the progress bar color
  */
  loading: '~/components/public/loading.vue',
  /*
  ** Build configuration
  */
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return {x: 0, y: 0}
    },
    middleware: 'route'
  },
  build: {
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.resolve.alias['@'] = __dirname
    },
    vendor: [
      'element-ui',
      '~/plugins/main',
      '~/plugins/i18n',
      '~/plugins/axios',
      '~/plugins/notification'
    ],
    babel: {
      "plugins": [["component", {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }]],
      comments: true
    }
  },
  plugins: [
    {src: '~/plugins/route'},
    {src: '~/plugins/global', ssr: false},
    {src: '~/plugins/main'},
    {src: '~/plugins/i18n'},
    {src: '~/plugins/axios'},
    {src: '~/plugins/captcha', ssr: false},
    {src: '~/plugins/notification', ssr: false},
    {src: '~/plugins/elementui', ssr: true}
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: initproxy
  },
  proxy: {
    '/connect': {
      target: initauth
    },
    '/userapi': {
      target: initapi
    },
    '/comapi': {
      target: initapi
    },
    '/c2capi': {
      target: initapi
    },
    '/transactionapi': {
      target: initapi
    }
  }
}
let init = {
  proxy: initproxy,
  auth: initauth,
  api: initapi,
  obj: obj,
  pro: initauth == auth
}

export default init


