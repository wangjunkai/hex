import * as CryptoJS from 'crypto-js'


function _getkeyv(token) {
  const _key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(token.substring(5, 15)).toString())
  const _iv = CryptoJS.enc.Hex.parse(CryptoJS.MD5(token.split('').reverse().join('').substring(5, 15)).toString())
  return {
    _key, _iv
  }
}

export default {
  encrypt(str, token) {
    let _token = token
    let _str = str
    _token = _token.split('.')[2]
    _str = CryptoJS.enc.Utf8.parse(_str)
    const {_key, _iv} = _getkeyv(_token)
    const aes = CryptoJS.AES.encrypt(_str, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return aes.ciphertext.toString()
  },
  md5String(str) {
    return CryptoJS.MD5(str).toString()
  },
  md5Token(str) {
    return CryptoJS.MD5(CryptoJS.MD5(str).toString()).toString()
  },
  decrypt(str, token) {
    if (!str) return
    const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    token = token.split('.')[2]
    const {_key, _iv} = _getkeyv(token)

    const newdata = CryptoJS.AES.decrypt(str, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    try {
      const _de = newdata.toString(CryptoJS.enc.Utf8).toString()
      return JSON.parse(_de)
    } catch (e) {
      return {}
    }
  }
}
