export default {
  captcha: null,
  appId: '2034696462',
  init(obj) {
    let _self = this
    return new Promise(function (resolve) {
      if (obj) {
        if (obj.element && obj.options) {
          _self.captcha = new TencentCaptcha(obj.element, _self.appId, function (res) {
              resolve(res)
            },
            obj.options
          )
        } else if (obj.element) {
          _self.captcha = new TencentCaptcha(obj.element, _self.appId, function (res) {
              resolve(res)
            }
          )
        } else {
          _self.captcha = new TencentCaptcha(_self.appId, function (res) {
              resolve(res)
            },
            obj.options
          )
        }
      } else {
        _self.captcha = new TencentCaptcha(_self.appId, function (res) {
            resolve(res)
          }
        )
      }
      _self.captcha.show()
    })
  },
  show(obj) {
    this.captcha && this.captcha.show()
  },
  destroy() {
    this.captcha && this.captcha.destroy()
  },
  getTicket() {
    this.captcha && this.captcha.getTicket()
  }
}











