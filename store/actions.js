import Cookie from "cookie";
import Vue from 'vue'
import axios from 'axios'

export default {

  async nuxtServerInit({dispatch, commit, state}, {app, req, error}) {
    try {
      const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : '')
      const hex_lang = cookie[state.hex_lang.type] ? cookie[state.hex_lang.type] : state.hex_lang.default
      const hex_exchange = cookie[state.hex_client_exchange.type] ? cookie[state.hex_client_exchange.type] : state.hex_client_exchange.default
      const hex_token = cookie[state.hex_token.type] ? JSON.parse(cookie[state.hex_token.type]) : ''
      const hex_key = cookie[state.hex_key.type] ? cookie[state.hex_key.type] : ''
      const hex_uid = cookie[state.hex_uid.type] ? cookie[state.hex_uid.type] : ''
      const hex_background = cookie[state.hex_client_background.type] ? cookie[state.hex_client_background.type] : state.hex_client_background.default

      //设置默认语言
      app.i18n.locale = hex_lang
      commit('set_lang', hex_lang)
      //设置默认币种
      commit('set_client_exchange', hex_exchange)
      //设置默认背景
      commit('set_client_background', hex_background)

      /*获取token*/
      let res = hex_token
      let needget = false
      if (res && res.access_token) {
        /*是否过期*/
        if (new Date(res.HEX_TIMESTAMP).getTime() < new Date().getTime()) {
          needget = true
        }
      } else {
        needget = true
      }

      if (needget) {
        res = await dispatch('token', state.tokenParams)
      }
      if (res && res.access_token) {
        /*存储token*/
        commit('set_server_token', res)

        //设置uid
        commit('set_server_uid', hex_uid)
        //设置key
        commit('set_server_key', hex_key)

        /*获取小数位数列表*/
        const decimals_data = await dispatch('com_precision_getlist')
        commit('set_decimals_list', decimals_data.data)

        if (state.hex_uid.value) {
          /*用户信息*/
          const user_data = await dispatch('user_user')
          const _user = user_data.data
          if (_user) {
            commit('set_server_user_info', _user)
          }
        }
      }
    } catch (e) {
      error('error')
    }
  },
  getIntervalData({dispatch, commit, state}, paramsary) {
    const requestTimer = new Date().getTime()
    const {url, params = {}, timer, callback} = paramsary
    const type = url
    Vue.$socket.cleartimer(type)

    Vue.$socket.pollingtimer[type] = {}

    function clearOtherTime(type) {
      let _timer = Object.getOwnPropertyNames(Vue.$socket.pollingtimer[type])
      if (_timer.length > 1) {
        _timer = _timer.sort((a, b) => {
          return parseFloat(a) - parseFloat(b)
        })
        for (let i = 0; i < _timer.length; i++) {
          if (i == (_timer.length - 1)) {
            break
          }
          clearTimeout(Vue.$socket.pollingtimer[type][_timer[i]])
          delete Vue.$socket.pollingtimer[type][_timer[i]]
        }
      }
    }

    const call = function () {
      const promise = dispatch(url, params)
      return promise
        .then((res) => {
          clearOtherTime(type)
          const _timer = Object.getOwnPropertyNames(Vue.$socket.pollingtimer[type])
          const _t = Vue.$socket.pollingtimer[type][_timer[0]]
          if (_t && _t < 0) {
            clearTimeout(Vue.$socket.pollingtimer[type][_timer[0]])
            Vue.$socket.pollingtimer[type][_timer[0]] = -1
          } else {
            Vue.$socket.pollingtimer[type][requestTimer] = setTimeout(call, timer)
            return res
          }
        })
        .then((res) => {
          if (res) {
            /*发布回调函数*/
            callback && callback(Object.assign(res, {params: params}))
            return res
          }
        })
    }
    return call()
  },
  token({commit}, params) {
    const config = {
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
    return this.$axios.post('/connect/token', params, config)
  },
  user_test_authorize({commit}, params) {
    return this.$axios.post('/userapi/v1.0/user/test.authorize', params)
  },
  com_country_getlist({commit}, params, config) {
    return this.$axios.post('/comapi/v1.0/com/country.getlist', params, config)
  },
  /*获取常量详细*/
  com_constants_getconstantsinfo({commit}, params, config) {
    return this.$axios.post('/comapi/v1.0/com/constants.getconstantsinfo', params, config)
  },
  user_user_settings_get({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.settings.get', params, config)
  },

  //注册登录
  user_user_signup({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.signup', params, config)
  },
  user_user_signin({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.signin', params, config)
  },
  user_user_signin_verify({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.signin.verify', params, config)
  },
  com_email_verifycode_send({commit}, params, config) {
    return this.$axios.post('/comapi/v1.0/com/email.verifycode.send', params, config)
  },
  com_sms_verifycode_send({commit}, params, config) {
    return this.$axios.post('/comapi/v1.0/com/sms.verifycode.send', params, config)
  },
  /*币币交易*/
  quotation_daily_get({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/daily.get', params, config)
  },
  quotation_kline_get({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/kline.get', params, config)
  },
  quotation_marketing_depth_get({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/marketing.depth.get', params, config)
  },
  quotation_trading_details_get({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/trading.details.get', params, config)
  },

  /*充值密码*/
  user_user_reset_pwd_step1({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.reset.pwd.step1', params, config)
  },
  user_user_reset_pwd_step2({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.reset.pwd.step2', params, config)
  },
  user_user_reset_pwd_step3({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.reset.pwd.step3', params, config)
  },
  // 绑定谷歌
  user_ga_create({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/user.ga.create', params, config)
  },
  // 首页24小时行内容区
  quotation_daily_getall({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/daily.getall', params, config)
  },
  // 首页24小时行内容区(首页k线行情)
  quotation_daily_getall_figure({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/quotation/daily.getall', params, config)
  },
  // 用户手机号、邮箱、Google绑定
  user_user_auth({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.auth", params, config)
  },
  // 获取首页24小时行情的头部
  quotation_frenchcurrency({commit}, params, config) {
    return this.$axios.post("/transactionapi/v1.0/quotation/frenchcurrency.get", params, config)
  },
  //获取用户订单
  trading_order_search({commit}, params, config) {
    return this.$axios.post('/transactionapi/v1.0/trading/order.search', params, config)
  },
  //获取用户资产
  user_assets_get({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/assets.get', params, config)
  },
  //用户中心资产种类
  user_assets_uc_get({commit}, params, config) {
    return this.$axios.post('/userapi/v1.0/user/assets.uc.get', params, config)
  },
  //获取用户基本信息
  user_user({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.get", params, config);
  },
  //修改用户登录密码
  user_user_password({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.password.modify", params, config);
  },
  //用户添加提币地址
  user_user_withdraw_address_add({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.add", params, config);
  },
  //获取货币基础信息列表
  com_currency_getpagelist({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/currency.getpagelist", params, config);
  },
  //用户提币地址查询
  user_withdraw_address_search({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.search", params, config);
  },
  //用户提币操作
  user_assets_withdraw({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/assets.withdraw", params, config);
  },
  //汇率
  quotation_getrateinfo_get({commit}, params, config) {
    return this.$axios.post("/transactionapi/v1.0/quotation/getrateinfo.get", params, config);
  },
  //获取当日最大提现额度
  user_serwithdraw_maxmount_get({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/assets.withdraw.limt.get", params, config);
  },

  user_withdraw_address_whitelist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.set", params, config);
  },
  //白名单是否开启
  user_withdraw_address_whitelist_check({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.check", params, config);
  },
//  用户删除提币地址
  user_withdraw_address_delete({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.delete", params, config);
  },
  //校验谷歌验证码
  user_google_verfiycode_check({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.google.verfiycode.check", params, config);
  },
  //校验手机验证码
  user_sms_verfiycode_check({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/sms.verifycode.check", params, config);
  },
  //校验邮箱验证码
  user_email_verfiycode_check({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/email.verifycode.check", params, config);
  },
  // 检验用户密码
  user_user_pwd_check({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.pwd.check", params, config);
  },
  //设置用户资金密码
  user_user_paypassword_set({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.paypassword.set", params, config);
  },

  //委托下单
  trading_order_create({commit}, params, config) {
    return this.$axios.post("/transactionapi/v1.0/trading/order.create", params, config);
  },
  //取消订单
  trading_order_cancel({commit}, params, config) {
    return this.$axios.post("/transactionapi/v1.0/trading/order.cancel", params, config);
  },

//用户身份认证
  user_user_idauth({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.idauth", params, config);
  },
  //查询用户日志
  user_logs_search({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.logs.search", params, config);
  },
  // 获取用户API列表
  user_api_getlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.api.getlist", params, config);
  },
  // 获取充提币记录
  user_assets_exchange_record({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/assets.exchange.record.get", params, config);
  },
  // 身份证识别
  com_ocr_idcard({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/ocr.idcard", params, config);
  },
// 新增用户API
  user_user_api_add({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.api.add", params, config);
  },
  // 查看用户API密钥
  user_user_api_secretkey_get({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.api.secretkey.get", params, config);
  },
  //删除用户API
  user_user_api_delete({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.api.delete", params, config);
  },
  //编辑用户API (IP地址白名单)
  user_user_address_edit({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.api.address.edit", params, config);
  },
  //图片上传
  com_image_upload({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/image.upload", params, config);
  },
// 添加自选交易对
  user_self_selection_add({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.self.selection.add", params, config);
  },
// 获取文章列表
  com_article_search({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/article.search", params, config);
  },
// 获取文章详细
  com_article_info_get({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/article.info.get", params, config);
  },
  // 删除自选交易对
  user_self_selection_delete({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.self.selection.delete", params, config);
  },
//获取交易对列表
  com_currency_transaction_symbols({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/currency.transaction.symbols", params, config);
  },

//  检查用户注册时邮箱和手机是否存在
  user_user_exist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.exist", params, config);
  },
  //  检查用户注册时邮箱和手机是否存在
  user_user_google_verfiycode_check({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.google.verfiycode.check", params, config);
  },

// 获取用户自选交易对列表
  user_self_selection_getlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.self.selection.getlist", params, config);
  },
  user_assets_withdraw_revoke({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/assets.withdraw.revoke", params, config);
  },
  // 获取用户收款/支付方式列表
  user_user_payments_getlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.payments.getlist", params, config);
  },
// 设置用户收款/支付方式
  user_user_payments_set({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.payments.set", params, config);
  },
  //保存用户昵称
  user_user_nickname_save({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.nickname.save", params, config);
  },
  //用户挂单
  trading_c2c_goods_add({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.goods.add", params, config);
  },
  //挂单列表
  trading_c2c_market_pagedlist({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.market.pagedlist", params, config);
  },
  /*用户下单*/
  trading_c2c_order_add({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.add", params, config);
  },

//订单列表
  trading_c2c_order_pagedlist({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.pagedlist", params, config);
  },
// 用户提币地址合法性检查
  user_user_withdraw_address_check({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.check", params, config);
  },
//确认收款并发货
  trading_c2c_order_receivables({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.receivables", params, config);
  },
//确认支付
  trading_c2c_order_comfirmpay({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.comfirmpay", params, config);
  },
//评价
  trading_c2c_order_evaluate({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.evaluate", params, config);
  },
//用户订单申诉
  trading_c2c_order_appeal({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.appeal", params, config);
  },
  //用户取消订单
  trading_c2c_order_cancel({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.order.cancel", params, config);
  },
  /*获取腾讯im签名*/
  trading_c2c_tencentim_sig_get({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.tencentim.sig.get", params, config);
  },
// 用户挂单下架
  trading_c2c_goods_offline({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.goods.offline", params, config);
  },
// 获取小数位数列表

  com_precision_getlist({commit}, params, config) {
    return this.$axios.post("/comapi/v1.0/com/precision.getlist", params, config);
  },
//  保存IM消息
  trading_c2c_tencentim_saveimmessage({commit}, params, config) {
    return this.$axios.post("/c2capi/v1.0/trading/c2c.tencentim.saveimmessage", params, config);
  },
  // 获取用户邀请记录
  user_invitationrecord_pagedlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/integral.user.invitationrecord.pagedlist", params, config);
  },
  // 按币种汇总
  user_getuserawardrecord_pagedlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/integral.user.getuserawardrecord.pagedlist", params, config);
  },
  //收益记录明细
  user_getuserawardrecord_detail_pagedlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/integral.user.getuserawardrecord.detail.pagedlist", params, config);
  },
  // 开启/关闭某个提币地址白名单
  user_withdraw_address_whitelist_edit({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.edit", params, config);
  },

  //理财banner
  finance_product_search({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/finance/product.search", params, config);
  },
  //理财列表
  finance_areas_getlist({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/finance/areas.getlist", params, config);
  },
  //获取理财产品
  finance_product_get({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/finance/product.get", params, config);
  },
  //购买理财产品
  finance_user_product_purchase({commit}, params, config) {
    return this.$axios.post("/userapi/v1.0/finance/user.product.purchase", params, config);
  },
// 获取用户理财交易列表
  async finance_user_order_getlist({commit}, params, config) {
    return await this.$axios.post("/userapi/v1.0/finance/user.order.getlist", params, config);
  },
  async finance_user_assets_getlist({commit}, params, config) {
    return await this.$axios.post("/userapi/v1.0/finance/user.assets.getlist", params, config);
  },

}




