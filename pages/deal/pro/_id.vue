<style lang='less'>
  
  @import "../../../static/styles/color";
  
  .money-exchange-content {
    @import "../exchangeblock";
  }
  
  .money-exchange-content.exchange-full {
    overflow: hidden;
    height: 100%;
    .left-list,
    .right-list {
      float: left;
      width: 278px;
      height: 100%;
    }
    .left-list {
      margin-right: 4px;
    }
    background-color: @cl_global;
    .exchange-block {
      background-color: @cl_content;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .money-exchange {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 4px 0 0 4px;
      .content {
        position: relative;
        overflow: hidden;
        width: 100%;
      }
      .content:after {
        content: '';
        display: block;
        clear: both;
      }
      .chart-block {
        background-color: @cl_content;
        margin-bottom: 6px;
        height: 100%;
        width: 100%;
      }
    }
    .exchange-full-active {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-height: 0;
    }
    .exchange-full-bottom {
      display: flex;
      flex-direction: row;
      height: 300px;
      max-height: 300px;
    }
    .exchange-full-left {
      flex: 1;
      overflow: hidden;
      margin-right: 4px;
      margin-bottom: 4px;
    }
    .exchange-full-right {
      width: 560px;
      margin-right: 4px;
      margin-bottom: 4px;
      overflow: hidden;
    }
    .entrust-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .knockdown-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .knockdown-list_content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        .knockdown-list_content_body {
          flex: 1;
        }
      }
    }
    .hex-chart {
      display: flex;
      flex-direction: column;
      .chart-content {
        flex: 1;
        .hex-chart-content {
          height: 100%;
        }
      }
    }
    .exchange-record {
      height: 100%;
      display: flex;
      flex-direction: column;
      .traded {
        overflow: hidden;
        flex: 1;
      }
      .traded-block {
        display: flex;
        flex-direction: column;
        height: 100%;
        .anonymous {
          overflow: hidden;
          min-height: initial;
          padding-top: 0;
          display: inline-block;
          /*top: 40%;*/
          position: relative;
          transform: translateY(-50%);
        }
        .islogin {
          line-height: 200px;
        }
        .hex_table {
          flex: 1;
        }
      }
      .traded_table_content {
        overflow: hidden;
      }
    }
  }
</style>
<template>
  <div class="hex-flex">
    <hex-deal-header :dcs="dcs"
                     :symbleParameArray="symbleParameArray"
                     :symblefrom="symblefrom"
                     :symbleto="symbleto"
                     :dailyDetail="dailyDetail"/>
    <div class="money-exchange-content exchange-full hex-flex_auto">
      <div class="money-exchange">
        <div class="exchange-full-active">
          <div class="exchange-full-left">
            <div class="chart-block">
              <!-- TradingView Widget BEGIN -->
              <no-ssr>
                <hex-chart
                  :ispro="true"
                  :symbleParameString="symbleParameString"
                  :from="symblefrom"
                  :to="symbleto"></hex-chart>
              </no-ssr>
              <!-- TradingView Widget END -->
            </div>
          </div>
          <div class="exchange-full-right">
            <div class="left-list">
              <!--委托列表start-->
              <hex-entrust
                :dcs="dcs"
                @entrust:getEntrustRate="getEntrustRate"
                :symbleParameString="symbleParameString"
                :symblefrom="symblefrom"
                :symbleto="symbleto"
                :dailyDetail="dailyDetail"></hex-entrust>
              <!--委托列表end-->
            </div>
            
            <div class="right-list">
              <!--币种列表end-->
              <!--最新成交start-->
              <hex-knockdown
                :dcs="dcs"
                :symblefrom="symblefrom"
                :symbleto="symbleto"
                :symbleParameString="symbleParameString"></hex-knockdown>
              <!--最新成交end-->
            </div>
          </div>
        </div>
        <div class="exchange-full-bottom">
          <div class="exchange-full-left">
            <!--用户订单列表start-->
            <hex-order
              :ordersymble="ordersymble"
              :symbleParameString="symbleParameString"
              :dailyDetail="dailyDetail"></hex-order>
            <!--用户订单列表end-->
          </div>
          <div class="exchange-full-right">
            <!--交易模块-->
            <div class="exchange-block">
              <div class="exchange-block_nav">
                <span :class="{'active':orderType==1}" @click="setOrderType(1)">{{$t('deal.limitedDeal')}}</span>
                <span :class="{'active':orderType==2}" @click="setOrderType(2)">{{$t('deal.marketDeal')}}</span>
              </div>
              <!--限价交易start-->
              <hex-limit
                v-if="orderType==1"
                :dcs='dcs'
                :symbleParameArray="symbleParameArray"
                :symblefrom="symblefrom"
                :symbleto="symbleto"
                :tradingDealTo="tradingDealTo"
                :tradingDealFrom="tradingDealFrom"
                :dailyDetail="dailyDetail"
                :entrustSaleRate="entrustSaleRate"
                :entrustBuyRate="entrustBuyRate"
                :entrustSaleNum="entrustSaleNum"
                :entrustBuyNum="entrustBuyNum"></hex-limit>
              <!--限价交易end-->
              
              <!--市价交易start-->
              <hex-market
                v-else
                :dcs='dcs'
                :symblefrom="symblefrom"
                :symbleto="symbleto"
                :tradingDealTo="tradingDealTo"
                :tradingDealFrom="tradingDealFrom"
                :dailyDetail="dailyDetail"
                :entrustSaleRate="entrustSaleRate"
                :entrustBuyRate="entrustBuyRate"></hex-market>
              <!--市价交易end-->
            </div>
            <!--交易模块end-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import chart from '@/components/deal/chart'
  import limit from '@/components/deal/limit'
  import market from '@/components/deal/market'
  import orderList from '@/components/deal/order-list-full'
  import entrust from '@/components/deal/entrust'
  import knockdown from '@/components/deal/knockdown'
  import newMoney from '@/components/deal/new-money'
  import coinList from '@/components/deal/coin-list'
  import coin from '@/components/public/coin'
  import provider from '@/components/deal/js/chart-provider.js'
  import dealHeader from '@/components/public/deal-header'
  
  export default {
    name: 'Home',
    layout: 'full-default',
    components: {
      'hex-chart': chart,
      'hex-limit': limit,
      'hex-market': market,
      'hex-order': orderList,
      'hex-entrust': entrust,
      'hex-knockdown': knockdown,
      'hex-new-money': newMoney,
      'hex-coin': coin,
      'hex-coinlist': coinList,
      'hex-deal-header': dealHeader
    },
    computed: {
      ordersymble: function () {
        if (!this.$route.params.id) return '';
        return this.$route.params.id.replace('_', '/');
      },
      symbleParameArray: function () {
        if (!this.$route.params.id) return null
        const ary = this.$route.params.id.split('_')
        return ary.length != 2 ? null : ary
      },
      symbleParameString: function () {
        if (!this.$route.params.id) return ''
        return this.$route.params.id.replace('_', '')
      },
      //获取产品
      symblefrom: function () {
        return this.symbleParameArray ? this.symbleParameArray[0].toUpperCase() : '--'
      },
      //获取货币
      symbleto: function () {
        return this.symbleParameArray ? this.symbleParameArray[1].toUpperCase() : '--'
      },
      sub: function () {
        return `market.${this.symbleParameString}.detail`
      }
    },
    data() {
      return {
        /*卸载轮询订阅*/
        sockettimer: [
          this.$socket.url.quotation_marketing_depth_get,
          this.$socket.url.quotation_daily_getall,
          this.$socket.url.quotation_trading_details_get,
          this.$socket.url.quotation_daily_get,
          this.$socket.url.quotation_kline_get,
          this.$socket.url.trading_order_search
        ],
        /*卸载socket订阅*/
        sockettype: [
          this.$socket.type.quotation_marketing_depth_get,
          this.$socket.type.quotation_daily_getall,
          this.$socket.type.quotation_trading_details_get,
          this.$socket.type.quotation_daily_get,
          this.$socket.type.quotation_kline_get
        ],
        dcs: {},
        background: false,
        orderType: 1,
        titleCurrency: [],
        currencyMore: [],
        activeStatus: '-1',
        noDataText: false,
        searchtitle: false,
        moreStatus: false,
        storeCion: "",//币种
        searchStr: '',
        //获取用户交易对信息
        tradingDealTo: {
          canuseamount: 0
        },
        tradingDealFrom: {
          canuseamount: 0
        },
        //设置买入卖出价
        entrustBuyRate: '',
        entrustSaleRate: '',
        entrustBuyNum: '',
        entrustSaleNum: '',
        dailyDetail: {},
        title: '',
      }
    },
    head() {
      return {
        title: this.title,
        meta: []
      }
    },
    watch: {
      'dailyDetail': function (val) {
        this.title = this.global_get_tofixed(val.c, this.global_get_decimal(this.symbleParameString).p) + ' ' + this.global_get_uppercase(val.symble) + ' | hex'
      }
    },
    async asyncData({store, params, redirect}) {
      const symble = params.id.replace('_', '')
      
      const daily = await store.dispatch('quotation_daily_get', {symble: symble})
      if (daily.code == 0) {
        redirect('/')
      }
      return {
        dailyDetail: daily.data
      }
    },
    sockets() {
      return {
        /*订阅的类型*/
        type: this.$socket.type.quotation_daily_get,
        receive(res) {
          if (res && res.topic == this.sub) {
            res.data && delete res.data.self
            Object.assign(this.dailyDetail, res.data)
          }
        },
        polling: {
          url: this.$socket.url.quotation_daily_get,
          callback: this._getDaily
        }
      }
      
    },
    methods: {
      //交易数据接口(用户交易对信息)
      getSymbleInfo() {
        if (this.$userinfo.uid && this.symbleParameString) {
          this.$store.dispatch('user_assets_get', {assetstype: 1, symble: this.symbleParameString}).then(({data}) => {
            if (data) {
              data.map((item) => {
                if (item.currency.currencyname.toLowerCase() == this.symblefrom.toLowerCase()) {
                  this.tradingDealFrom = item
                } else {
                  this.tradingDealTo = item
                }
              })
              /*更新交易状态*/
              this.$pubsub.publish(this.$pubsub.changeDealState)
            }
          })
        }
      },
      
      changeCoinTitleTab(coin) {
        if (this.coinTitleActive == coin) {
          this.coinTitleActive = ''
        } else {
          this.coinTitleActive = coin;
        }
      },
      searchCoin() {
      },
      limitPrice: function (c, o) {
        let limit_price = Number((((c - o) / o) * 100).toFixed(4));
        return isNaN(limit_price) ? 0 : limit_price;
      },
      //设置买入价卖出价
      getEntrustRate(m) {
        this.entrustBuyRate = m.p
        this.entrustSaleRate = m.p
        this.entrustBuyNum = this.global_get_tofixed(m.alltotal, this.dcs.a)
        this.entrustSaleNum = this.global_get_tofixed(m.alltotal, this.dcs.a)
      },
      //设置订单类型
      setOrderType(num) {
        this.orderType = num
      },
      //获取交易对行情
      _getDaily() {
        const _self = this
        _self.$store.dispatch('getIntervalData', {
          url: this.$socket.url.quotation_daily_get,
          params: {symble: this.symbleParameString},
          timer: this.$socket.timer.quotation_daily_get,
          callback: ({data}) => {
            if (data) {
              this.dailyDetail = data
            }
          }
        })
      },
      getDaily() {
        if (!this.symbleParameArray) {
          return
        }
        this.$store.dispatch(this.$socket.url.quotation_daily_get, {symble: this.symbleParameString})
          .then(({data}) => {
            if (data) {
              this.dailyDetail = data
            }
          })
          .then(() => {
            this.$socket.invoke({
              sub: this.sub,
              type: this.$socket.type.quotation_daily_get,
            })
          })
      },
      cleartimer() {
        this.$socket.cleartimer(this.sockettimer)
        for (let item in provider.timer) {
          provider.timer[item] = -1
        }
      }
    },
    /*订阅相关消息*/
    subscribe() {
      return {
        /*获取用户交易对信息*/
        getSymbleInfo() {
          this.getSymbleInfo()
        },
        /*更新交易卖出买入量*/
        entrustSaleRate(v) {
          if (v) {
            this.entrustSaleRate = v
          }
        },
        entrustBuyRate(v) {
          if (v) {
            this.entrustBuyRate = v
          }
        }
      }
    },
    created() {
      //获取小数位数
      this.dcs = this.global_get_decimal(this.ordersymble)
    },
    mounted() {
      this.global_init_meiqia(false)
      
      //交易数据接口(用户交易对信息)
      this.getSymbleInfo()
      //24小时行情
      this.getDaily()
    },
    beforeDestroy() {
      this.cleartimer()
      this.global_init_meiqia(true)
      this.$socket.uninvoke(this.sockettype)
    }
  }
</script>
<style scoped lang="less">

</style>


