import http from 'http'
import https from 'https'
import Crypto from "./crypto";
import * as jsCookie from 'js-cookie'

const config = {
  // 自定义的请求头
  headers: {
    'Authorization': '',
    post: {
      'Content-Type': 'application/hex',
    },
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  },
  // 超时设置
  timeout: 1000 * 60,
  data: null,
  // 跨域是否带Token
  withCredentials: false,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json',
  // XSRF 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
}
const baseInfo = {
  'uid': 0,
  'version': '1.0',
  'timestamp': 0,
  'key': '',
  'ip': '127.0.0.1',
  'platform': 'Web',
  'lang': 'zh_cn',
  'deviceid': 'browser'
}

let _ip = ''

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 9084}`
}


export default {
  config,
  async getToken(store) {
    let _token = {}
    //判断是否为服务器token，或者当前页面会话token
    let init_token = store.state.hex_token.value
    if (init_token && init_token.access_token) {
      _token = init_token
    } else {
      store.commit('set_server_token', '')
    }
    if (_token.access_token && (new Date().getTime() < new Date(_token[store.state.hex_timestamp.type]).getTime())) {
      /*客户端 重新写入access_token*/
      if (process.client) {
        const cookie_token = JSON.parse(jsCookie.get(store.state.hex_token.type))
        let isset = false
        if (!cookie_token) {
          isset = true
        } else if (!cookie_token.access_token || !cookie_token.HEX_TIMESTAMP) {
          isset = true
        }
        if (isset) {
          store.commit('set_token', _token)
        }
      }
      return _token
    } else {
      if (process.client) {
        store.commit('remove_token')
        return store.dispatch('token', store.state.tokenParams).then((data) => {
          if (!data.access_token) {
            location.reload()
          }
          store.commit('set_server_token', data)
          store.commit('set_token', data)
          return data
        })
      }
    }
  },
  async getBaseInfo(store) {
    const info = baseInfo
    let _self = this

    info.timestamp = new Date().getTime()
    info.uid = store.state.hex_uid.value
    info.key = store.state.hex_key.value
    if (!process.server) {
      info.ip = window.returnCitySN ? window.returnCitySN["cip"] : store.state.ip
    }

    info.lang = store.state.hex_lang.locale
    return info
  },
  getUserIP(onNewIP) {
    if (_ip) {
      onNewIP(_ip)
    } else {
      const myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      let pc = new myPeerConnection({
          iceServers: []
        }),
        noop = function () {
        },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

      if (!('createDataChannel' in pc)) {
        onNewIP('')
        return
      }

      function iterateIP(ip) {
        if (!localIPs[ip]) {
          _ip = ip
          onNewIP(ip)
        }
        localIPs[ip] = true;
      }

      //create a bogus data channel
      pc.createDataChannel("");
      // create offer and set local description
      pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
      }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
      });

      //listen for candidate events
      pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
  },
  setHeader(store, config) {
    const token = store.state.hex_token.value
    const newConfig = token ? {
      Token: Crypto.md5Token(config.data),
      Authorization: token.token_type + ' ' + token.access_token
    } : {}
    return {
      headers: Object.assign({}, config.headers, newConfig)
    }
  },
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
