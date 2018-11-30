<style lang='less'>
  
  @import "../../static/styles/color";
  
  .money-exchange-content {
    background-color: @cl_global;
    .left-list,
    .center-list,
    .right-list {
      float: left;
    }
    .left-list {
      width: 280px;
      height: 782px;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .center-list {
      margin-right: 6px;
      margin-bottom: 6px;
    }
    .right-list {
      margin-bottom: 6px;
      width: 280px;
      height: 782px;
    }
    
    .money-exchange {
      width: 1200px;
      min-width: 1200px;
      margin: auto;
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
        height: 482px;
        width: 628px;
        background-color: @cl_content;
        overflow: hidden;
        margin-bottom: 6px;
      }
    }
    
    @import "./exchangeblock";
  }
</style>
<template>
  <div class="hex-flex">
    <div class="money-exchange-content hex-flex_auto">
      <div class="money-exchange">
        <!--24小时行情start-->
        <hex-new-money
          :dcs="dcs"
          :symbleParameArray="symbleParameArray"
          :symblefrom="symblefrom"
          :symbleto="symbleto"
          :symbleParameString="symbleParameString"
          :dailyDetail="dailyDetail"></hex-new-money>
        <!--24小时行情end-->
        <div class="content">
          
          <div class="left-list">
            <!--币种列表-->
            <hex-coinlist
              :dailyDetail="dailyDetail"
              :symbleto="symbleto">
            </hex-coinlist>
            <!--币种列表end-->
            <!--最新成交start-->
            <hex-knockdown
              :dcs="dcs"
              :symblefrom="symblefrom"
              :symbleto="symbleto"
              :symbleParameString="symbleParameString"></hex-knockdown>
            <!--最新成交end-->
          </div>
          
          <!--中间交易模块-->
          <div class="center-list">
            <div class="chart-block">
              <!-- TradingView Widget BEGIN -->
              <no-ssr>
                <hex-chart
                  :symbleParameString="symbleParameString"
                  :from="symblefrom"
                  :to="symbleto"></hex-chart>
              </no-ssr>
              <!-- TradingView Widget END -->
            </div>
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
          </div>
          <!--中间交易模块-->
          
          <div class="right-list">
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
        
        </div>
        <!--用户订单列表start-->
        <hex-order
          :symbleto="symbleto"
          :ordersymble="ordersymble"
          :symbleParameString="symbleParameString"
          :dailyDetail="dailyDetail"></hex-order>
        <!--用户订单列表end-->
      </div>
    </div>
  </div>
</template>
<script>
  import chart from '@/components/deal/chart'
  import limit from '@/components/deal/limit'
  import market from '@/components/deal/market'
  import orderList from '@/components/deal/order-list'
  import entrust from '@/components/deal/entrust'
  import knockdown from '@/components/deal/knockdown'
  import newMoney from '@/components/deal/new-money'
  import coinList from '@/components/deal/coin-list'
  import coin from '@/components/public/coin'
  import provider from '@/components/deal/js/chart-provider.js'
  
  export default {
    name: 'Home',
    components: {
      'hex-chart': chart,
      'hex-limit': limit,
      'hex-market': market,
      'hex-order': orderList,
      'hex-entrust': entrust,
      'hex-knockdown': knockdown,
      'hex-new-money': newMoney,
      'hex-coin': coin,
      'hex-coinlist': coinList
    },
    computed: {
      symbleParameArray: function () {
        if (!this.$route.params.id) return null
        const ary = this.$route.params.id.split('_')
        return ary.length != 2 ? null : ary
      },
      ordersymble: function () {
        if (!this.$route.params.id) return '';
        return this.$route.params.id.replace('_', '/');
      },
      symbleParameString: function () {
        if (!this.$route.params.id) return '';
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
        title: ''
      }
    },
    async asyncData({store, params, redirect}) {
      if (!params.id) {
        return {}
      }
      const symble = params.id.replace('_', '')
      
      const daily = await store.dispatch('quotation_daily_get', {symble: symble})
      if (daily.code == 0) {
        redirect('/')
      }
      return {
        dailyDetail: daily.data
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
              //更新用户资产
              this.global_refresh_user_assets()
              
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
        this.entrustBuyRate = this.global_get_tofixed(m.p, this.dcs.p)
        this.entrustSaleRate = this.global_get_tofixed(m.p, this.dcs.p)
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
        if (!this.symbleParameString) {
          return
        }
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
        if (!this.symbleParameString) {
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
              type: this.$socket.type.quotation_daily_get
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
    /*订阅socket相关*/
    sockets() {
      return {
        /*订阅的类型*/
        type: this.$socket.type.quotation_daily_get,
        /*订阅*/
        receive(res) {
          if (res && res.topic == this.sub) {
            setTimeout(() => {
              res.data && delete res.data.self
              Object.assign(this.dailyDetail, res.data)
            }, 6)
          }
        },
        /*重新订阅*/
        reinvoke() {
          this.cleartimer()
        },
        /*触发轮询*/
        polling: {
          url: this.$socket.url.quotation_daily_get,
          callback: this._getDaily
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


