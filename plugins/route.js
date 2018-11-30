function changeelement(statescript) {
  statescript.forEach((item) => {
    const j = document.createElement('script')
    const s = document.getElementsByTagName('script')[0];
    const old = document.querySelector('script#' + item.id)
    if (!old) {
      j.charset = 'UTF-8'
      j.src = item.src
      j.id = item.id
      s.parentNode.insertBefore(j, s)
    }
  })
}

import Vue from 'vue'

/*middleware 中的路由 比这里的要晚一点执行*/
export default (ref) => {
  const {app, store} = ref
  app.router.beforeEach((to, from, next) => {
    /*清除所有的订阅*/
    Vue.$pubsub.clearAllSubscriptions()

    let isTrade = /^(\/trade|\/person\/legal-currency)/g.test(to.fullPath)

    if (process.client) {
      if (isTrade) {
        changeelement(store.state.tradeScript)
      }
      if (!("from" in Array)) {
        changeelement([{src: '/js/polyfill.min.js', id: 'polyfill'}])
      }
    }

    next()
  })
}
