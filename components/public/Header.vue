<template>
  <div class='header clearfix'>
    <nuxt-link class="fl" tag="div" to="/">
      <img class='logo' src="../../static/images/logo.svg" alt="">
      <span class="beta">Beta</span>
    </nuxt-link>
    
    <div class="head-menu fl">
      <div class="header-menu-title cursor"
           :class="{'hover':coinDataState}"
           @mouseenter="showCoinData(true)"
           @mouseleave="showCoinData(false)">
        <span class="meuns">{{$t("home.headCionDeal")}}</span>
      </div>
      <div class="header-menu-title cursor">
        <nuxt-link tag="span" to="/trade" class="meuns">{{$t('legalDeal.fiatdeal')}}</nuxt-link>
        <nuxt-link tag="span" to="/financial" class="meuns">{{$t('manage.management')}}</nuxt-link>
        <nuxt-link tag="span" to="/rebate" class="meuns">{{$t('invitation.Rebate')}}</nuxt-link>
        <nuxt-link tag="span" to="/partner" class="meuns">{{$t('partner.HaderPartner')}}</nuxt-link>
      </div>
      <div class="coin"
           @mouseenter="showCoinData(true)"
           @mouseleave="showCoinData(false)"
           v-show="coinDataState">
        <div class="hx_cion">
          <nuxt-link to="/deal/eth_btc">{{$t('c2c.Basic')}}</nuxt-link>
          <nuxt-link to="/deal/pro/eth_btc">{{$t('c2c.Advanced')}}</nuxt-link>
        </div>
      </div>
    </div>
    
    <div class='header-user-info fr language'>
      <!--交易钱包-->
      <div class="inline-black" v-if="!$store.state.hex_uid.value">
        <nuxt-link class="deal" to="/login">{{$t('legalTrad.entrust')}}</nuxt-link>
        <nuxt-link class=" wallet" to="/login">{{$t('legalTrad.asset')}}</nuxt-link>
      </div>
      <div class="inline-black" v-else>
        <nuxt-link class="deal" to="/person/deal">{{$t('legalTrad.entrust')}}</nuxt-link>
        <nuxt-link class=" wallet" to="/person/wallet">{{$t('legalTrad.asset')}}</nuxt-link>
      </div>
      <!--APP下载-->
      <div class="app-download inline-black">
        <div
          class="signIn por cursor show-title"
          @mouseenter="showdownload(true)"
          @mouseleave="showdownload(false)">
          <span class="app-download-title">APP{{$t('manage.download')}}</span>
          <div class='header-user-info_content app-download'
               @mouseenter="showdownload(true)"
               @mouseleave="showdownload(false)"
               v-show="downloadstate">
            <p class="tac">Android & iOS</p>
            <img :src='qrcode' alt="">
            <p class="tac">{{$t('manage.qrdown')}} HEX APP</p>
          </div>
        </div>
      </div>
      <!--设置币种-->
      <div class="set-currency"
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
      <template v-if="!$store.state.hex_uid.value">
        <nuxt-link class='cursor login' to='/login' tag="span">
          {{$t("home.headLogin")}}
        </nuxt-link>
        <nuxt-link class='cursor register' to='/register' tag="span">
          {{$t("home.headRegister")}}
        </nuxt-link>
      </template>
      <template v-else>
        <div
          class="signIn por cursor"
          @mouseenter="showUserData(true)"
          @mouseleave="showUserData(false)">
          <i class='sign-icon'></i>
          <div class='header-user-info_content'
               @mouseenter="showUserData(true)"
               @mouseleave="showUserData(false)"
               v-show="userstate">
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
      </template>
      <Lang/>
    </div>
  </div>
</template>
<script>
  import * as jsCokie from 'js-cookie'
  import Lang from "./lang";
  import coin from './coin'
  import QRcode from 'qrcode'
  
  export default {
    components: {
      Lang,
      'hex-coin': coin
    },
    computed: {
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
    data() {
      return {
        coinDataState: false,
        userstate: false,
        exchangestate: false,
        downloadstate: false,
        coinTitleActive: '',
        coinSearchString: '',
        status: '0',
        isSignIn: 0,
        cointitle: [],
        coinlists: [],
        mouseState: false,
        cointimer: null,
        usertimer: null,
        downloadtimer: null,
        qrcode: '',
        
      };
    },
    created() {
    },
    mounted() {
      QRcode.toDataURL('https://www.hex.com/mobile/download').then((url) => {
        this.qrcode = url;
      })
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
      showdownload(e) {
        this.downloadtimer && clearTimeout(this.downloadtimer)
        if (!e) {
          this.downloadtimer = setTimeout(() => {
            this.downloadstate = e
          }, 300)
        } else {
          this.downloadstate = e
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
      }
    }
  };

</script>

<style lang="less" scoped>
  @import "../../static/styles/color.less";
  
  .openUp {
    font-size: 12px;
    border: 1px solid rgba(82, 90, 113, 1);
    padding: 0 1px;
    border-radius: 2px;
    color: rgba(118, 127, 154, 1);
  }
  
  .hx_cion {
    width: 80px;
    position: absolute;
    background: rgba(41, 46, 57, 1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-size: 14px;
    color: #ffffff;
    top: 58px;
    height: 80px;
    a {
      font-size: 14px;
      display: block;
      line-height: 40px;
      hieght: 40px;
      text-align: center;
      color: white;
    }
    a:hover {
      color: @cl_link;
      background: rgba(51, 57, 70, 1);
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
    line-height: 50px;
    padding: 0 30px;
    background: @cl_content;
    color: white;
    font-size: 14px;
    width: 100%;
    min-width: 1200px;
    top: 0;
    z-index: 10;
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
      display: inline-block;
      width: 60px;
      color: white;
      text-align: center;
      vertical-align: middle;
      line-height: 15px;
    }
    
    .register {
      border: none;
      margin: 0 20px 0 0px;
      border-left: 1px solid rgba(94, 101, 115, 1);
    }
    .login:hover, .register:hover {
      color: @cl_link;
    }
    
  }
  
  .set-currency {
    width: 20px;
    display: inline-block;
    margin-right: 12px;
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
  
  /*.set-currency_content:before {*/
  /*content: '';*/
  /*display: inline-block;*/
  /*position: absolute;*/
  /*width: 0;*/
  /*height: 0;*/
  /*border-style: solid;*/
  /*border-width: 0 7.5px 10px 7.5px;*/
  /*border-color: transparent transparent rgba(41,46,57,1) transparent;*/
  /*top: -10px;*/
  /*right: 30px;*/
  /*}*/
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
    background-image: url("../../static/images/select_cricle.svg");
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
    position: relative;
    div {
      color: white;
    }
    .coin {
      position: absolute;
      top: -8px;
      left: -15px;
      background: white;
      z-index: 10000;
      width: 100%;
      box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
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
    display: inline-block;
  }
  
  .header-menu-title.hover {
    color: @cl_link;
  }
  
  .header-menu-title .meuns {
    position: relative;
    margin-right: 30px;
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
    .estimate:hover {
      p.estimate-link:after {
        background: url('../../static/images/head-arrow-right_hover.svg') no-repeat right center;
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
  
  .header-user-info .header-user-info_content.app-download {
    background: white;
    width: 200px;
    height: 228px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    img {
      width: 120px;
      height: 120px;
      border: 1px solid #EEEEEE;
      display: block;
      margin: auto;
    }
    p {
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
    p:last-child {
      font-size: 12px;
      color: @cl_link;
      font-weight: normal;
    }
  }
  
  .signIn.show-title:hover {
    span.app-download-title {
      color: @cl_link;
    }
  }
  
  .signIn {
    display: inline-block;
    margin-right: 20px;
    .sign-icon {
      background-image: url("../../static/images/loginIn.svg");
    }
    
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
  
  .signIn:hover .sign-icon {
    background-image: url("../../static/images/loginIn_check.svg");
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
  
  .tolink_memberCenter:hover .userid:after {
    background: url('../../static/images/head-arrow-right_hover.svg') no-repeat right center;
  }
</style>
