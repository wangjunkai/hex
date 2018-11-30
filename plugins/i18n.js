import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({app, store}) => {

  app.i18n = new VueI18n({
    locale: store.state.hex_lang.locale,
    fallbackLocale: 'zh_cn',
    messages: {
      'en_us': require('~/locales/en.json'),
      'zh_cn': require('~/locales/zh.json')
    },
    silentTranslationWarn: false
  })
}
