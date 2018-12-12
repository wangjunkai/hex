<style lang='less'>
  @import "../../static/styles/color";
  
  .detail {
    background-color: @cl_fff;
  }
  
  .detail-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    color: @cl_212;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid @cl_f5f;
    .service {
      color: @cl_289;
      font-weight: 600;
    }
    .service > span {
      margin-left: 20px;
      cursor: pointer;
    }
  }
  
  .detail-content {
    display: flex;
    flex-direction: row;
    width: 1200px;
    margin: auto;
    padding: 30px 0;
    line-height: 1.5;
    .detail-content_socket {
      width: 360px;
      min-width: 360px;
      max-width: 360px;
      max-height: 753px;
    }
    .detail-content_content {
      flex: auto;
      margin-right: 20px;
    }
    .detail-title {
      font-size: 20px;
      font-weight: 600;
      color: @cl_212;
      margin-bottom: 10px;
    }
    .detail-title-price {
      font-size: 14px;
      margin-bottom: 10px;
      .tip {
        color: @cl_646;
        margin-right: 10px;
      }
      .tip_value {
        color: @cl_344;
        font-weight: 600;
      }
    }
    .detail-way-br {
      margin-top: 30px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      line-height: 20px;
      align-items: center;
      .tip {
        font-size: 14px;
        color: @cl_999;
        margin-right: 10px;
      }
      .br {
        height: 1px;
        flex: auto;
        background-color: @cl_f5f;
      }
    }
    .detail-way-cancel {
      margin: 30px 0;
      font-size: 14px;
      color: #999999;
    }
    .detail-way-list {
      margin-bottom: 20px;
      .block.active {
        border: 1px solid @cl_289;
      }
      .block {
        display: inline-block;
        min-width: 120px;
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        margin-right: 10px;
        padding: 0 10px;
        border: 1px solid #DDDDE4;
        font-size: 14px;
        cursor: pointer;
      }
      .block > img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .detail-collection-info {
      padding-left: 76px;
      font-size: 14px;
      margin-bottom: 10px;
      position: relative;
      line-height: 22px;
      min-height: 22px;
      .tip {
        position: absolute;
        left: 0;
        color: @cl_646;
      }
      .tip_value {
        font-weight: 600;
        color: @cl_212;
      }
      .tip_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../static/images/trade/qr_code.svg");
        background-repeat: no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-left: 10px;
        cursor: pointer;
      }
      .bank {
        display: inline-block;
        margin-top: 3px;
      }
    }
    .detail-hr {
      height: 1px;
      background-color: @cl_f5f;
    }
    .detail-remart {
      margin-top: 20px;
      margin-bottom: 30px;
      font-size: 14px;
      color: @cl_212;
      .tip {
        color: @cl_646;
      }
      .tip_value {
        font-weight: 600;
      }
    }
    .detail-pay-info {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 40px;
      .time {
        color: @cl_e96;
      }
      .money {
        color: @cl_289;
      }
    }
    .detail-faq {
      .title {
        font-size: 14px;
        color: @cl_212;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
    .detail-faq-list {
      position: relative;
      padding-left: 25px;
      margin-bottom: 14px;
      font-size: 14px;
      color: @cl_646;
      .tip {
        display: inline-block;
        width: 14px;
        height: 14px;
        position: absolute;
        left: 0;
        top: 4px;
        background-image: url("../../static/images/trade/faq.svg");
        background-size: cover;
      }
      .tip_value {
        margin-bottom: 5px;
        cursor: pointer;
      }
    }
    .detail-faq-list.active {
      .tip {
        background-image: url("../../static/images/trade/faq-active.svg");
      }
      .tip_value {
        color: @cl_289;
      }
    }
    .pay-info-success {
      margin-top: 35px;
      margin-bottom: 40px;
      .detail-pay-info {
        font-size: 16px;
      }
      .pay-success {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;
        background-image: url("../../static/images/trade/accomplish.svg");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .pay-evaluate {
        font-size: 14px;
        color: #646B8C;
        margin-bottom: 30px;
        margin-top: 34px;
      }
    }
    .el-loading-spinner {
      .circular {
        width: 30px;
      }
      .path {
        stroke: @cl_link;
      }
    }
  }
  
  .detail-button {
    display: inline-block;
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: @cl_fff;
    background: @cl_37b_00a;
    font-size: 14px;
    border-radius: 4px;
    margin-bottom: 40px;
    cursor: pointer;
  }
  
  .detail-order-warn {
    width: 360px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    text-align: center;
    color: #333333;
    .icon {
      display: inline-block;
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
    }
    .tip_h1 {
      font-weight: 600;
    }
    .tip_h2 {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    
    .el-dialog__body {
      padding: 15px 20px 30px 20px;
      .detail-button {
        margin: 0;
      }
    }
  }
  
  /*qrcode*/
  .detail-order-qrcode {
    width: 400px;
    .el-dialog__body {
      padding: 0;
      height: 600px;
    }
    .el-dialog__header {
      padding: 0;
    }
  }
  
  .pay-evaluate {
    ul {
      display: inline-block;
      vertical-align: middle;
    }
    .pay-evaluate-tip {
      float: left;
      padding-right: 6px;
      width: 20px;
      height: 14px;
      background-image: url("../../static/images/trade/star.svg");
      background-repeat: no-repeat;
      background-size: 14px;
      vertical-align: middle;
      cursor: pointer;
    }
    .pay-evaluate-tip.active {
      background-image: url("../../static/images/trade/star-active.svg");
    }
  }

</style>
<template>
  <div class="hex-flex">
    <div class="detail hex-flex_auto">
      <div class="detail-content">
        <div class="detail-content_content">
          <hex-detail-buy
            :orderdata="orderdata"
            :overtime="overtime"
            v-if="orderdata.direction==1"></hex-detail-buy>
          <hex-detail-sell
            :overtime="overtime"
            :orderdata="orderdata"
            v-else></hex-detail-sell>
        </div>
        <div class="detail-content_socket">
          <hex-im
            :sign="sign"
            :orderdata="orderdata"></hex-im>
        </div>
      </div>
      <!--申诉订单-->
      <el-dialog
        top="0"
        custom-class="detail-order-warn"
        :visible.sync="userappealstate">
        <div>
          <img class="icon" src="../../static/images/trade/warning.svg" alt="">
          <p class="tip_h2">{{$t('c2c.Appeal')}}</p>
          <span class="detail-button"
                v-loading="userappealloading"
                @click="userappeal">{{$t('c2c.Confirmation')}}</span>
        </div>
      </el-dialog>
      <!--取消订单-->
      <el-dialog
        top="0"
        custom-class="detail-order-warn"
        :visible.sync="usercancelstate">
        <div>
          <img class="icon" src="../../static/images/trade/warning.svg" alt="">
          <p class="tip_h2">{{$t('legalTrad.surecancel')}}</p>
          <span class="detail-button"
                v-loading="usercancelloading"
                @click="usercancel">{{$t('legalTrad.Cancelorder')}}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import tradedetailbuy from '@/components/legal/tradedetailbuy'
  import tradedetailsell from '@/components/legal/tradedetailsell'
  import im from '@/components/public/im'
  import moment from 'moment'
  
  export default {
    name: "trade",
    data() {
      return {
        usercancelstate: false,
        userappealstate: false,
        userevaluatestate: false,
        userappealloading: false,
        usercancelloading: false,
        visibleDetailRows: [],
        sign: '',
        orderdata: {
          payconfiglist: []
        },
        activepay: {},
        getordermodel: {
          orderid: ''
        },
        timer: null,
        overtime: '--'
      }
    },
    components: {
      'hex-detail-buy': tradedetailbuy,
      'hex-detail-sell': tradedetailsell,
      'hex-im': im
    },
    async fetch({store, params}) {
      /*获取腾讯 im sign*/
      if (store.state.hex_uid.value) {
        const tencentim_sign = await store.dispatch('trading_c2c_tencentim_sig_get')
        const _sign = tencentim_sign.data ? tencentim_sign.data : ''
        if (_sign) {
          store.commit('set_server_tencentim_sign', _sign)
        }
      }
    },
    async asyncData({store, params, redirect}) {
      if (!store.state.hex_uid.value) {
        redirect('/login')
        return
      }
      
      const orderpage = await store.dispatch('trading_c2c_order_pagedlist', {orderid: params.id})
      let newdata = {}
      if (orderpage.data && orderpage.data.pagedata.length > 0) {
        newdata = orderpage.data.pagedata[0]
      } else {
        redirect('/trade')
        return
      }
      return {
        orderdata: newdata
      }
    },
    methods: {
      payaffirm() {
      
      },
      getunitprice() {
        // return this.global_get_tofixed(this.orderdata.amount * this.orderdata.price, 8)
        return this.global_get_tofixed(this.orderdata.amount * this.orderdata.price, 2)
      },
      isVisibleDetailRow(rowid) {
        return this.visibleDetailRows.indexOf(rowid) >= 0
      },
      showDetailRow(id) {
        if (!this.isVisibleDetailRow(id)) {
          this.visibleDetailRows = []
          this.visibleDetailRows.push(id)
        } else {
          this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(id), 1);
        }
      },
      getorderdetail() {
        return this.$store.dispatch('trading_c2c_order_pagedlist', {orderid: this.$route.params.id})
          .then(({data}) => {
            if (data && data.pagedata.length > 0) {
              const newdata = data.pagedata[0]
              this.orderdata = newdata
              return true
            } else {
              this.$store.commit('set_message', {type: 'error', text: this.$t('c2c.OrderExist')})
              return false
            }
          })
      },
      /*用户评价*/
      userevaluate(parame) {
        if (this.orderdata.orderstatus == 1) {
          return
        }
        if (this.userevaluatestate) {
          return
        }
        this.userevaluatestate = true
        
        this.$store.dispatch('trading_c2c_order_evaluate', {
          ordercompleteid: this.orderdata.id,
          starleve: parame
        })
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail().then((data) => {
                if (data) {
                  this.userevaluatestate = false
                  this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Comment')})
                }
              })
            } else {
              this.userevaluatestate = false
            }
          })
      },
      /*用户订单申诉*/
      changeappealstate() {
        this.userappealstate = !this.userappealstate
      },
      /*取消订单*/
      changeusercancel() {
        this.usercancelstate = !this.usercancelstate
      },
      /*用户取消订单*/
      usercancel() {
        if (this.usercancelloading) {
          return
        }
        this.usercancelloading = true
        this.$store.dispatch('trading_c2c_order_cancel', {ordercompleteid: this.orderdata.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail().then((data) => {
                if (data) {
                  
                  this.$pubsub.publish(this.$pubsub.sendImMessage, {
                    ext: '2'
                  })
                  
                  this.usercancelstate = false
                  this.usercancelloading = false
                  this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Successfully')})
                }
              })
            } else {
              this.usercancelloading = false
            }
          })
      },
      /*订单申诉*/
      userappeal() {
        if (this.userappealloading) {
          return
        }
        this.userappealloading = true
        this.$store.dispatch('trading_c2c_order_appeal', {ordercompleteid: this.orderdata.id})
          .then((res) => {
            if (res.code == '200') {
              this.getorderdetail().then((data) => {
                if (data) {
                  
                  this.$pubsub.publish(this.$pubsub.sendImMessage, {
                    ext: '6'
                  })
                  
                  this.userappealstate = false
                  this.userappealloading = false
                  this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Submitted')})
                }
              })
            } else {
              this.userappealloading = false
            }
          })
      },
      setovertime() {
        const _self = this
        const to = this.global_get_local_time(this.orderdata.overtime)
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.timer = setInterval(() => {
          const from = this.global_get_local_time(new Date())
          const intervaltime = moment.duration(to - from)
          if (intervaltime._milliseconds < 0) {
            clearInterval(this.timer)
            this.timer = null
            this.overtime = '--'
            setTimeout(() => {
              this.$pubsub.publish(this.$pubsub.sendImMessage, {
                ext: '3'
              })
              _self.getorderdetail()
            }, 3000)
          } else {
            let val = `${intervaltime._data.hours}小时${intervaltime._data.minutes}分钟${intervaltime._data.seconds}秒`
            this.overtime = val
          }
        }, 1000)
      }
    },
    beforeRouteEnter(to, from, next) {
      if (!to.params.id) {
        next('trade')
      } else {
        next((vm) => {
          if (!vm.$userinfo.uid) {
            vm.$router.push('/login')
          }
        })
      }
    },
    
    mounted() {
      if (this.orderdata.orderstatus == 0) {
        this.setovertime()
      }
    }
  };

</script>

