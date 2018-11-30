<template>
  <div class='header media-screen'>
    <nuxt-link class="fl" tag="div" to="/">
      <img class='logo' src="../../static/images/logo.svg" alt="">
      <span class="beta">Beta</span>
    </nuxt-link>
    
    <div class="head-menu fl">
      <div class="new-money">
        <div class="money-type"
             @mouseenter="showCoinData(true)"
             @mouseleave="showCoinData(false)">
          <span class="select_collect" :class="{'active':iscollect}"
                @click.stop="collect(copeDailyDetail)"></span>
          <span class="type-weight">{{symblefrom}}</span>
          <span class="type-tip">/</span>
          <span class="type-normal">{{symbleto}}</span>
        </div>
        <div class="new-money-list">
          <div class="new-money-list-content">
            <span class="new-money-title">{{$t('deal.newPrice')}}</span>
            <p class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{global_get_tofixed(newmoney.price,dcs.p)}}</span>
              <span class="new-money-price">{{getNewMarketClientRate(newmoney.price)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
            </p>
            <p v-else>
              --
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">{{$t('deal.hourUps')}}</span>
            <p class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-dot" :class="ubs>=0?'rise':'fall'">{{ubsPercent}}%</span>
            </p>
            <p v-else>
              --
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">{{$t('deal.hourHPrice')}}</span>
            <p class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.h,dcs.p)}}</span>
              <span class="new-money-price">{{getNewMarketClientRate(copeDailyDetail.h)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
            </p>
            <p v-else>
              --
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">{{$t('deal.hourLPrice')}}</span>
            <p class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.l,dcs.p)}}</span>
              <span class="new-money-price">{{getNewMarketClientRate(copeDailyDetail.l)}} {{$store.getters.get_client_exchange_rate_name.name}}</span>
            </p>
            <p v-else>
              --
            </p>
          </div>
          <div class="new-money-list-content">
            <span class="new-money-title">{{$t('deal.hourNumber')}}</span>
            <p class="new-money-num" v-if="copeDailyDetail.symble">
              <span class="new-money-dot">{{global_get_tofixed(copeDailyDetail.v,dcs.a)}}</span>
            </p>
            <p v-else>
              --
            </p>
          </div>
        </div>
      </div>
      <div class="coin"
           @mouseenter="showCoinData(true)"
           @mouseleave="showCoinData(false)"
           v-show="coinDataState">
        <hex-coin
          :dailyDetail="dailyDetail"
          :symbleto="symbleto" day="true" ref="hexCoin"></hex-coin>
      </div>
    </div>
    
    <div class='header-user-info fr language'>
      <!--交易钱包-->
      <div class="user-info-block header-user-info_wallet inline-black" v-if="!$store.state.hex_uid.value">
        <nuxt-link class="deal" to="/login">{{$t('legalTrad.entrust')}}</nuxt-link>
        <nuxt-link class=" wallet" to="/login">{{$t('legalTrad.asset')}}</nuxt-link>
      </div>
      <div class="user-info-block header-user-info_wallet inline-black" v-else>
        <nuxt-link class="deal" to="/person/deal">{{$t('legalTrad.entrust')}}</nuxt-link>
        <nuxt-link class=" wallet" to="/person/wallet">{{$t('legalTrad.asset')}}</nuxt-link>
      </div>
      <!--设置币种-->
      <div class="user-info-block set-currency"
           @click="showexchange(true)">
        <i class="set-currency_icon"></i>
        <div class="set-currency_content"
             @mouseenter="showexchange(true)"
             @mouseleave="showexchange(false)"
             v-show="exchangestate">
          <p class="set-currency_content_text">{{$t('home.currency')}}</p>
          <div class="set-currency_content_exchange clearfix">
              <span class="left"
                    @click="setExchange(exchange.cny.name)"
                    :class="{'active':exchange.active==exchange.cny.name}">{{global_get_uppercase(exchange.cny.name)}}</span>
            <span class="left" language
                  @click="setExchange(exchange.usd.name)"
                  :class="{'active':exchange.active==exchange.usd.name}">{{global_get_uppercase(exchange.usd.name)}}</span>
          </div>
        </div>
      </div>
      <!--注册登录-->
      <div class="user-info-block" v-if="!$store.state.hex_uid.value">
        <nuxt-link class='cursor login' to='/login' tag="span">
          {{$t("home.headLogin")}}
        </nuxt-link>
        <nuxt-link class='cursor register' to='/register' tag="span">
          {{$t("home.headRegister")}}
        </nuxt-link>
      </div>
      
      <div class="user-info-block" v-else>
        <div
          class="signIn por cursor"
          @mouseenter="showUserData(true)"
          @mouseleave="showUserData(false)">
          <i class='sign-icon'></i>
          <div class='header-user-info_content'
               @mouseenter="showUserData(true)"
               @mouseleave="showUserData(false)"
               v-show="userstate">
            <div class="sanj"></div>
            <nuxt-link to="/person" tag="div" class="tolink_memberCenter">
              <p class='userid  fw'>UID:{{global_get_uid($userinfo.uid)}}</p>
              <p class='email ovh'>
                <span class='fl cl_gray'>{{global_string_split(getUserInfoPhone)}}</span>
              </p>
            </nuxt-link>
            <nuxt-link to="/person/wallet" tag="div" class='ovh estimate'>
              <p class="clearfix estimate-link">
                <span class=' cl_white'> {{$t("home.userLoginTotalValuation")}} </span>
              </p>
              <p class='client_amount cl_white cion'>
                {{global_get_tofixed($userassets.totalamountbtc)}} BTC
              </p>
              <p class='client_amount cl_gray'>
                ≈{{$store.getters.get_client_exchange_rate('btc',$userassets.totalamountbtc)}}
                {{$store.getters.get_client_exchange_rate_name.name}}
              </p>
            </nuxt-link>
            <button class='cursor cl_gray' @click='quitAccount'>{{$t("home.userLoginQuit")}}</button>
          </div>
        </div>
      </div>
      <div class="user-info-block">
        <Lang/>
      </div>
    </div>
  </div>
</template>
<script>
  import * as jsCokie from 'js-cookie'
  import Lang from "./lang";
  import coin from './coin'
  
  export default {
    components: {
      Lang,
      'hex-coin': coin
    },
    computed: {
      //获取24小时涨跌
      ubs: function () {
        const ups = this.dailyDetail
        return ((this.newmoney.price - ups.o) / ups.o).toFixed(8)
      },
      //获取4小时涨跌百分比
      ubsPercent: function () {
        const ups = this.dailyDetail
        const abs = (((this.newmoney.price - ups.o) / ups.o) * 100).toFixed(2)
        return isNaN(abs) ? 0 : abs
      },
      exchange: function () {
        return this.$store.state.hex_client_exchange
      },
      getUserInfoPhone: function () {
        let info = this.$userinfo
        if (info) {
          return info.phone ? info.phone : info.email
        }
      }
    },
    watch: {
      'dailyDetail': function (val) {
        if (val) {
          this.copeDailyDetail = val
        }
      },
      'coinDataState': function (val) {
        if (val) {
          this.$nextTick(() => {
            const a = this.$refs['hexCoin'].$refs['coin-list']
            if (a && a.offsetHeight > 500) {
              a.style.height = 500 + 'px'
            }
          })
        }
      }
    },
    props: {
      symbleParameArray: '',
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      dcs: {
        type: Object,
        default: function () {
          return {}
        }
      },
      symblefrom: '',
      symbleto: ''
    },
    data() {
      return {
        coinDataState: false,
        userstate: false,
        exchangestate: false,
        coinTitleActive: '',
        coinSearchString: '',
        status: '0',
        isSignIn: 0,
        cointitle: [],
        coinlists: [],
        mouseState: false,
        cointimer: null,
        usertimer: null,
        copeDailyDetail: this.dailyDetail,
        background: this.$store.state.hex_client_background.active,
        coinTitleActiveTimer: null,
        collectState: false,
        iscollect: false,
        newmoney: {
          price: this.dailyDetail.c
        }
      };
    },
    subscribe(){
      return {
        /*订阅自选*/
        changeHeaderCollect(res){
          this.iscollect = res
        },
        /*订阅最新价*/
        changeNewMoney(res){
          this.newmoney = res
          if (res.price > this.copeDailyDetail.h) {
            this.copeDailyDetail.h = res.price
          }
          if (res.price < this.copeDailyDetail.l) {
            this.copeDailyDetail.l = res.price
          }
        }
      }
    },
    created() {
    },
    mounted() {
      this.iscollect = this.copeDailyDetail.self
    },
    methods: {
      setExchange(e) {
        this.$store.commit('set_client_exchange', e)
        jsCokie.set(this.$store.state.hex_client_exchange.type, e)
      },
      searchCoin() {
        this.$refs.hexCoin.search(this.coinSearchString)
      },
      showCoinData(e) {
        this.cointimer && clearTimeout(this.cointimer)
        if (!e) {
          this.cointimer = setTimeout(() => {
            this.coinDataState = e
          }, 300)
        } else {
          this.coinDataState = e
        }
      },
      showexchange(e) {
        this.exchangetimer && clearTimeout(this.exchangetimer)
        if (!e) {
          this.exchangetimer = setTimeout(() => {
            this.exchangestate = e
          }, 300)
        } else {
          this.exchangestate = e
        }
      },
      showUserData(e) {
        this.usertimer && clearTimeout(this.usertimer)
        if (!e) {
          this.usertimer = setTimeout(() => {
            this.userstate = e
          }, 300)
        } else {
          this.userstate = e
        }
      },
      changeCoinTitleTab(coin) {
        this.coinTitleActive = coin;
      },
      
      quitAccount() {
        this.$router.push('/')
        this.$store.commit('remove_user_info');
      },
      setActiveCoin(e, delay) {
        if (!delay) {
          this.coinTitleActive = e
        } else {
          this.coinTitleActiveTimer && clearTimeout(this.coinTitleActiveTimer)
          if (!e) {
            this.coinTitleActiveTimer = setTimeout(() => {
              this.coinTitleActive = e
            }, 1000)
          } else {
            this.coinTitleActive = e
          }
        }
      },
      collect(val) {
        if (!this.$userinfo.uid) {
          this.$router.push({path: '/login'})
          return
        }
        if (this.collectState) {
          return
        }
        this.collectState = true
        let url;
        !this.iscollect ? url = 'user_self_selection_add' : url = 'user_self_selection_delete';
        this.$store.dispatch(url, {ctid: val.ctid}).then(({data}) => {
          if (data) {
            this.$store.commit('set_message', {
              type: 'ok',
              text: this.iscollect ? this.$t('c2c.unfavorite') : this.$t('c2c.favorite')
            });
            this.iscollect = this.copeDailyDetail.self = !this.iscollect
            
            /*推送自选*/
            this.$pubsub.publish(this.$pubsub.changeCollect, {
              key: val.ctid,
              value: this.iscollect
            })
          }
          this.collectState = false
        })
      },
      setBackground(val) {
        if (this.$store.state.hex_client_background.active == val) {
          return
        }
        this.background = val
        this.$store.commit('set_client_background', val)
        jsCokie.set(this.$store.state.hex_client_background.type, val)
      },
      getNewMarketClientRate(num) {
        if (this.symbleParameArray) {
          return this.$store.getters.get_client_exchange_rate(this.symbleto, num)
        }
        return 0
      }
    }
  }

</script>

<style lang="less" scoped>
  @import "../../static/styles/color.less";
  
  @media screen and (max-width: 1760px) {
    .media-screen {
      .new-money {
        .new-money-list .new-money-list-content {
          padding-right: 10px;
        }
      }
    }
  }
  
  @media screen and (max-width: 1600px) {
    .media-screen {
      .header-user-info_wallet {
        display: none;
      }
      .new-money .money-type {
        margin-right: 15px;
      }
      .new-money .money-type:after {
        margin-left: 10px;
      }
    }
  }
  
  @media screen and (max-width: 1300px) {
    .media-screen.header {
      padding: 0 15px;
    }
    
    .media-screen {
      .beta {
        margin: 0 15px 0 10px;
      }
    }
  }
  
  @media screen and (max-width: 1280px) {
    .media-screen {
      .language .login,
      .language .register {
        padding: 0 15px;
      }
    }
  }
  
  @media screen and (max-width: 1200px) {
    .media-screen.header {
      padding: 0 10px;
    }
    
    .media-screen {
      .new-money .money-type {
        margin-right: 10px;
      }
      .language .login,
      .language .register {
        padding: 0 10px;
      }
    }
  }
  
  .header-user-info {
    .user-info-block {
      float: left;
    }
  }
  
  .new-money {
    position: relative;
    height: 100%;
    
    .select_background {
      display: inline-block;
      height: 24px;
      border: 1px solid #1E222A;
      background-color: #1E222A;
      line-height: 24px;
      border-radius: 2px;
      text-align: center;
      margin-left: 10px;
      vertical-align: middle;
    }
    
    .select_background .select_background_day,
    .select_background .select_background_night {
      display: inline-block;
      height: 22px;
      width: 24px;
      background-size: 14px 14px;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }
    .select_background .active {
      background-color: #15181F;
    }
    
    .select_background_day {
      background-image: url("../../static/images/day.svg");
    }
    
    .select_background_day.active {
      background-image: url("../../static/images/day-active.svg");
    }
    
    .select_background_night {
      background-image: url("../../static/images/night.svg");
    }
    
    .select_background_night.active {
      background-image: url("../../static/images/night-active.svg");
    }
    
    .right-content {
      height: 100%;
      line-height: 56px;
      position: relative;
      float: right;
    }
    
    .select_collect {
      cursor: pointer;
      width: 14px;
      height: 19px;
      display: inline-block;
      background-image: url('../../static/images/collect.svg');
      background-size: 14px 14px;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 10px;
    }
    
    .select_collect.active {
      background-image: url('../../static/images/collect-active.svg');
    }
    .money-type {
      cursor: pointer;
      float: left;
      height: 100%;
      margin-right: 60px;
      padding-right: 5px;
      border-left: 1px solid @cl_292E39;
      border-right: 1px solid @cl_292E39;
      .type-weight {
        font-size: 24px;
        color: @cl_fff;
        font-weight: bold;
      }
      
      .type-normal {
        color: @cl_c5c;
        font-size: 18px;
      }
      
      .icon-logo {
        width: 30px;
        height: 30px;
        position: relative;
        top: 9px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      .type-logo {
        width: 30px;
        height: 30px;
        border: 0;
        margin: 3px;
      }
      
      .type-tip {
        color: @cl_c5c;
        font-size: 18px;
        margin: 6px;
      }
    }
    .money-type:after {
      content: '';
      width: 7px;
      height: 4px;
      background-image: url("../../static/images/select_down.svg");
      background-size: cover;
      vertical-align: middle;
      display: inline-block;
      position: relative;
      right: -5px;
      top: -3px;
      margin-right: 10px;
      margin-left: 36px;
    }
    .new-money-list {
      display: inline-block;
      height: 100%;
    }
    
    .new-money-list:after {
      content: '';
      display: block;
      clear: both;
    }
    
    .new-money-list .new-money-list-content {
      line-height: 1.4;
      vertical-align: middle;
      padding-right: 50px;
      display: inline-block;
    }
    
    .new-money-title {
      font-size: 12px;
      color: @cl_8790A1;
    }
    
    .new-money-num {
    }
    
    .new-money-dot {
      color: @cl_fff;
      font-size: 14px;
      font-weight: 600;
    }
    .new-money-dot.rise {
      color: @cl_buy;
    }
    
    .new-money-dot.fall {
      color: @cl_sell;
    }
    .new-money-dot.rise:after,
    .new-money-dot.fall:after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 10px;
      background-size: cover;
      margin-left: 4px;
    }
    
    .new-money-dot.rise:after {
      background-image: url("../../static/images/rise.svg");
    }
    
    .new-money-dot.fall:after {
      background-image: url("../../static/images/decline.svg");
    }
    
    .new-money-price {
      color: @cl_c5c;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  
  .memter_center:hover {
    color: @cl_link;
  }
  
  .sanj {
    border-color: rgba(41, 46, 57, 1);
    background: rgba(41, 46, 57, 1);
  }
  
  .tolink_memberCenter {
    height: 88px;
    background: #292e39;
    border-bottom: 1px solid rgba(34, 38, 48, 1);
  }
  
  .cl_gray {
    color: rgba(135, 144, 161, 1);
  }
  
  .cl_white {
    color: rgba(225, 224, 236, 1);
  }
  
  .header {
    width: auto;
    height: 50px;
    line-height: 50px;
    min-height: 50px;
    padding: 0 30px;
    background: @cl_content;
    color: white;
    font-size: 14px;
    min-width: 1000px;
  }
  
  .logo {
    width: 70px;
    vertical-align: middle;
    cursor: pointer;
  }
  
  .beta {
    color: #767F9A;
    border: 1px solid #767F9A;
    margin: 0 40px 0 10px;
    padding: 0 4px;
    border-radius: 2px;
    font-size: 12px;
    
  }
  
  .language {
    .login, .register {
      color: white;
      text-align: center;
      padding: 0 20px;
      vertical-align: middle;
    }
    
    .register {
      border: none;
      border-left: 1px solid rgba(94, 101, 115, 1);
    }
    .login:hover, .register:hover {
      color: @cl_link;
    }
    
  }
  
  .set-currency {
    display: inline-block;
    position: relative;
  }
  
  .set-currency_icon {
    background-image: url("../../static/images/ICO_set.svg");
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    background-size: cover;
    cursor: pointer;
  }
  
  .set-currency:hover .set-currency_icon {
    background-image: url("../../static/images/ICO_set_check.svg");
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    background-size: cover;
    cursor: pointer;
  }
  
  .set-currency_content {
    position: absolute;
    width: 94px;
    padding: 15px 0px;
    right: -29px;
    z-index: 15;
    line-height: normal;
    background: rgba(41, 46, 57, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  
  .set-currency_content_text {
    font-weight: 900;
    color: rgba(135, 144, 161, 1);
    border-bottom: 1px solid rgba(34, 38, 48, 1);
    margin-bottom: 5px;
    padding-bottom: 5px;
    text-align: center;
  }
  
  .set-currency_content:before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7.5px 10px 7.5px;
    border-color: transparent transparent rgba(41, 46, 57, 1) transparent;
    top: -10px;
    right: 30px;
  }
  
  .set-currency_content_exchange .left.active {
    color: @cl_link;
  }
  
  .set-currency_content_exchange {
    color: @cl_fff;
    margin-top: 15px;
    padding: 0 19px;
  }
  
  .set-currency_content_exchange .left {
    width: 100%;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
  }
  
  .set-currency_content_exchange .left:last-child {
    margin-top: 15px;
  }
  
  .set-currency_content_exchange .left:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    background-image: url("../../static/images/select_cricle.png");
    background-size: cover;
    width: 14px;
    height: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .set-currency_content_exchange .left.active:before {
    background-image: url("../../static/images/select_cricle_active.svg");
  }
  
  .head-menu {
    height: 100%;
    position: relative;
    div {
      color: white;
    }
    .coin {
      position: absolute;
      background: rgba(41, 46, 57, 1);
      z-index: 10000;
      width: 640px;
      top: 50px;
      box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    }
  }
  
  .bg1c {
    background: #1C1B36;
  }
  
  ol.public {
    border-bottom: 1px solid #eee;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #333;
    background: #fff;
    overflow-y: auto;
    li {
      cursor: pointer;
      float: left;
      width: 160px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
    }
    li.before:after {
      background: url('../../static/images/security/an_select_down.png') no-repeat center center;
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
      background-size: 10px auto;
    }
    li.before.cur {
      background: #6F8FF1;
      color: white;
    }
    li.before.cur:after {
      background: url('../../static/images/security/head_white.png') no-repeat center center;
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
      background-size: 10px auto;
    }
    li.last {
      width: 220px;
      float: right;
      margin-right: 10px;
      .search {
        padding: 10px 0;
        input {
          width: 157px;
          height: 30px;
          border: 1px solid #DDDDDD;
          font-size: 14px;
          line-height: 20px;
          padding-left: 10px;
          box-sizing: border-box;
        }
        button {
          height: 30px;
          width: 58px;
          outline: none;
          border: 1px solid #6F8FF1;
          background: #6F8FF1;
          color: white;
          font-size: 14px;
          
        }
      }
    }
  }
  
  .header-menu-title {
    user-select: none;
    margin-right: 30px;
    display: inline-block;
  }
  
  .header-menu-title.hover {
    color: @cl_link;
  }
  
  .header-menu-title .meuns {
    position: relative;
  }
  
  .header-menu-title .meuns:hover {
    color: @cl_link;
  }
  
  .header-user-info .header-user-info_content {
    position: absolute;
    right: -83px;
    z-index: 200;
    width: 208px;
    height: 244px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    .client_amount {
      text-align: left;
      margin-top: 10px;
    }
    .client_amount.cion {
      font-size: 16px;
    }
    .email {
      background: rgba(41, 46, 57, 1);
      padding: 0 20px 15px;
      font-size: 12px;
      line-height: 20px;
    }
    .userid {
      background: rgba(41, 46, 57, 1);
      padding: 20px 20px 10px;
      font-size: 16px;
      line-height: 22px;
      color: rgba(225, 224, 236, 1);
    }
    .userid:after {
      background: url('../../static/images/head-arrow-right.svg') no-repeat right center;
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 14px;
      background-size: auto 13px;
      position: absolute;
      right: 20px;
      top: 25px;
    }
    .estimate {
      padding: 20px;
      background: rgba(41, 46, 57, 1);
      font-size: 14px;
      line-height: 20px;
      height: 116px;
      border-bottom: 1px solid rgba(34, 38, 48, 1);
      position: relative;
      p {
        height: 17px;
        font-size: 12px;
      }
      .estimate-link:after {
        background: url('../../static/images/head-arrow-right.svg') no-repeat right center;
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 14px;
        background-size: auto 13px;
        position: absolute;
        right: 20px;
        top: 25px;
      }
      
    }
    button {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 35px;
      border: none;
      background: rgba(41, 46, 57, 1);
      position: absolute;
      bottom: 0;
      border-radius: 0;
    }
  }
  
  .signIn {
    display: inline-block;
    margin: 0 20px;
  }
  
  .signIn .sign-icon,
  .signIn:hover .sign-icon {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    background-size: auto 100%;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  
  .signIn .sign-icon {
    background-image: url("../../static/images/loginIn.svg");
  }
  
  .signIn:hover .sign-icon {
    background-image: url("../../static/images/loginIn_check.svg");
  }
  
  .signIn.hover .user {
    display: block;
  }
  
  .signIn.hover .user {
    display: block;
  }
  
  .language .deal, .language .wallet {
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
  
  .deal:hover, .wallet:hover {
    color: @cl_link;
  }
  
  .cursor.wallet, .cursor.deal {
    display: block;
    margin-right: 0;
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
    padding: 0 20px;
    
  }
  
  .cursor.wallet:hover, .cursor.deal:hover {
    background: rgba(240, 239, 247, 1);
    color: rgba(40, 149, 251, 1);
  }
  
  .cursor.cl_gray:hover {
    color: rgba(233, 108, 66, 1);
  }
</style>
