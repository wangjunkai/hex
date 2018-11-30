import * as pubsub from 'pubsub-js'

function _pubsub() {
  //交易对详情
  this.getSymbleInfo = 1
  //买入卖出量
  this.entrustSaleRate = 2
  this.entrustBuyRate = 3

  //订阅自选
  this.changeCollect = 6
  //订阅交易页面头部自选
  this.changeHeaderCollect = 4
  //更新全屏交易Header自选
  this.changeHeaderSelfCollect = 10

  //订阅最新变动价格
  this.changeNewMoney = 5

  //订单列表
  this.getOrderList = 7

  //最新成交价回调
  this.changeDealState = 8
  /*更新深度图数据*/
  this.changeDepthChart = 9

  //获取腾讯密钥
  this.getTencentImSig = 11

  //重置验证
  this.resetValidate = 12

  this.addAddress = 13

  //deleteapi:删除api  checkedkey:查看key  editip:编辑ip
  this.checkedKey = 14
  this.deleteApi = 15
  this.editIp = 16

}

_pubsub.prototype = pubsub

function install(Vue) {
  const n = new _pubsub()

  Vue.mixin({
    created() {
      /*监听*/
      if (this.$options.subscribe) {
        const methods = this.$options.subscribe.call(this)
        for (const _method in methods) {
          if (typeof methods[_method] == 'function') {
            n.subscribe(n[_method], (sub, res) => {
              methods[_method].call(this, res)
            })
          }
        }
      }
    }
  })

  Vue.prototype.$pubsub = n
  Vue.$pubsub = n
}

export default install
