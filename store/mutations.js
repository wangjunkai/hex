//设置token
import * as Cookie from 'js-cookie'

/*server set*/
export function set_server_token(state, token) {
  state.hex_token.value = token
  state.hex_token.value[state.hex_timestamp.type] = new Date((new Date()).getTime() + 110 * 60 * 1000)
}

export function set_server_uid(state, params) {
  state.hex_uid.value = params
}

export function set_server_user_assets_uc(state, params) {
  state.hex_server_user_assets.value = params
}

export function set_server_tencentim_sign(state, params) {
  state.hex_server_tencentim_sign.value = params
}

export function set_server_key(state, params) {
  state.hex_key.value = params
}

export function set_server_user_info(state, params) {
  state.hex_server_user_info.value = params
}

/*client set*/
export function set_token(state) {
  //localStorage.setItem(state.hex_token.type, JSON.stringify(state.hex_token.value))
  Cookie.set(state.hex_token.type, JSON.stringify(state.hex_token.value))
}

export function remove_token(state) {
  //localStorage.removeItem(state.hex_token.type)
  Cookie.remove(state.hex_token.type, 1)
}

/*删除用户信息*/
export function remove_user_info(state) {
  state.hex_server_user_info.value = ''
  state.hex_server_user_assets.value = ''
  state.hex_uid.value = ''
  state.hex_key.value = ''
  Cookie.remove(state.hex_uid.type)
  Cookie.remove(state.hex_key.type)
}

/*更新用户信息*/
export function set_user_info(state, res) {
  const data = res.data ? res.data : res.hexdata
  state.hex_server_user_info.value = data
  state.hex_uid.value = data.uid
  state.hex_key.value = data.secretkey
  Cookie.set(state.hex_uid.type, data.uid)
  Cookie.set(state.hex_key.type, data.secretkey)
}


export function set_message(state, params) {
  state.message = Object.assign({}, params)
}

//设置汇率列表
export function set_exchange_rate(state, params) {
  state.exchangeRate = [].concat(params)
}

//设置客户端当前的货币
export function set_client_exchange(state, params) {
  state.hex_client_exchange.active = params
}

//设置客户端背景
export function set_client_background(state, params) {
  state.hex_client_background.active = params == 'day' ? 'day' : 'night'
}

export function set_active_route(state, route) {
  state.route.active = route
}

//设置币种列表
export function set_coin_title(state, params) {
  state.coinTitleList = params
}

//设置小数位数列表
export function set_decimals_list(state, params) {
  state.decimalsList = params
}

//设置语言
export function set_lang(state, lang) {
  state.hex_lang.locale = lang
}

export function set_dot_type(state, ti) {
  state.dotType = ti
}

export function set_ip(state, ip) {
  state.ip = ip
}

export function set_maintain(state, obj) {
  state.maintain = obj
}

export function set_user_allwithdrawlimtperday(state, obj) {
  state.user_allwithdrawlimtperday = obj
}

/*设置本地自选*/
export function set_client_collect(state, id) {
  let collect = JSON.parse(localStorage.getItem('HEX_COLLECT'))
  if (!(collect && typeof collect == 'object')) {
    collect = {}
  }

  if (id in collect) {
    collect[id] = !collect[id]
  } else {
    collect[id] = true
  }
  localStorage.setItem('HEX_COLLECT', JSON.stringify(collect))
}
