import qs from 'qs'
import AxiosConfig from './config'
import Crypto from './crypto'
import init from '../../init'

export default function ({app, store, $axios, redirect}) {
  Object.assign($axios.defaults, AxiosConfig.config)

  $axios.onRequest(config => {
    if (config.url == '/connect/token') {
      if (!init.proxy) {
        config.url = init.auth + config.url
      }
      config.data = qs.stringify(config.data)
      return config
    }

    async function _g() {
      if (!init.proxy) {
        config.url = init.api + config.url
      }

      const [tokens, baseInfo] = await Promise.all([AxiosConfig.getToken(store), AxiosConfig.getBaseInfo(store)]);

      if (config.data) {
        config.data = Object.assign({}, baseInfo, config.data)
      } else {
        config.data = baseInfo
      }
      //console.log('request:' + config.url, config.data)

      //console.log('requestJSON:' + config.url, JSON.stringify(config.data))

      if (config.data) {
        const strData = JSON.stringify(config.data)
        config.data = strData ? Crypto.encrypt(strData, tokens.access_token) : ''
        const {headers} = AxiosConfig.setHeader(store, config)
        config.headers = headers
      }
      return config
    }

    return _g()

  })
  $axios.onResponse(response => {
    async function _new() {
      let _data = response.data,
        newData = null
      if (_data.access_token) {
        return _data
      }
      let tokens = await AxiosConfig.getToken(store)
      if (_data.code == '200') {
        if (_data.data) {
          newData = _data.data
        } else {
          newData = Crypto.decrypt(_data.hexdata, tokens.access_token)
        }
      } else {
        store.commit('set_message', {
          type: 'error',
          text: _data.msg
        })
      }
      _data.data = newData
      //console.log('response:' + response.config.url, _data)
      return _data
    }

    return _new()
  })
  $axios.onError((error) => {
    return {}
  })
}
