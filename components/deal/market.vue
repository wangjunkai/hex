<template>
  <div class="exchange-block_content clearfix">
    <div class="exchange-block_content_left left">
      <p class="exchange-block_tip clearfix">
        <span class="left">{{$t('deal.usable')}}<span
          class="num">{{global_get_tofixed(tradingDealTo.canuseamount,global_get_decimal(symbleto).a)}} {{symbleto}}</span></span>
        <nuxt-link v-if="$userinfo.uid" to="/person/wallet" class="exchange-block_recharge" tag="span">
          {{$t('wallet.recharge')}}
        </nuxt-link>
        <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{$t('home.headLogin')}}</nuxt-link>
      </p>
      <div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{$t('deal.buyinRate')}}</span>
          <span class="after">{{symbleto}}</span>
          <p class="market_tip">
            {{$t('deal.markeSell')}}
          </p>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{$t('deal.count')}}</span>
          <span class="after">{{symbleto}}</span>
          <hex-number
            :fix="getfix"
            :num.sync="marketEntrustBuyNum"
            @number:focus="showBuyFocus"
            @number:blur="showBuyFocus"
            class='ipt_hover'></hex-number>
          <span
            v-show="mostBuyPurchases"
            class="exchange-block_owner_tip">≈ <span class="num">{{buynum}} {{symblefrom}}</span></span>
        </div>
        <hex-slider
          :dec="getbuydec"
          @slider:change="getMarketEntrustBuyNum"></hex-slider>
      </div>
      <p class="exchange-block_tip tip_exchange"></p>
      <div class="exchange-block_button_buy"
           v-loading="marketBuyState"
           @click="marketBuyDeal"
           v-if="$userinfo.uid"
           :class="{'exchange-block_button--unavailable':marketBuyState}">
        {{$t('memberCenter.buy')}} {{symblefrom}}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{$t("home.headLogin")}}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{$t('home.headRegister')}}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <p class="exchange-block_tip clearfix">
        <span class="left">{{$t("deal.usable")}}<span
          class="num">{{global_get_tofixed(tradingDealFrom.canuseamount,global_get_decimal(symblefrom).a)}} {{symblefrom}}</span></span>
        <nuxt-link v-if="$userinfo.uid" to="/person/wallet" class="exchange-block_recharge" tag="span">
          {{$t('wallet.recharge')}}
        </nuxt-link>
        <nuxt-link v-else to="/login" class="exchange-block_recharge" tag="span">{{$t('home.headLogin')}}</nuxt-link>
      </p>
      <div>
        <div class="exchange-block_input">
          <span class="before">{{$t('deal.sellOutPrice')}}</span>
          <span class="after">{{symbleto}}</span>
          <p class="market_tip">
            {{$t('deal.markebuy')}}
          </p></div>
        <div class="exchange-block_input">
          <span class="before">{{$t('deal.sellQuantity')}}</span>
          <span class="after">{{symblefrom}}</span>
          <hex-number
            :fix="dcs.a"
            @number:focus="showSaleFocus"
            @number:blur="showSaleFocus"
            :num.sync="marketEntrustSaleNum"
            class='ipt_hover'></hex-number>
          <span
            v-show="mostSaleAvailable"
            class="exchange-block_owner_tip">≈ <span
            class="num">{{sellnum}} {{symbleto}}</span></span>
        </div>
        <hex-slider
          :dec="getsaledec"
          @slider:change="getMarketEntrustSaleNum"></hex-slider>
      </div>
      <p class="exchange-block_tip tip_exchange"></p>
      <div class="exchange-block_button_sale"
           v-loading="marketSaleState"
           @click="marketSaleDeal"
           v-if="$userinfo.uid"
           :class="{'exchange-block_button--unavailable':marketSaleState}">
        {{$t('deal.sellOut')}} {{symblefrom}}
      </div>
      <div class="exchange-block_button_sale no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{$t("home.headLogin")}}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{$t('home.headRegister')}}</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
  import hexNumber from '@/components/public/number'
  import slider from '@/components/public/slider'
  
  export default {
    name: 'articles',
    components: {
      'hex-number': hexNumber,
      'hex-slider': slider
    },
    computed: {
      getfix() {
        const to = this.symbleto.toLowerCase()
        let fix = this.dcs.a
        if (to == 'btc') {
          fix = 8
        } else if (to == 'usdt') {
          fix = 2
        } else if (to == 'eth') {
          fix = 6
        }
        return fix
      },
      buynum() {
        const num = this.$store.getters.get_to_from_exchange_rate(this.marketEntrustBuyNum, this.dailyDetail.c)
        return this.global_get_tofixed(num, this.dcs.a)
      },
      sellnum() {
        const num = this.$store.getters.get_from_to_exchange_rate(this.marketEntrustSaleNum, this.dailyDetail.c)
        return this.global_get_tofixed(num, this.global_get_decimal(this.symbleto).a)
      },
      getbuydec() {
        if (!this.tradingDealTo.canuseamount) {
          return 0
        }
        return (this.marketEntrustBuyNum / this.tradingDealTo.canuseamount) * 100
      },
      getsaledec() {
        if (!this.tradingDealFrom.canuseamount) {
          return 0
        }
        return (this.marketEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100
      }
    },
    props: {
      dcs: {
        type: Object,
        default: function () {
          return {}
        }
      },
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      tradingDealFrom: {
        type: Object,
        default: function () {
          return {
            canuseamount: 0
          }
        }
      },
      tradingDealTo: {
        type: Object,
        default: function () {
          return {
            canuseamount: 0
          }
        }
      },
      symblefrom: '',
      symbleto: ''
    },
    data() {
      return {
        mostBuyPurchases: false,
        mostSaleAvailable: false,
        marketBuyState: false,
        marketSaleState: false,
        //设置市价买入卖出量
        marketEntrustBuyNum: '',
        marketEntrustSaleNum: '',
        
        //订单数据模型
        dealModel: {
          ctid: '',
          ordertype: 2,
          direction: 1,
          price: 0,
          amount: 0,
          paypassword: '',
          ordersource: 1
        }
      }
    },
    subscribe() {
      return {
        //订阅下单状态
        changeDealState() {
          this.marketBuyState = false
          this.marketSaleState = false
        }
      }
    },
    mounted() {
    },
    methods: {
      showBuyFocus() {
        this.mostBuyPurchases = !this.mostBuyPurchases
      },
      
      showSaleFocus() {
        this.mostSaleAvailable = !this.mostSaleAvailable
      },
      //设置市价交易买入量
      getMarketEntrustBuyNum(num) {
        const n = this.$np.times(this.tradingDealTo.canuseamount, num)
        this.marketEntrustBuyNum = this.global_get_tofixed(n, this.getfix)
      },
      //设置市价交易卖出量
      getMarketEntrustSaleNum(num) {
        const n = this.$np.times(this.tradingDealFrom.canuseamount, num)
        this.marketEntrustSaleNum = this.global_get_tofixed(n, this.dcs.a)
      },
      //市价交易买入卖出
      marketBuyDeal() {
        if (this.marketBuyState) return
        this.marketBuyState = true
        const dealModel = Object.assign({}, this.dealModel)
        dealModel.amount = Number(this.marketEntrustBuyNum)
        dealModel.ctid = this.dailyDetail.ctid
        if (Number(dealModel.amount) <= 0) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.countLzero')})
          this.marketBuyState = false
          return
        }
        if (Number(this.marketEntrustBuyNum) > Number(this.tradingDealTo.canuseamount)) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.buyLusable')})
          this.marketBuyState = false
          return
        }
        
        this.$store.dispatch('trading_order_create', dealModel)
          .then((res) => {
            if (res.data) {
              /*发布订阅*/
              this.$pubsub.publish(this.$pubsub.getOrderList)
              this.$store.commit('set_message', {type: 'ok', text: res.msg})
            }
          })
          .then(() => {
            this.marketBuyState = false
          })
          .catch(() => {
            this.marketBuyState = false
          })
      },
      marketSaleDeal() {
        if (this.marketSaleState) return
        this.marketSaleState = true
        const dealModel = Object.assign({}, this.dealModel)
        dealModel.amount = Number(this.marketEntrustSaleNum)
        dealModel.ctid = this.dailyDetail.ctid
        dealModel.direction = -1
        if (Number(dealModel.amount) <= 0) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.countLzero')})
          this.marketSaleState = false
          return
        }
        if (Number(this.marketEntrustSaleNum) > Number(this.tradingDealFrom.canuseamount)) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.sellCount')})
          this.marketSaleState = false
          return
        }
        
        this.$store.dispatch('trading_order_create', dealModel)
          .then((res) => {
            if (res.data) {
              /*下单实时更新用户资产和委托订单*/
              this.$pubsub.publish(this.$pubsub.getOrderList)
              this.$store.commit('set_message', {type: 'ok', text: res.msg})
            }
          })
          .then(() => {
            this.marketSaleState = false
          })
          .catch(() => {
            this.marketSaleState = false
          })
      }
    }
  }
</script>
