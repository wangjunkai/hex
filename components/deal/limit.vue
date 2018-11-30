<template>
  <div class="exchange-block_content clearfix">
    <div class="exchange-block_content_left left">
      <p class="exchange-block_tip clearfix">
        <span class="left">{{$t('deal.usable')}}<span
          class="num">{{global_get_tofixed(tradingDealTo.canuseamount,global_get_decimal(symbleto).a)}} {{symbleto}}</span></span>
        <span class="exchange-block_recharge"
              @click="toRecharge(tradingDealTo)"
              v-if="$userinfo.uid">
          {{$t('wallet.recharge')}}
        </span>
        <nuxt-link v-else
                   to="/login"
                   class="exchange-block_recharge"
                   tag="span">{{$t("home.headLogin")}}
        </nuxt-link>
      </p>
      <div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{$t("deal.buyinRate")}}</span>
          <span class="after">{{symbleto}}</span>
          <hex-number
            :fix="dcs.p"
            @number:focus="showBuyPriceFocus"
            @number:blur="showBuyPriceFocus"
            :num.sync="copeEntrustBuyRate"
            class='ipt_hover'></hex-number>
          <span
            v-show="mostBuyPricePurchases"
            class="exchange-block_owner_tip">
            <span class="num">
              ≈<span>{{getBuyClientRate}}</span>
              <span class="tip"> {{$store.getters.get_client_exchange_rate_name.name}}</span>
            </span>
          </span>
        </div>
        <div class="exchange-block_input  ipt_hover">
          <span class="before">{{$t("deal.purchases")}}</span>
          <span class="after">{{symblefrom}}</span>
          <hex-number
            :fix="dcs.a"
            :num.sync="copeEntrustBuyNum"
            @number:focus="showBuyFocus"
            @number:blur="showBuyFocus"
            class='ipt_hover'></hex-number>
          <span
            v-show="mostBuyPurchases"
            class="exchange-block_owner_tip">{{$t("deal.mostPurchases")}}：<span
            class="num">{{global_get_tofixed(buyable,dcs.a)}} {{symblefrom}}</span></span>
        </div>
        <hex-slider
          :dec="getbuydec"
          @slider:change="getEntrustBuyNum"></hex-slider>
      </div>
      <p
        class="exchange-block_tip tip_exchange">
        <span class="tip">{{$t("deal.turnover")}}</span>
        <span class="num">{{getBuyAmount}} {{symbleto}}</span>
      </p>
      <div class="exchange-block_button_buy"
           v-loading="buyState"
           v-if="$userinfo.uid"
           @click="buyDeal"
           :class="{'exchange-block_button--unavailable':(buyState)}">{{$t("memberCenter.buy")}} {{symblefrom}}
      </div>
      <div class="exchange-block_button_buy no_login" v-else>
        <nuxt-link to="/login" tag="span" class="repeal">{{$t("home.headLogin")}}</nuxt-link>
        /
        <nuxt-link to="/register" tag="span" class="repeal">{{$t("home.headRegister")}}</nuxt-link>
      </div>
    </div>
    <div class="exchange-block_content_right right">
      <p class="exchange-block_tip clearfix">
        <span class="left">{{$t('deal.usable')}}<span
          class="num">{{global_get_tofixed(tradingDealFrom.canuseamount,global_get_decimal(symblefrom).a)}} {{symblefrom}}</span></span>
        <span class="exchange-block_recharge"
              @click="toRecharge(tradingDealFrom)"
              v-if="$userinfo.uid">
          {{$t('wallet.recharge')}}
        </span>
        <nuxt-link v-else
                   to="/login"
                   class="exchange-block_recharge"
                   tag="span">{{$t('home.headLogin')}}
        </nuxt-link>
      </p>
      <div>
        <div class="exchange-block_input">
          <span class="before">{{$t('deal.sellOutPrice')}}</span>
          <span class="after">{{symbleto}}</span>
          <hex-number
            :fix="dcs.p"
            @number:focus="showSalePriceFocus"
            @number:blur="showSalePriceFocus"
            :num.sync="copeEntrustSaleRate" class='ipt_hover'></hex-number>
          <span
            v-show="mostSalePricePurchases"
            class="exchange-block_owner_tip">
            <span class="num">
              ≈<span>{{getSaleClientRate}}</span>
              <span class="tip"> {{$store.getters.get_client_exchange_rate_name.name}}</span>
            </span>
          </span>
        </div>
        <div class="exchange-block_input">
          <span class="before">{{$t('deal.sellQuantity')}}</span>
          <span class="after">{{symblefrom}}</span>
          <hex-number
            :fix="dcs.a"
            :num.sync="copeEntrustSaleNum"
            @number:focus="showSaleFocus"
            @number:blur="showSaleFocus"
            class='ipt_hover'></hex-number>
          <span
            v-show="mostSaleAvailable"
            class="exchange-block_owner_tip">{{$t('deal.mostAvailable')}}：
            <span
              class="num">{{global_get_tofixed(buyAvailable,global_get_decimal(symbleto).a)}} {{symbleto}}</span></span>
        </div>
        <hex-slider
          :dec="getsaledec"
          @slider:change="getEntrustSaleNum"></hex-slider>
      </div>
      <p class="exchange-block_tip tip_exchange">
        <span class="tip"> {{$t('deal.turnover')}}</span>
        <span class="num">{{getSaleAmount}} {{symbleto}}</span>
      </p>
      <div class="exchange-block_button_sale"
           v-loading="saleState"
           @click="saleDeal"
           v-if="$userinfo.uid"
           :class="{'exchange-block_button--unavailable':(saleState)}">
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
  import number from '@/components/public/number'
  import slider from '@/components/public/slider'
  
  export default {
    name: 'articles',
    components: {
      'hex-number': number,
      'hex-slider': slider,
    },
    computed: {
      getbuydec() {
        if (!this.buyable) {
          return 0
        }
        return (this.copeEntrustBuyNum / this.buyable) * 100
      },
      getsaledec() {
        if (!this.tradingDealFrom.canuseamount) {
          return 0
        }
        return (this.copeEntrustSaleNum / this.tradingDealFrom.canuseamount) * 100
      },
      /*根据最新价计算买入价的小数位数*/
      getnumfix() {
        const ratefix = 1 / parseFloat(this.dailyDetail.c)
        let fix
        if (ratefix >= 500) {
          fix = 8
        } else if (ratefix >= 100) {
          fix = 6
        } else if (ratefix >= 0) {
          fix = 4
        }
        return fix
      },
      /*根据买入价格的小数位数计算买入量的小数位数*/
      getnumfixbyprice: function () {
        const ratefix = 1 / parseFloat(this.copeEntrustBuyRate)
        return this.getfix(ratefix)
      },
      /*根据买入价格的小数位数计算买入量的小数位数*/
      getnumfixbypricesell: function () {
        const ratefix = 1 / parseFloat(this.copeEntrustSaleRate)
        return this.getfix(ratefix)
      },
      //获取本地货币汇率
      getBuyClientRate: function () {
        if (this.symbleParameArray) {
          return this.$store.getters.get_client_exchange_rate(this.symbleto, this.copeEntrustBuyRate)
        }
        return 0
      },
      getSaleClientRate: function () {
        if (this.symbleParameArray) {
          return this.$store.getters.get_client_exchange_rate(this.symbleto, this.copeEntrustSaleRate)
        }
        return 0
      },
      //设置买入交易额
      getBuyAmount: function () {
        const n = this.$np.times(this.copeEntrustBuyRate, this.copeEntrustBuyNum)
        return this.global_get_tofixed(n, this.dcs.s)
      },
      //设置卖出交易额
      getSaleAmount: function () {
        const n = this.$np.times(this.copeEntrustSaleRate, this.copeEntrustSaleNum)
        return this.global_get_tofixed(n, this.dcs.s)
      },
      //计算可买量
      buyable: function () {
        const a = this.global_get_tofixed(this.tradingDealTo.canuseamount, this.global_get_decimal(this.symbleto).a)
        const num = this.$store.getters.get_to_from_exchange_rate(a, this.copeEntrustBuyRate)
        return num
      },
      //计算可得量
      buyAvailable: function () {
        const a = this.global_get_tofixed(this.tradingDealFrom.canuseamount, this.global_get_decimal(this.symblefrom).a)
        return this.$store.getters.get_from_to_exchange_rate(a, this.copeEntrustSaleRate)
      }
    },
    props: {
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      symblefrom: '',
      symbleto: '',
      symbleParameArray: '',
      //买入卖出价
      entrustSaleRate: '',
      entrustBuyRate: '',
      //设置限价买入卖出量
      entrustBuyNum: '',
      entrustSaleNum: '',
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
      dcs: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    watch: {
      'entrustBuyRate': function (val) {
        this.copeEntrustBuyRate = this.global_get_tofixed(val, this.dcs.p)
      },
      'entrustSaleRate': function (val) {
        this.copeEntrustSaleRate = this.global_get_tofixed(val, this.dcs.p)
      },
      'entrustBuyNum': function (val) {
        let newval = val
        if (Number(this.buyable) < Number(val)) {
          newval = this.buyable
        }
        this.copeEntrustBuyNum = this.global_get_tofixed(newval, this.dcs.a)
      },
      'entrustSaleNum': function (val) {
        let newval = val
        if (Number(this.tradingDealFrom.canuseamount) < Number(val)) {
          newval = this.tradingDealFrom.canuseamount
        }
        this.copeEntrustSaleNum = this.global_get_tofixed(newval, this.dcs.a)
      }
    },
    data() {
      return {
        //下单状态
        buyState: false,
        saleState: false,
        //最多购买状态
        mostBuyPricePurchases: false,
        mostBuyPurchases: false,
        mostSaleAvailable: false,
        mostSalePricePurchases: false,
        copeEntrustBuyRate: this.entrustBuyRate,
        copeEntrustSaleRate: this.entrustSaleRate,
        copeEntrustBuyNum: this.entrustBuyNum,
        copeEntrustSaleNum: this.entrustSaleNum,
        buydecimals: 0,
        saledecimals: 0,
        //订单数据模型
        dealModel: {
          ctid: '',
          ordertype: 1,
          direction: 1,
          price: 0,
          amount: 0,
          paypassword: '',
          ordersource: 1
        }
      }
    },
    mounted() {
    },
    subscribe() {
      return {
        //订阅下单状态
        changeDealState() {
          this.buyState = false
          this.saleState = false
        }
      }
    },
    created() {
    },
    methods: {
      getfix(val) {
        let fix
        if (val >= 500) {
          fix = 2
        } else if (val >= 100) {
          fix = 3
        } else if (val >= 0) {
          fix = 4
        }
        return fix
      },
      formatTooltip(val) {
        return val + "%";
      },
      toRecharge(assets) {
        this.$router.push({name: "person-wallet", params: {id: assets.currency.id}});
      },
      //设置买入量
      getEntrustBuyNum(num) {
        const n = this.global_get_tofixed(this.buyable * num, this.dcs.a)
        this.copeEntrustBuyNum = n
      },
      //设置卖出量
      getEntrustSaleNum(num) {
        this.saledecimals = num
        this.copeEntrustSaleNum = this.global_get_tofixed(this.tradingDealFrom.canuseamount * num, this.dcs.a)
      },
      showBuyFocus() {
        this.mostBuyPurchases = !this.mostBuyPurchases
      },
      showBuyPriceFocus() {
        this.mostBuyPricePurchases = !this.mostBuyPricePurchases
      },
      showSalePriceFocus() {
        this.mostSalePricePurchases = !this.mostSalePricePurchases
      },
      showSaleFocus() {
        this.mostSaleAvailable = !this.mostSaleAvailable
      },
      //买入卖出交易
      buyDeal() {
        if (this.buyState) return
        this.buyState = true
        this.copeEntrustBuyNum = this.global_get_replace_dot(this.copeEntrustBuyNum)
        this.copeEntrustBuyRate = this.global_get_replace_dot(this.copeEntrustBuyRate)
        const dealModel = Object.assign({}, this.dealModel)
        dealModel.price = Number(this.copeEntrustBuyRate)
        dealModel.amount = Number(this.copeEntrustBuyNum)
        dealModel.ctid = this.dailyDetail.ctid.toString()
        if (Number(this.getBuyAmount) <= 0) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.volumeLzero')})
          this.buyState = false
          return
        }
        if (Number(this.copeEntrustBuyNum) > Number(this.buyable)) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.buyCount')})
          this.buyState = false
          return
        }
        this.$store.dispatch('trading_order_create', dealModel)
          .then((res) => {
            if (res.data) {
              /*发布*/
              this.$pubsub.publish(this.$pubsub.getOrderList)
              this.$store.commit('set_message', {type: 'ok', text: res.msg})
            }
          })
          .then(() => {
            this.buyState = false
          })
          .catch(() => {
            this.buyState = false
          })
      },
      saleDeal() {
        if (this.saleState) return
        this.saleState = true
        const dealModel = Object.assign({}, this.dealModel)
        dealModel.price = Number(this.copeEntrustSaleRate)
        dealModel.amount = Number(this.copeEntrustSaleNum)
        dealModel.ctid = this.dailyDetail.ctid
        dealModel.direction = -1
        if (Number(this.getSaleAmount) <= 0) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.volumeLzero')})
          this.saleState = false
          return
        }
        if (Number(this.copeEntrustSaleNum) > Number(this.tradingDealFrom.canuseamount)) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('patch.sellCount')})
          this.saleState = false
          return
        }
        this.$store.dispatch('trading_order_create', dealModel)
          .then((res) => {
            if (res.data) {
              /*发布*/
              this.$pubsub.publish(this.$pubsub.getOrderList)
              this.$store.commit('set_message', {type: 'ok', text: res.msg})
            }
          })
          .then(() => {
            this.saleState = false
          })
          .catch(() => {
            this.saleState = false
          })
      },
    }
  }
</script>

