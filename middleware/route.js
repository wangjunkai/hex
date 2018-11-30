import Cookie from 'cookie'
import * as jsCokie from 'js-cookie'
import Vue from 'vue'

function changeelement(statescript, headscript, add) {
  statescript.forEach((item) => {
    const i = headscript.findIndex((_item) => {
      return item.id == _item.id
    })
    if (add) {
      if (i < 0) {
        headscript.push(item)
      }
    } else {
      if (i >= 0) {
        headscript.splice(i, 1)
      }
    }

  })
}

export default function ({app, store, route, redirect, query, res, req}) {

  let isPerson = /^\/person/g.test(route.fullPath)
  let isLogin = /^\/login/g.test(route.fullPath)
  let isTrade = /^(\/trade|\/person\/legal-currency)/g.test(route.fullPath)
  //没有登录跳转到登录
  if (process.client) {
    const uid = jsCokie.get(store.state.hex_uid.type)
    if (!uid) {
      store.commit('remove_user_info')
      if (isPerson) {
        return redirect('/')
      }
    }
    if (uid && isLogin) {
      return redirect('/')
    }
    const token = store.state.hex_token.value
    if (!token || !token.access_token) {
      location.reload()
    }
  }
  if (process.server) {
    if (isTrade) {
      changeelement(store.state.tradeScript, app.head.script, true)
    } else {
      changeelement(store.state.tradeScript, app.head.script, false)
    }
    const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : '')
    const uid = cookie[store.state.hex_uid.type]

    if (isPerson && !(cookie && uid)) {
      return redirect('/')
    }
    if (isLogin && cookie && uid) {
      return redirect('/')
    }
  }

  if (isPerson) {
    let r = route.path
    if (/^\/person\/security/g.test(route.fullPath)) {
      r = '/person/security'
    }
    if (/^\/person\/api/g.test(route.fullPath)) {
      r = '/person/api'
    }
    if (/^\/person\/address/g.test(route.fullPath)) {
      r = '/person/address'
    }
    store.commit('set_active_route', r)
  }
}
