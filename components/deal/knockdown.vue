<style lang="less" scoped>
  @import "../../static/styles/color";
  
  .knockdown-list {
    float: left;
    width: 280px;
    height: 388px;
    background-color: @cl_content;
    margin: 0 6px 6px 0;
    .knockdown-list_title {
      font-size: 14px;
      color: @cl_8790A1;
      padding-left: 10px;
      border-bottom: 1px solid @cl_292E39;
      > span {
        line-height: 30px;
        font-weight: bold;
      }
    }
    .knockdown-list_content {
      font-size: 12px;
      width: 100%;
      color: @cl_CED3DD;
      line-height: 25px;
      position: relative;
      .header {
        line-height: 30px;
        height: 30px;
        padding: 0 2px;
        display: table;
        width: 100%;
        color: @cl_5E6573;
      }
      .body {
        height: 25px;
        line-height: 25px;
        display: table;
        width: 100%;
        transition: background-color 0.4s cubic-bezier(.645, .045, .355, 1);
      }
      .body.new {
        background-color: @cl_282D37;
      }
      
      .time {
        padding-left: 8px;
      }
      .money {
        padding-right: 16px;
      }
      
      .knockdown-list_content_body {
        overflow-y: auto;
        height: 328px;
        .num.buy {
          color: @cl_buy;
        }
        
        .num.sale {
          color: @cl_sell;
        }
      }
      
      dt span,
      dd span {
        display: table-cell;
        white-space: nowrap;
        z-index: 1;
        position: relative;
      }
      /*      dd:hover {
              background-color: @cl_282D37;
            }*/
      
      dt span.time,
      dd span.time {
        text-align: left;
        width: 20%;
      }
      
      dt span.num,
      dd span.num {
        text-align: right;
        width: 39%;
      }
      
      dt span.money,
      dd span.money {
        text-align: right;
        width: 41%;
      }
    }
  }
</style>
<template>
  <div class="knockdown-list">
    <div class="knockdown-list_title">
      <span @click="setOrderType('new')">{{$t('deal.newargain')}}</span>
    </div>
    <dl class="knockdown-list_content">
      <dt class="header">
        <span class="time">{{$t('deal.time')}}</span>
        <span class="num">{{$t('deal.transactionPrice')}}</span>
        <span class="money">{{$t('deal.count')}}</span>
      </dt>
      <div v-bar
           class="knockdown-list_content_body hex-loading"
           v-hex-loading="loading">
        <div>
          <dd class="body"
              :class="{new:getnewbodyclass(m)}"
              v-for="(m,i) in tradingDetail[orderType]" :key="i">
            <span class="time">{{global_get_local_time(m.ts).format('HH:mm:ss')}}</span>
            <span class="num"
                  :class="{'buy':m.direction==1,'sale':m.direction!=1}">{{global_get_tofixed(m.price,dcs.p)}}</span>
            <span class="money">{{getamount(m.amount)}}</span>
          </dd>
        </div>
      </div>
    </dl>
  </div>
</template>
<script>
  
  export default {
    name: 'articles',
    computed: {},
    props: ['symbleParameString', 'symblefrom', 'symbleto', 'dcs'],
    head() {
      return {
        title: this.title
      }
    },
    data() {
      return {
        //交易明细
        tradingDetail: {
          'new': [],
          'own': []
        },
        orderType: 'new',
        loading: false,
        detailsub: `market.${this.symbleParameString}.detail`,
        sub: `market.${this.symbleParameString}.trade.detail`,
        pagehidden: false,
        title: 'HEX | ' + this.$t('c2c.hexTitle'),
        newmoneytimer: ''
      }
    },
    mounted() {
      //最新成交
      this.getDaily()
      
      //激活页面
      document.addEventListener("visibilitychange", () => {
        this.pagehidden = document.hidden
      })
    },
    created() {
    },
    watch: {
      'orderType': function (val) {
        const url = [
          'quotation_trading_details_get',
        ]
        url.map((item) => {
          this.$socket.cleartimer(this.$socket.url.quotation_trading_details_get)
        })
        
        this.$nextTick(() => {
          this.getDaily()
        })
      }
    },
    /*订阅socket*/
    sockets() {
      let newmoneytimerarray = []
      const self = this
      
      const _fun = (_fund) => {
        /*更新title*/
        this.title = this.global_get_tofixed(_fund.price, this.dcs.p) + ' ' + this.symblefrom + '/' + this.symbleto + ' | hex'
        if (this.pagehidden) {
          document.querySelector('head > title').innerHTML = this.title
        }
        /*发布最新价格*/
        this.$pubsub.publish(this.$pubsub.changeNewMoney, _fund)
        
        this.tradingDetail[this.orderType].unshift(_fund)
        if (this.tradingDetail[this.orderType].length > 100) {
          this.tradingDetail[this.orderType].pop()
        }
      }
      
      function _asycfun() {
        const firstdata = newmoneytimerarray.shift()
        firstdata._new = false
        _fun(firstdata)
        if (newmoneytimerarray.length > 0) {
          _asycfun()
        }
      }
      
      function _socketasycfun() {
        const firstdata = newmoneytimerarray.shift()
        if (self.pagehidden) {
          firstdata._new = false
        }
        _fun(firstdata)
        if (newmoneytimerarray.length > 0) {
          _socketasycfun()
        }
      }
      
      function _tfun() {
        self.newmoneytimer = setTimeout(() => {
          const firstdata = newmoneytimerarray.shift()
          _fun(firstdata)
          if (newmoneytimerarray.length > 0) {
            if (self.pagehidden) {
              _asycfun()
              clearTimeout(self.newmoneytimer)
              self.newmoneytimer = null
            } else {
              _tfun(_fun)
            }
          } else {
            clearTimeout(self.newmoneytimer)
            self.newmoneytimer = null
          }
        }, 0)
      }
      
      return {
        /*订阅的类型*/
        type: this.$socket.type.quotation_trading_details_get,
        receive(data) {
          if (data && data.topic == this.sub) {
            
            if (data.data.length > 0) {
              const _d = data.data[0]
              
              _d.symble = this.symbleParameString
              _d._new = true
              _d._ts = new Date().getTime()
              
              /*发送订阅*/
              newmoneytimerarray.push(_d)
              
              if (!this.newmoneytimer) {
                _socketasycfun()
              }
              
              this.loading = false
            }
          }
        },
        /*订阅轮询*/
        polling: {
          url: this.$socket.url.quotation_trading_details_get,
          callback: this._getDaily
        }
      }
    },
    methods: {
      getnewbodyclass(item) {
        if (item._new) {
          setTimeout(() => {
            item._new = false
          }, 500)
        }
        return item._new
      },
      getamount(a) {
        const amount = this.global_get_tofixed(a, this.dcs.a)
        return amount
      },
      //设置订单类型
      setOrderType(num) {
        this.orderType = num
      },
      _getDaily() {
        const _self = this
        _self.$store.dispatch('getIntervalData', {
          url: _self.$socket.url.quotation_trading_details_get,
          params: {
            symble: _self.symbleParameString,
            pageindex: 1,
            pagesize: 120
          },
          timer: _self.$socket.timer.quotation_trading_details_get,
          callback: ({data}) => {
            if (data) {
              setTimeout(() => {
                this.tradingDetail[this.orderType] = data
              }, 6)
            }
            this.loading = false
          }
        })
      },
      getDaily() {
        /*订阅socket*/
        if (!this.symbleParameString) {
          return
        }
        this.loading = true
        this.$store.dispatch(this.$socket.url.quotation_trading_details_get, {
          symble: this.symbleParameString,
          pageindex: 1,
          pagesize: 120
        })
          .then(({data}) => {
            if (data) {
              this.tradingDetail[this.orderType] = data
              data[0].symble = this.symbleParameString
              /*发布最新价格*/
              this.$pubsub.publish(this.$pubsub.changeNewMoney, data[0]);
            }
            this.loading = false
          })
          .then(() => {
            this.$socket.invoke({
              sub: this.sub,
              type: this.$socket.type.quotation_trading_details_get
            })
          })
      }
    },
    beforeDestroy() {
      clearTimeout(this.newmoneytimer)
    }
  }
</script>
