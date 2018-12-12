export default () => ({
  //全局本地语言
  hex_lang: {
    type: 'HEX_LANG',
    default: 'zh_cn',
    locales: [
      {locale: "zh_cn", lang: "中文简体"},
      {locale: "en_us", lang: "English"}
    ],
    locale: 'zh_cn'
  },
  hex_timestamp: {
    type: 'HEX_TIMESTAMP',
    value: ''
  },
  hex_uid: {
    type: 'HEX_UID',
    value: ''
  },
  hex_key: {
    type: 'HEX_KEY',
    value: ''
  },
  hex_token_state: false,
  hex_token: {
    type: 'HEX_TOKEN',
    value: ''
  },
  /*用户信息*/
  hex_user_info: {
    type: 'HEX_USER_INFO',
    value: ''
  },
  hex_server_user_info: {
    type: 'HEX_SERVER_USER_INFO',
    value: ''
  },
  /*用户资产*/
  hex_server_user_assets: {
    type: 'HEX_SERVER_USER_ASSETS',
    value: ''
  },
  /*腾讯im sign*/
  hex_server_tencentim_sign: {
    type: 'HEX_SERVER_TENCENTIM_SIGN',
    value: ''
  },
  //本地背景
  hex_client_background: {
    type: 'HEX_CLIENT_BACKGROUND',
    active: '',
    default: 'night'
  },
  //全局本地货币
  hex_client_exchange: {
    type: 'HEX_CLIENT_EXCHANGE',
    default: 'cny',
    active: 'cny',
    cny: {
      name: 'cny',
      mark: '￥'
    },
    usd: {
      name: 'usd',
      mark: '$'
    }
  },
  //全局本地语言
  hex_client_language: {
    type: 'HEX_CLIENT_LANGUAGE',
    value: 'zh_cn'
  },
  //全局消息
  message: {
    text: '',
    type: ''
  },
  //个人中心路由配置
  hovers: 1,
  route: {
    active: '',
    person: '/person',
    authentication: '/person/authentication',
    wallet: '/person/wallet',
    walletHistory: '/person/wallet-history',
    deal: '/person/deal',
    underway: "/person/underway",
    undone: '/person/undone',
    security: '/person/security',
    withdraw: '/person/address',
    history: '/person/login-history',
    api: '/person/api',
    legal: '/person/legal-currency',
    payment: '/person/payment',
    invitation: '/person/invitation',
    manage: '/person/manage-financial',
    financialDeal: '/person/financial-deal'
  },
  //币种列表
  coinTitleList: [],
  exchangeRate: [],
  //设置小数位数列表
  decimalsList: [],
  //轮询监听
  timer: {},
  ip: '',
  //合并深度
  dotType: 8,
  maintain: {},
  user_allwithdrawlimtperday: '',
  //token 参数
  tokenParams: {
    grant_type: 'client_credentials',
    client_id: '96033e1474a145789c3f0593431cfcff',
    client_secret: '75c4f427996e42cb82bf9abbf4102400',
    scope: 'hexapi'
  },
  /**/
  tradeScript: [
    {src: '/im/speakmd5.js', id: 'speakmd5'},
    {src: '/im/json2.js', id: 'json2'},
    {src: '/im/webim.js', id: 'webim'}
  ],
  dealScript: [
    {src: '/chart/hex_chart.js', id: 'hex_chart'}
  ]
})


