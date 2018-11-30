<template>
  <div class="financial-detail">
    <div class="financial-detail-content">
      <financial-map></financial-map>
      <div class="content_header clearfix">
        <div class="left">
          <img class="icon" :src="product.currencyicon" alt="">
          <p class="title" v-if="product.pronames">{{lang=='en_us'?product.pronames.en_us:product.pronames.zh_cn}}</p>
          <p class="title" v-else>{{product.name}}</p>
        </div>
        <div class="right">
          <div class="title_tip" :class="{'en_title_tip':lang=='en_us'}">
            <span class="tip1">{{(product.yearlyrate*100).toFixed(2)}}%</span>
            <p class="tip2">{{$t('manage.Estimate')}}</p>
          </div>
          <div class="title_tip" :class="{'en_title_tip':lang=='en_us'}">
            <span class="tip1">{{product.cycle}}{{$t('manage.Day')}}</span>
            <p class="tip2">{{$t('manage.Lock-up')}}</p>
          </div>
          <div class="title_tip" :class="{'en_title_tip':lang=='en_us'}">
            <span class="tip1">{{product.buynumber}}</span>
            <p class="tip2">{{$t('manage.participants')}}</p>
          </div>
          <nuxt-link tag="span" to="/person/financial-deal" class="more">{{$t('manage.records')}}</nuxt-link>
        </div>
      </div>
      <div class="content_deal clearfix">
        <div class="limit left">
          <p class="process">
            <span class="process_tip" :style="{'width':getProcess}"></span>
          </p>
          <p class="lock_tip">{{$t('manage.sold')}} {{product.selledamount}}</p>
          <p class="line"></p>
          <p class="limit_tip clearfix">
            <span class="left limit_title">{{$t('manage.Totalpurchase')}}</span>
            <span class="right limit_num">{{product.expectamount}} {{currencyname}}</span>
          </p>
          <p class="limit_tip clearfix">
            <span class="left limit_title">{{$t('manage.Remaining')}}</span>
            <span class="right limit_num">{{getSur}} {{currencyname}}</span>
          </p>
          <p class="limit_tip clearfix">
            <span class="left limit_title">{{$t('manage.minimum')}}</span>
            <span class="right limit_num">{{product.minbuyamount}} {{currencyname}}</span>
          </p>
          <p class="limit_tip clearfix">
            <span class="left limit_title">{{$t('manage.maximum')}}</span>
            <span class="right limit_num">{{product.maxbuyamount}} {{currencyname}}</span>
          </p>
        </div>
        <div class="deal">
          <div class="clearfix">
            <p class="left balance">{{$t('manage.Balance')}}<span
              class="balance_tip">{{getblance}} {{currencyname}}</span>
            </p>
            <div class="right">
              <nuxt-link tag="button" :to="{name:'person-wallet', params: { id: product.currencyid }}"
                         class="charge_button">
                {{$t('wallet.recharge')}}
              </nuxt-link>
              <nuxt-link tag="button" to="/trade" class="buy_button">{{$t('legalDeal.Buy')}}</nuxt-link>
            </div>
          </div>
          
          <div class="deal_input_group">
            <div style="min-height: 21px;">
              <p v-if="!$v.buyParams.amount.$require" class="require_tip">{{$t('manage.empty')}}</p>
              <p v-if="!$v.buyParams.amount.$ismin" class="require_tip">{{$t('manage.purchasevolume')}}</p>
              <p v-if="!$v.buyParams.amount.$isfloor
                      &&$v.buyParams.amount.$ismin
                      &&$v.buyParams.amount.$isaccountmax
                      &&$v.buyParams.amount.$issinglemax
                      &&$v.buyParams.amount.$isgetsurmax"
                 class="require_tip">{{$t('manage.quantity')}}</p>
              <p v-if="!$v.buyParams.amount.$isaccountmax&&$v.buyParams.amount.$issinglemax" class="require_tip">
                {{$t('manage.amountbalance')}}</p>
              <p v-if="!$v.buyParams.amount.$issinglemax" class="require_tip">{{$t('manage.purchase')}}</p>
              <p v-if="!$v.buyParams.amount.$isgetsurmax" class="require_tip">{{$t('manage.remainingvolume')}}</p>
            </div>
            <div class="deal_input">
              
              <form class="deal_input_num" novalidate>
                <input v-model="$v.buyParams.amount.$model" type="number">
              </form>
              
              <p class="deal_input_tip">
                <span class="tip_title">{{currencyname}}</span>
                
                <span class="tip_all" @click="setAmountAll('')">{{$t('manage.all')}}</span>
              </p>
            </div>
          </div>
          
          <div class="clearfix">
            <p class="left earnings">{{$t('manage.Expected')}} <span
              class="earnings_tip">{{earnings}} {{currencyname}}</span></p>
            <nuxt-link tag="span" to="/person/manage-financial" class="right look_earnings">{{$t('manage.earnings')}}
            </nuxt-link>
          </div>
          <div>
            <el-checkbox v-model="checked">
              <p class="argument">{{$t('manage.AgreeFinancial')}}</p>
            </el-checkbox>
            <span @click="showArgument" class="argument_tip">{{$t('home.footerProtocols')}}</span>
            <terms @close="showArgument" v-show="popupStatue" :article="article"/>
          </div>
          <financial-button class="promptly_button"
                            :class="{'no_rush':$v.$invalid}"
                            :product="product"
                            :isBuy="true"
                            @financial:buy="buy"
                            v-loading="loading"
                            :text="$t('manage.Buynow')"></financial-button>
        </div>
      </div>
      <div class="content_block content_block_flow">
        <p class="title title_liucheng">{{$t('manage.Subscription')}}</p>
        <div class="flow clearfix">
          <div class="point">
            <div class="point_tip">
              <p class="time_tip">{{$t('manage.deadline')}}</p>
              <p class="time">{{global_get_local_time(product.finishselltime).format('YYYY-MM-DD HH:mm')}}</p>
            </div>
          </div>
          <p class="line"></p>
          <div class="point">
            <div class="point_tip">
              <p class="time_tip">{{$t('manage.Interest')}}</p>
              <p class="time">{{global_get_local_time(product.startaccrualtime).format('YYYY-MM-DD HH:mm')}}</p>
            </div>
          </div>
          <p class="line"></p>
          <div class="point">
            <div class="point_tip">
              <p class="time_tip">{{$t('manage.Unlocktime')}}</p>
              <p class="time">{{global_get_local_time(product.statementtime).format('YYYY-MM-DD HH:mm')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content_block content_block_rule">
        <p class="title title_guize">{{$t('manage.Lockrule')}}</p>
        <div class="rule_table">
          <p class="rule_table_row clearfix">
            <span class="name">{{$t('manage.Currency')}}</span>
            <span class="item">{{$t('manage.annualized')}}{{this.product.yearlyrate*100}}%</span>
            <span class="name">{{$t('home.footerRate')}}</span>
            <span class="item">0%</span>
          </p>
          <p class="rule_table_row clearfix">
            <span class="name">{{$t('manage.income')}}</span>
            <span class="item">{{currencyname}}</span>
            <span class="name">{{$t('manage.Starting')}}</span>
            <!--<span class="item">{{global_get_local_time(product.startselltime).format('YYYY-MM-DD HH:mm')}}</span>-->
            <span class="item">{{global_get_local_time(product.startaccrualtime).format('YYYY-MM-DD HH:mm')}}</span>
          </p>
          <p class="rule_table_row clearfix">
            <span class="name">{{$t('manage.Unlock')}}</span>
            <span class="item">{{$t('manage.ended')}}</span>
            <span class="name">{{$t('manage.Ending')}}</span>
            <!--<span class="item">{{getendselltime}}</span>-->
            <span class="item">{{global_get_local_time(product.statementtime).format('YYYY-MM-DD HH:mm')}}</span>
          </p>
        </div>
      </div>
      <div class="content_block content_block_faq">
        <p class="title title_wenti">{{$t('patch.FAQ')}}</p>
        <div class="faq">
          <financial-activityRules :articeid="articeid"></financial-activityRules>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import map from '@/components/financial/map-list'
  import finbutton from '@/components/financial/financial-button'
  import terms from "@/components/public/terms-service";
  import moment from 'moment'
  import activityRules from "@/components/public/activity-rules";
  
  
  export default {
    name: "id",
    components: {
      'financial-map': map,
      'financial-button': finbutton,
      'financial-activityRules': activityRules,
      
      terms
    },
    validations: {
      buyParams: {
        amount: {
          $require(val) {
            val = parseFloat(val)
            if (!val) {
              return false
            }
            return true
          },
          $ismin(val) {
            val = parseFloat(val)
            const min = parseFloat(this.product.minbuyamount)
            let _state = true
            if (val && min > 0 && val < min) {
              _state = false
            }
            return _state
          },
          $isfloor(val) {
            val = parseFloat(val)
            const _maxbuy = Math.floor(this.$np.divide(val, this.product.minbuyamount))
            const maxbuy = this.$np.times(_maxbuy, this.product.minbuyamount)
            let _state = true
            if (val && maxbuy != val) {
              _state = false
            }
            return _state
          },
          $isaccountmax(val) {
            val = parseFloat(val)
            const max = parseFloat(this.product.currencybalance)
            let _state = true
            if (val && max > 0 && val > max) {
              _state = false
            }
            return _state
          },
          $issinglemax(val) {
            val = parseFloat(val)
            const max = parseFloat(this.product.maxbuyamount)
            let _state = true
            if (val && max > 0 && val > max) {
              _state = false
            }
            return _state
          },
          //超过剩余额度
          $isgetsurmax(val) {
            val = parseFloat(val)
            const max = parseFloat(this.getSur)
            let _state = true
            if (val && max >= 0 && val > max) {
              _state = false
            }
            return _state
          }
        }
      }
    },
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        product: {},
        buyParams: {
          productid: '',
          amount: '',
          googleverifycode: '',
          emailverifycode: '',
          smsverifycode: ''
        },
        checked: true,
        loading: false,
        popupStatue: false,
        article: {
          "zh_cn": 654641,
          "en_us": 638881
        },
        articeid: {//常见问题
          en_us: 692652,
          zh_cn: 692634
        }
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
      }
    },
    async asyncData({store, params, redirect}) {
      if (!params.id) {
        redirect('/financial')
      }
      const {data} = await store.dispatch('finance_product_get', {
        productid: params.id
      })
      return {
        product: data
      }
    },
    created() {
      this.buyParams.amount = this.product.minbuyamount
    },
    computed: {
      currencyname: function () {
        return this.product.currencyname.toUpperCase()
      },
      /*计算结束时间*/
      getendselltime: function () {
        return moment(this.product.startselltime).add(this.product.cycle, 'd').format('YYYY-MM-DD HH:mm')
      },
      /*预计收益*/
      earnings: function () {
        return this.$np.times(this.buyParams.amount, this.product.cycle, this.product.dailyrate)
      },
      getblance: function () {
        if (!this.$userinfo.uid) {
          return '--'
        }
        return this.product.currencybalance
      },
      /*计算剩余额度*/
      getSur: function () {
        return this.$np.minus(this.product.expectamount, this.product.selledamount)
      },
      /*计算进度*/
      getProcess: function () {
        let pro = Math.abs(this.$np.divide(this.product.selledamount, this.product.expectamount)) * 100
        if (pro < 0.5) {
          pro = 0.5
        }
        return pro + '%'
      },
    },
    methods: {
      showArgument() {
        this.popupStatue = !this.popupStatue;
      },
      initAmount(e) {
        this.setAmountAll(e.target.value)
      },
      /*将可买量转换为最小可买量的整数倍*/
      setAmountAll(a) {
        const _b = Number(a ? a : this.product.currencybalance)
        
        let num = this.product.minbuyamount
        
        if (_b >= num) {
          const _maxbuy = Math.floor(this.$np.divide(_b, this.product.minbuyamount))
          const maxbuy = this.$np.times(_maxbuy, this.product.minbuyamount)
          
          if (this.product.currencybalance > maxbuy) {
            num = maxbuy
          } else {
            /**/
            this.setAmountAll(this.product.currencybalance)
            return
          }
          
          if (num >= this.product.minbuyamount) {
            if (num > this.getSur) {
              num = this.getSur
            }
            if (num > this.product.maxbuyamount) {
              num = this.product.maxbuyamount
            }
          }
        }
        
        this.buyParams.amount = num
      },
      getProduct() {
        return this.$store.dispatch('finance_product_get', {
          productid: this.product.id
        })
      },
      /*购买*/
      buy() {
        if (!this.$userinfo.uid) {
          this.$router.push('/login')
          return
        }
        
        if (!this.checked) {
          this.$store.commit('set_message', {
            type: 'error',
            text: this.$t('manage.Agreement')
          })
          return
        }
        this.$v.$touch()
        if (this.$v.$invalid) {
          return
        }
        let params = Object.assign(this.buyParams)
        if (Number(params.amount) <= 0) {
          this.$store.commit('set_message', {
            type: 'error',
            text: this.$t('manage.greater')
          })
          return
        }
        if (Number(params.amount) > Number(this.product.currencybalance)) {
          this.$store.commit('set_message', {
            type: 'error',
            text: this.$t('manage.purchasebalance')
          })
          return
        }
        
        if (this.loading) {
          return
        }
        this.loading = true
        
        params.productid = this.product.id
        this.$store.dispatch('finance_user_product_purchase', params)
          .then(({data}) => {
            if (data) {
              return this.getProduct()
            }
          })
          .then((data) => {
            if (data && data.data) {
              this.product = data.data
              this.$store.commit('set_message', {
                type: 'ok',
                text: this.$t('manage.PurchaseSuccess')
              })
            } else {
              this.$store.commit('set_message', {
                type: 'error',
                text: this.$t('manage.Failedpurchase')
              })
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../static/styles/color";
  
  .financial-detail {
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #F5F5F8;
    .financial-detail-content {
      width: 1200px;
      min-width: 1200px;
      margin: auto;
    }
    .content_header {
      padding: 0 40px;
      color: #ffffff;
      height: 100px;
      line-height: 100px;
      background-color: @cl_financial;
      margin-top: 30px;
      .right {
        display: inline-block;
        height: 100%;
      }
      .icon {
        width: 30px;
        height: 30px;
        margin-right: 15px;
        display: inline-block;
        vertical-align: middle;
      }
      .title {
        font-size: 30px;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
      }
      
      .title_tip {
        vertical-align: middle;
        padding-right: 80px;
        display: inline-block;
        line-height: 1.7;
        text-align: center;
      }
      .en_title_tip {
        padding-right: 10px;
      }
      .tip1 {
        font-size: 32px;
        font-weight: 600;
        line-height: 1;
      }
      .tip2 {
        font-size: 14px;
        color: #F8F8F8;
      }
      .more {
        font-size: 14px;
        color: #F8F8F8;
        cursor: pointer;
      }
    }
    .content_deal {
      background-color: #ffffff;
      padding: 40px 0 40px 40px;
      margin-top: 30px;
      .limit {
        display: inline-block;
        background-color: #F8F8F8;
        font-size: 14px;
        width: 560px;
        padding: 30px 40px;
        .process {
          width: 100%;
          height: 20px;
          background: rgba(240, 240, 240, 1);
          border-radius: 2px;
          margin-bottom: 15px;
          position: relative;
          .process_tip {
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            border-radius: 2px;
            height: 20px;
            background-color: @cl_financial;
          }
        }
        .lock_tip {
          text-align: center;
          color: #333333;
          font-size: 16px;
        }
        .line {
          height: 1px;
          background-color: #F0F0F0;
          margin-top: 25px;
        }
        .limit_tip {
          margin-top: 20px;
          line-height: 1;
        }
        .limit_title {
          color: #8790A1;
        }
        .limit_num {
          color: #333333;
        }
      }
      .deal {
        display: inline-block;
        margin-left: 60px;
        width: 440px;
        .deal_input_group {
          margin-top: 15px;
          margin-bottom: 10px;
          .require_tip {
            text-align: right;
            padding-bottom: 5px;
            font-size: 12px;
            color: @cl_cd4;
          }
        }
        .deal_input {
          height: 55px;
          border-radius: 2px;
          border: 1px solid #BBBBBB;
          display: flex;
          flex-direction: row;
          .deal_input_num {
            flex: auto;
            padding: 0 15px;
            line-height: 53px;
            input {
              font-size: 16px;
              width: 100%;
            }
          }
          .deal_input_tip {
            line-height: 53px;
            font-size: 0;
          }
          .tip_title, .tip_all {
            padding: 4px 20px;
            font-size: 14px;
          }
          .tip_title {
            color: #999999;
            border-right: 1px solid #EEEEEE
          }
          .tip_all {
            color: @cl_link;
            cursor: pointer;
          }
        }
        .el-checkbox {
          margin-top: 40px;
        }
        .balance {
          font-size: 16px;
          color: #333333;
        }
        .balance_tip {
          color: #E96C42;
          margin-left: 10px;
        }
        .charge_button, .buy_button {
          display: inline-block;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          color: #ffffff;
          margin-left: 10px;
          padding: 0 15px;
        }
        .charge_button {
          background-color: @cl_link;
        }
        .buy_button {
          background-color: #03BF7B;
        }
        .earnings {
          font-size: 14px;
          color: #333333;
        }
        .earnings_tip {
          color: #E96C42;
        }
        .look_earnings {
          color: @cl_link;
          font-size: 14px;
          cursor: pointer;
        }
        .argument {
          font-size: 14px;
          color: #333333;
        }
        .argument_tip {
          color: @cl_link;
          cursor: pointer;
          font-size: 14px;
        }
        .promptly_button:hover {
          box-shadow: 0 5px 10px 0 rgba(255, 130, 0, 0.52)
        }
        .promptly_button {
          height: 56px;
          line-height: 56px;
          font-size: 20px;
          background-color: @cl_financial;
          box-shadow: 0 5px 10px 0 rgba(255, 130, 0, 0.2);
          transition: all .5s cubic-bezier(.645, .045, .355, 1);
          text-align: center;
          color: #ffffff;
          margin-top: 15px;
          width: 100%;
          border-radius: 2px;
        }
        .promptly_button.no_rush:hover {
          box-shadow: none;
        }
        .promptly_button.no_rush {
          cursor: no-drop;
          background: #EEEEEE;
          color: #999999;
          box-shadow: none;
          transition: none;
        }
      }
    }
    .content_block {
      background-color: #ffffff;
      margin-top: 10px;
      padding: 20px 40px;
      .title {
        font-size: 20px;
        color: #333333;
        font-weight: 600;
      }
      .title_liucheng:before,
      .title_wenti:before,
      .title_guize:before {
        content: '';
        display: inline-block;
        background-repeat: no-repeat;
        width: 36px;
        height: 36px;
        vertical-align: middle;
        position: relative;
        margin-right: 20px;
        top: -2px;
      }
      .title_liucheng:before {
        background-image: url("../../static/images/financial/liucheng.svg");
      }
      .title_wenti:before {
        background-image: url("../../static/images/financial/wenti.svg");
      }
      .title_guize:before {
        background-image: url("../../static/images/financial/guize.svg");
      }
    }
    .content_block_flow {
      .flow {
        text-align: center;
        margin-top: 45px;
        margin-bottom: 80px;
      }
      .point {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 100px;
        background-color: @cl_financial;
        vertical-align: middle;
        .point_tip {
          position: absolute;
          display: inline-block;
          text-align: center;
          transform: translateX(-50%);
          top: 20px;
        }
        .time_tip, .time {
          white-space: nowrap;
          font-size: 14px;
          color: #333333;
        }
        .time_tip {
          color: @cl_financial;
          margin-bottom: 5px;
        }
        
      }
      .line {
        width: 400px;
        height: 2px;
        display: inline-block;
        margin: 0 20px;
        background-color: #E1E0EC;
        vertical-align: middle;
      }
    }
    .content_block_rule {
      .rule_table {
        margin: 40px 20px;
        font-size: 14px;
      }
      .rule_table_row {
        line-height: 54px;
        margin-bottom: 1px;
        .name {
          height: 54px;
          font-weight: 400;
          display: inline-block;
          width: 180px;
          text-align: center;
          color: #333333;
          background-color: #F1F5FA;
          float: left;
        }
        .item {
          float: left;
          height: 54px;
          width: 360px;
          font-weight: 400;
          display: inline-block;
          color: @cl_financial;
          background-color: #F8F8F8;
          padding-left: 30px;
        }
      }
    }
    .content_block_faq {
      .faq {
        margin: 40px 0;
        font-size: 14px;
        .q {
          color: @cl_financial;
          margin-bottom: 10px;
        }
        .a {
          color: #8790A1;
          line-height: 1.5;
          margin-bottom: 25px;
        }
      }
    }
  }
</style>
