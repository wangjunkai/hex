<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/table";

  .person-home {
    font-size: 14px;
  }

  .person-home-tip {
    height: 40px;
    line-height: 40px;
    color: @cl_link;
    font-size: 14px;
    padding: 0 20px 0 46px;
    background: @cl_fff url('./../../static/images/user/inform.svg') no-repeat 20px center;
    background-size: 14px 14px;
  }

  .person-home-block {
    margin-top: 10px;
    background-color: @cl_fff;
    padding: 16px 20px 20px 20px;
    position: relative;
  }

  .person-home-block_icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
  }

  .person-home-block_icon.user {
    background: url("./../../static/images/user/user_icon.svg");
  }

  .person-home-block_icon.wallet {
    background: url("./../../static/images/user/wallet.svg");
  }

  .person-home-block_icon.exchange {
    background: url("./../../static/images/user/exchange_icon.svg");
  }

  .person-home-info {
    padding: 7px 0 0 56px;
  }

  .person-home-info .info {
    font-size: 0;
  }

  .person-home-info .info span {
    font-size: 12px;
    margin-right: 10px;
    padding: 0 4px;
    vertical-align: middle;
  }

  .person-home-info .info span.auth.active {
    background-color: #03BF7B;
    color: #ffffff;
  }

  .person-home-info span.uid {
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
    padding: 0;
  }

  .person-home-info .grade {
    background-color: @cl_f5a;
    color: @cl_fff;
  }

  .person-home-info .auth {
    background-color: @cl_f0e;
    color: @cl_999;
  }

  .person-home-info .info span.country {
    background-color: @cl_f0e;
    color: @cl_333;
    padding-left: 0;
  }

  .person-home-info .country img {
    display: inline-block;
    width: 24px;
    height: 17px;
    vertical-align: text-bottom;
  }

  .person-home-message p {
    float: left;
    width: 40%;
    margin-top: 10px;
    font-size: 14px;
  }

  .person-home-message p:nth-child(2n) {
    width: 60%;
  }

  .person-home-message {
    line-height: 20px;
    margin-top: 5px;
  }

  .person-home-message .title-tip {
    color: @cl_999;
  }

  .person-home-message .auth-tip {
    color: @cl_buy;
  }

  .person-home-message .limit-tip {
    color: @cl_link;
    margin-left: 10px;
    cursor: pointer;
  }

  .person-home-message .grade-tip {
    color: @cl_ea0;
  }

  .person-home-message .middle-tip {
    color: @cl_f5a;
  }

  .person-home-message .tall-tip {
    color: @cl_buy;
  }

  .person-home-message .change-password-button {
    color: @cl_link;
    cursor: pointer;
    margin-left: 40px;
  }

  .person-home-message .click-tip {
    color: @cl_link;
    cursor: pointer;
  }

  .person-home-asset {
    padding-left: 56px;
  }

  .person-home-asset .balance-tip {
    font-size: 16px;
    font-weight: bold;
    float: left;
  }

  .person-home-asset .button-tip {
    font-size: 14px;
    float: right;
  }

  .person-home-asset .button-tip span {
    height: 30px;
    line-height: 30px;
    color: @cl_fff;
    display: inline-block;
    text-align: center;
    padding: 0 10px;
  }

  .person-home-asset .charge-money-button {
    background-color: @cl_buy;
    margin-right: 10px;
    cursor: pointer;
  }

  .person-home-asset .mention-money-button {
    background-color: @cl_link;
    cursor: pointer;
  }

  .person-home-asset .balance-num-tip {
    font-size: 26px;
    color: @cl_buy;
    font-weight: bold;
  }

  .person-home-asset_info {
    line-height: 36px;
  }

  .person-home-asset_info .more-tip {
    font-size: 14px;
    color: @cl_link;
    float: right;
    cursor: pointer;
  }

  .person-home-block.left,
  .person-home-block.right {
    width: 490px;
    height: 160px;
  }

  .person-home-asset_balance {
    margin-top: 8px;
    height: 42px;
  }

  .person-home-asset_cny {
    font-size: 16px;
    color: @cl_666;
    margin-top: 15px;
  }

  .person-home-asset_kind {
    font-size: 14px;
    margin-top: 8px;
  }

  .person-home-asset_kind > span {
    float: left;
    line-height: 20px;
  }

  .person-home-asset_kind > span:nth-child(1) {
    color: @cl_333;
    text-align: left;
    width: 25%;
    font-weight: bold;
  }

  .person-home-asset_kind > span:nth-child(2) {
    color: @cl_333;
    text-align: left;
    width: 25%;
    font-weight: bold;
  }

  .person-home-asset_kind > span:nth-child(3) {
    color: @cl_999;
    text-align: right;
    width: 50%;
  }

  .person-home-block_title {
    padding-left: 56px;
    line-height: 36px;
    font-size: 16px;
    font-weight: bold;
  }

  .person-home-block-deal {
    padding: 16px 0 0 0;
  }

  .person-home-block-deal_title {
    margin-left: 20px;
    margin-bottom: 5px;
  }

  .hex_table {
    border-bottom: 1px solid @cl_dbd;
  }

  .hex_table .hex_table_body .repeal {
    color: @cl_link;
    cursor: pointer;
  }

  .sroll {
    height: 40px;
    float: left;
  }

  .scroll-content {
    position: relative;
  }

  .scroll-wrap {
    height: 40px;
    overflow: hidden;
    float: left;
  }

  .anim {
    transition: all 0.5s;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -40px
  }

  .hex_table_header > span {
    padding: 0 13px;
  }

  .hex_table_body > span {
    padding: 8px 15px;
  }

  .notice-more {
    line-height: 40px;
    color: @cl_link;
    font-size: 14px;
  }

  .hend {
    cursor: pointer;
  }

  .buy {
    color: #46B05D;
  }

  .sale {
    color: #CD4559;
  }

  .loadingPic {
    min-height: 300px;
  }

  .person-home-info .info span.crown {
    padding: 0;
    font-size: 0;
  }

  .person-home-info .info span.crown img {
    width: 24px;
    display: inline;
    vertical-align: middle;
    height: 100%;
  }

  .Asset {
    display: flex;
    flex-direction: row;
    .coinAsset {
      min-width: 200px;
      p {
        font-size: 14px;
        margin-top: 10px;
        color: #666;
        span.total{
          font-size: 18px;
          color:#03BF7B;
          font-weight: bold;
        }
      }
      p:first-child {
        margin-top: 10px;
      }
      .coinNum {
        font-size: 12px;
      }
      .title {
        font-weight: bold;
        color: #333;
      }
    }
  }

</style>
<template>
  <div class="person-home" v-cloak>
    <div class="person-home-tip clearfix">
      <div class="scroll-wrap">
        <div>
          <ul :class="{marquee_top:animate}">
            <li @click="todetail(item,'notice')"
                v-for="(item, index) in marqueeList"
                :key="index"
                class="hend">
              {{item.title}}
            </li>
          </ul>
        </div>
      </div>
      <nuxt-link to="/help/notice" class="notice-more">
        <span class="right">{{$t("memberCenter.more")}}</span>
      </nuxt-link>
    </div>
    <div class="person-home-block clearfix">
      <span class="person-home-block_icon user left"></span>
      <div class="person-home-info">
        <p class="info">
          <span class="uid">UID {{global_get_uid($userinfo.uid)}}</span>
          <span class="grade">LV.{{$userinfo.securitylevel}}</span>
          <nuxt-link v-if="$userinfo.securitylevel<2"
                     class="auth"
                     tag="span"
                     to="/person/authentication">
            {{$t("memberCenter.unverified")}}
          </nuxt-link>
          <span v-else
                class="auth active">{{$t("memberCenter.verified")}}</span>
          <span class="country" v-if="$userinfo.phone&&$userinfo.countryname">
            <img v-if="$userinfo.countryflag" :src="$userinfo.countryflag" alt="">
            {{countryname}}
          </span>
          <span class="crown" v-if="!$userinfo.countryflag">
             <img src="~/static/images/crown.jpg" alt="">
          </span>
        </p>
        <div class="person-home-message clearfix">
          <p v-if="$userinfo.phone">{{global_string_split($userinfo.phone)}}</p>
          <nuxt-link to="/person/security/binding-mobile" tag="p" v-else class="click-tip">
            {{$t("formMenu.bindPhone")}}
          </nuxt-link>
          <p>
            <span class="title-tip title-tip-align">{{$t("formMenu.googleAuthentication")}}：</span>
            <span class="auth-tip" v-if="$userinfo.isopengoogleverify">{{$t("formMenu.open")}}</span>
            <nuxt-link to="/person/security/google" tag="span" v-else class="click-tip">
              {{$t("memberCenter.openGoogle")}}
            </nuxt-link>
          </p>
          <p v-if="$userinfo.email">{{global_string_split($userinfo.email)}}</p>
          <nuxt-link to="/person/security/binding-email-google" tag="p" v-else class="click-tip">
            {{$t("formMenu.bindEmail")}}
          </nuxt-link>
          <p>
            <span class="title-tip title-tip-align">{{$t("memberCenter.passwordClass")}}：</span>
            <span class="grade-tip" v-if="$userinfo.passwordstrength==1">{{$t("formMenu.passwordWeak")}}</span>
            <span class="middle-tip"
                  v-else-if="$userinfo.passwordstrength==2">{{$t("formMenu.passwordMiddle")}}</span>
            <span class="tall-tip"
                  v-else-if="$userinfo.passwordstrength==3">{{$t("formMenu.passwordStrong")}}</span>
            <nuxt-link to="/person/security/password-change" tag="span" class="change-password-button">
              {{$t("memberCenter.modifyPassword")}}
            </nuxt-link>
          </p>
          <p>
            <span
              class="title-tip">{{$t("memberCenter.limit")}}：</span><span>{{$userinfo.withdrawlimtperday}} BTC</span>
            <nuxt-link to="/person/authentication"><span
              class="limit-tip">{{$t("memberCenter.promoteLimit")}}</span>
            </nuxt-link>
          </p>
          <p><span class="title-tip">{{$t("memberCenter.loginInfo")}}：</span><span
            class="title-tip">{{$t("memberCenter.lastLoginTime")}}：
            {{global_get_local_time($userinfo.lastlogintime).format("YYYY-MM-DD HH:mm:ss")}}
            {{$t('home.headLogin')}}IP：{{checkIp($userinfo.lastloginip)}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="clearfix">
      <div class="person-home-block left clearfix">
        <span class="person-home-block_icon wallet left"></span>
        <div class="person-home-asset">
          <p class="person-home-asset_info clearfix">
            <span class="balance-tip">{{$t("memberCenter.walletBalance")}}</span>
            <span class="button-tip">
              <nuxt-link to="person/wallet" tag="span"
                         class="mention-money-button">{{$t("person.chargeMoney")}}</nuxt-link>
            </span>
          </p>
          <p class="person-home-asset_balance">
            <span class="balance-num-tip">
              ≈{{global_get_tofixed($userassets.totalamountbtc,global_get_decimal('btc').a)}}</span>
            BTC
          </p>
          <p class="person-home-asset_cny">
            {{$store.getters.get_client_exchange_rate('btc',$userassets.totalamountbtc)}}
            {{$store.getters.get_client_exchange_rate_name.name}}
          </p>
        </div>
      </div>

      <div class="person-home-block right clearfix">
        <span class="person-home-block_icon wallet left"></span>
        <div class="person-home-asset">
          <p class="person-home-asset_info clearfix">
            <span class="balance-tip">{{$t("memberCenter.assetClasses")}}</span>
            <nuxt-link to="/person/wallet" tag="span" class="more-tip">{{$t("memberCenter.lookAll")}}
            </nuxt-link>
          </p>
          <div>
            <div class="Asset">
              <div class="coinAsset ">
                <div class="coinAsset ">
                  <p class="title">{{$t('manage.Currencyassets')}}</p>
                  <p class="coinNum">
                    <span class="total">≈{{global_get_tofixed($userassets.totalamountbtc,global_get_decimal('btc').a)}}</span>
                    BTC
                  </p>
                  <p class="money">
                    {{ $store.getters.get_client_exchange_rate('btc',$userassets.totalamountbtc)}}
                    {{ $store.getters.get_client_exchange_rate_name.name}}
                  </p>
                </div>
              </div>
              <div class="coinAsset ">
                <p class="title">{{$t('manage.Financialassets')}}</p>
                <p class="coinNum"><span class="total">≈{{totalAssets}}</span>
                  BTC</p>
                <p class="money">{{allTransition}} {{$store.getters.get_client_exchange_rate_name.name}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="person-home-block person-home-block-deal clearfix">
      <div class="person-home-block-deal_title">
        <span class="person-home-block_icon exchange left"></span>
        <span class="person-home-block_title">{{$t("home.userLoginDeal")}}</span>
      </div>
      <dl class="hex_table ">
        <dt class="hex_table_header padding br">
          <span>{{$t("memberCenter.orderTime")}}</span>
          <span>{{$t("memberCenter.market")}}</span>
          <span>{{$t("memberCenter.type")}}</span>
          <span>{{$t("memberCenter.direction")}}</span>
          <span class="rt">{{$t('deal.entrustPrices')}}</span>
          <span class="rt">{{$t('deal.entrustNumber')}}</span>
          <span class="rt">{{$t("memberCenter.turnover")}}</span>
          <span class="rt">{{$t("deal.bargainPrice")}}</span>
          <span class="rt">{{$t("memberCenter.makeprices")}}</span>
          <span class="rt">{{$t("memberCenter.statue")}}</span>
          <span>{{$t("home.tradeOperation")}}</span>
        </dt>
        <dd class="hex_table_body"
            v-for="(m,i) in tradingRecord"
            :key="i">
          <span>{{global_get_local_time(m.createtime).format('YYYY-MM-DD HH:mm:ss')}}</span>
          <span>{{symble(m.symble)}}</span>
          <span>{{global_get_order_type(m.ordertype)}}</span>
          <span
            :class="m.direction>0?'buy':'sale'">{{m.direction>0?$t('memberCenter.buy'):$t('memberCenter.sell')}}</span>
          <span class="rt" v-if=" m.ordertype==1">{{global_get_tofixed(m.price,global_get_decimal(m.symble).p)}}</span>
          <span class="rt" v-else>--</span>

          <span class="rt" v-if="m.ordertype==2&&m.direction==1">
            {{global_get_tofixed(m.amount,global_get_decimal(coinDecimal(m.symble)).a)}}
          </span>
          <span class="rt" v-else>
            {{global_get_tofixed(m.amount,global_get_decimal(m.symble).a)}}
          </span>

          <span class="rt" v-if="m.ordertype==2&&m.direction==1">
            {{global_get_tofixed(getVolume(m),global_get_decimal(m.symble).a)}}
          </span>
          <span class="rt" v-else>
            {{global_get_tofixed(m.transactionamount,global_get_decimal(m.symble).a)}}
          </span>

          <span class="rt">
            {{global_get_tofixed(getavgprice(m),global_get_decimal(m.symble).p)}}
          </span>
          <span class="rt">
            {{global_get_tofixed(m.ordertype==2?m.transactionamount:m.tradeavgprice*m.transactionamount,global_get_decimal(m.symble).p)}}
          </span>
          <span class="rt">
            {{global_get_order_state(m.orderstatus)}}
          </span>

          <span v-if="m.orderstatus==0||m.orderstatus==1"
                @click="setPepeal(m.id)"
                class="repeal">{{$t("memberCenter.revocation")}}</span>
          <span v-else>--</span>
        </dd>
      </dl>
      <div v-if="loading" class="loadingPic por" v-hex-loading="loading">
      </div>
      <div class="anonymous" v-if="found">
        <div class="anonymous-pic">
          <img src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <nuxt-link tag="p" to="/deal/eth_btc" class="anonymous-tip">
          {{$t('legalTrad.record')}}，{{$t('legalTrad.Go')}}<span> {{$t('legalTrad.Trade')}}</span>
        </nuxt-link>
      </div>
      <div class="paging-source" v-if="total>0">
        <el-pagination
          background
          @current-change="handChange"
          :page-size="tradingRecordMax"
          popper-class="paging"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import orderList from '@/components/deal/order-list'
  import more from '@/components/public/more'

  export default {
    name: 'articles',
    components: {
      'hex-order-list': orderList,
      'hex-more': more
    },
    data() {
      return {
        List: [],
        loading: true,
        total: 0,
        found: false,
        tradingRecord: [],
        tradingRecordIndex: 0,
        tradingRecordMax: 20,
        moreState: true,
        animate: false,
        marqueeList: [],
        lang: this.$store.state.hex_lang.locale,
        timer: null,
        countryname: '',
        reg: {
          ip: new RegExp("^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))")
        },
      }
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null
    },
    created() {
      this.timer = setInterval(this.ScrollUp, 10000)
    },
    computed: {
      totalAssets: function () {
        const _this = this;
        let allbtc = 0;
        this.List.forEach((item) => {
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currencyname, item.amount);
        });
        _this.decimal = this.global_get_decimal('btc');
        return this.global_get_tofixed(allbtc, _this.decimal.a);
      },
      allTransition: function () {
        let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
        return alltransition;
      },
      listenLang: function () {
        return this.$store.state.hex_lang.locale;
      },
      getassiselist: function () {
        if (this.$userassets.list) {
          return this.$userassets.list.slice(0, 3);
        } else {
          return null;
        }
      }
    },
    watch: {
      listenLang: function (val) {
        this.lang = val;
        this.getNotice('3581');
        this.changelang();
      }
    },
    methods: {
      getUserassets() {
        this.$store.dispatch("finance_user_assets_getlist", {pageindex: 1, pagesize: 50}).then(({data}) => {
          if (data && data.pagedata.length > 0) {
            this.List = data.pagedata;
          }
        })
      },
      getUserInfo() {
        this.$store.dispatch("user_user").then((res) => {
          if (res.data) {
            this.$store.commit('set_server_user_info', res.data)
          }
        })
      },
      checkIp(val) {
        return this.reg.ip.test(val) ? val : '--';
      },
      getavgprice(m) {
        const ary = [1, 3, 4];
        if (ary.indexOf(m.orderstatus) < 0) {
          return '--'
        } else {
          return m.tradeavgprice
        }
      },
      coinDecimal(coin) {
        return coin.split('/')[1];
      },
      getVolume(coin) {// 已成交=委托量/成交均价
        return coin.amount / coin.tradeavgprice
      },
      changelang() {
        let countryid = this.$userinfo.countryid;
        this.$store.dispatch('com_country_getlist').then(({data}) => {
          data.find((item) => {
            if (countryid == item.countryid) {
              if (this.lang == 'en_us') {
                this.countryname = item.engname;
                return;
              } else {
                this.countryname = item.name;
                return;
              }
            }
          });
        })
      },
      handChange(val) {
        this.getUserDeal(val);
      },
      todetail(data, title) {
        if (!data.articlehref) {
          this.$router.push({name: 'help-help-detail', query: {type: data.menutype, id: data.id, title: title}})
        } else {
          window.location.href = data.articlehref;
        }
      },
      ScrollUp() {
        if (this.marqueeList.length > 1) {
          this.animate = true;
          setTimeout(() => {
            this.marqueeList.push(this.marqueeList[0]);
            this.marqueeList.shift();
            this.animate = false;
          }, 3000)
        }
      },
      getNotice() {
        let postData = {
          pageindex: 1,
          pagesize: 100
        }
        postData.menutype = 3581;
        this.$store.dispatch("com_article_search", postData).then(({data}) => {
          if (data) {
            let filterLang = [];
            data.pagedata.map((item) => {
              if (item.title.indexOf(this.lang) != -1) {
                item.title = item.title.split(this.lang + '-')[1];
                filterLang.push(item);
              }
            })
            this.marqueeList = filterLang;
          }
        })
      },
      symble(s) {
        if (s) {
          return s.toUpperCase()
        }
      },
      //撤销订单
      setPepeal(id) {
        this.$store.dispatch('trading_order_cancel', {orderId: id}).then((res) => {
          if (res.data) {
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            // this.getUserDealMore()
          }
        })
      },
      getUserDeal(val) {
        !val ? this.tradingRecordIndex = 1 : this.tradingRecordIndex = val;
        this.$store.dispatch('trading_order_search', {
          pagesize: this.tradingRecordMax,
          pageindex: this.tradingRecordIndex
        })
          .then(({data}) => {
            if (data) {
              this.total = data.totalitemcount;
              this.tradingRecord = data.pagedata;
              this.loading = false;
            } else {
              this.total = 0;
              this.found = true;
              this.tradingRecord = [];
              this.loading = false;
            }
          })
      }
    },
    mounted() {
      this.getUserassets();
      this.getUserDeal();
      //用户信息
      this.getNotice();
      //余额
      this.moreState = true;
      this.changelang();
      this.getUserInfo();
    }
  }
</script>

