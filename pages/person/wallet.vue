<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/person";
  @import "../../static/styles/table";
  
  .balance_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .person-block {
    padding-bottom: 16px;
  }
  
  .balance_info {
    font-size: 14px;
    flex: 1;
  }
  
  .balance_info:first-child {
    min-width: 485px;
  }
  
  .balance_info:first-child {
    border-right: 1px solid rgba(133, 131, 172, 0.2);
  }
  
  .balance_info .btc {
    color: @cl_buy;
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .person-block .person-block_info.manage {
    padding-left: 40px;
  }
  
  .manage.balance_info .btc {
    font-size: 18px;
  }
  
  .manage.balance_info .cny {
    font-size: 14px;
    color: #333;
    font-weight: normal;
  }
  
  .manage.balance_info .coin {
    font-size: 12px;
  }
  
  .balance_info .cny {
    color: @cl_link;
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .balance_info .br {
    margin: 0 20px;
    border-right: 1px solid rgba(133, 131, 172, 0.2);
    display: inline-block;
    height: 20px;
  }
  
  .balance_info_title {
    line-height: 36px;
    margin-bottom: 8px;
  }
  
  .balance_info_num {
    padding: 4px 0;
  }
  
  .balance_info_address_button {
    color: @cl_link;
    margin-top: 16px;
    cursor: pointer;
  }
  
  .balance-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }
  
  .balance-block-title {
    padding: 18px 20px 8px 20px;
  }
  
  .balance-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }
  
  .balance-block-search {
    margin-left: 20px;
    font-size: 14px;
    width: 220px;
    display: inline-flex;
    flex-direction: row;
    height: 30px;
    line-height: 28px;
  }
  
  .balance-block-search input {
    border: 1px solid #DDDDDD;
    width: 100%;
    padding: 5px 10px;
  }
  
  .balance-block-search input.ipt_hover:hover {
    border-right: 0 !important;
  }
  
  .balance-block-search .search-tip {
    width: 60px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
  }
  
  .balance-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }
  
  .hex_table_body .handle {
    color: @cl_link;
    font-size: 12px;
    margin-left: 30px;
    cursor: pointer;
  }
  
  .hex_table_body .handle_no {
    color: @cl_c9c;
    font-size: 12px;
    margin-left: 30px;
    cursor: pointer;
  }
  
  .hex_table_body {
    line-height: 40px;
  }
  
  .hex_table_action {
    position: relative;
  }
  
  .hex_table_action .deal_buttons {
    position: absolute;
    color: @cl_link;
    font-size: 12px;
    padding: 5px 0;
    top: 35px;
    right: -5px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: #fff;
  }
  
  .hex_table_action span.deal {
    line-height: 44px;
    height: 44px;
    display: inline-block;
  }
  
  .hex_table_action .deal_buttons li {
    line-height: 32px;
    text-align: left;
    padding: 0 10px;
    cursor: pointer;
  }
  
  .hex_table_action .deal_buttons li:hover {
    background-color: @cl_f0e;
  }
  
  .hex_table_symble_icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    background: white;
    border-radius: 50%;
  }
  
  .hex_table_action .deal_buttons li.sanj {
    top: -6px;
    right: 12px;
    background: white;
    padding: 0;
    border-bottom-right-radius: 16px;
    border: 1px solid #f3f3f3;
    border-bottom: 0 none;
    border-right: 0 none;
  }
  
  .coinNane {
    position: relative;
    top: 1px;
    padding-left: 5px;
  }
  
  .hex_table_body:last-child {
    border-bottom: none;
  }
  
  .flex {
    display: flex;
    flex-direction: row;
  }
  
  .manage-icon {
    padding: 0px 4px;
    background: @cl_link;
    color: white;
    font-size: 10px;
    border-radius: 2px;
  }
  
  /*11111111111*/
  .trade-top_tip {
    position: relative;
    display: inline-block;
  }
  
  .trade-top_tip.active > i {
    background-image: url("../../static/images/trade/tip-active.svg");
  }
  
  .trade-top_tip > i {
    display: inline-block;
    width: 16px;
    height: 32px;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: 13px 13px;
    background-position: center;
    background-image: url("../../static/images/trade/tip.svg");
    cursor: pointer;
    position: relative;
    top: -2px;
  }
  
  .trade-top_tip .tip_modal {
    padding: 10px;
    width: 320px;
    line-height: 18px;
    font-size: 12px;
    border-radius: 4px;
    background: #21283e;
    box-shadow: 0 2px 4px 0 rgba(100, 107, 140, 0.3);
    opacity: 0.9;
    position: absolute;
    top: 0px;
    left: 25px;
    z-index: 2001;
    .row {
      padding-left: 10px;
      position: relative;
      color: #dee0e6;
      dt {
        position: absolute;
        left: 0;
        top: 7px;
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #9094a4;
        border-radius: 200px;
      }
    }
  }
  
  .trade-top_tip.freeze-coin-hx {
    position: absolute;
    top: 2px;
  }
  
  .trade-top_tip .tip_modal:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5.5px 5.5px 7px 17.5px;
    border-color: #ff000008 #21283e #003eff00 #00ff2b00;
    position: absolute;
    top: 13px;
    left: -22px;
  }
  
  .trade-top_tip.freeze-coin-hx .tip_modal {
    display: none;
    top: 0;
  }
  
  .trade-top_tip.freeze-coin-hx:hover .tip_modal {
    display: block;
  }

</style>
<template>
  <div class="balance">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="flex">
        <div class="person-block_info balance_info">
          <p class="balance_info_title">
            <span class="balance_tip">{{$t('wallet.totalAssets')}}</span>
            <span>
            <span class="person-block_title_tip">
              <span>{{$t('wallet.todayMention')}}：</span>
              <span>{{global_get_tofixed($userinfo.withdrawlimtperday)}} BTC</span>
            </span>
          </span>
          </p>
          <div class="balance_info_num clearfix">
          <span class="left">
            <span class="btc">≈{{totalAssets}}</span>
            <span>BTC</span>
            <span class="br"></span>
            <span class="cny">{{allTransition}}</span>
            <span>{{$store.getters.get_client_exchange_rate_name.name}}</span>
          </span>
          </div>
        </div>
        <!--理财资产-->
        <div class="person-block_info balance_info manage">
          <p class="balance_info_title">
            <span class="balance_tip">{{$t('manage.Financialassets')}}</span>
            <span>
          </span>
          </p>
          <div class="balance_info_num clearfix">
          <span class="left">
            <span class="btc">≈{{managetotalAssets}}</span>
            <span class="coin">BTC</span>
            <span class="br"></span>
            <span class="cny">{{manageallTransition}}</span>
            <span>{{$store.getters.get_client_exchange_rate_name.name}}</span>
          </span>
            <nuxt-link
              to="/person/address/mention-site"
              tag="span" class="balance_info_address_button right">{{$t('wallet.addressManage')}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="balance-block">
      <div class="balance-block-title clearfix">
        <span class="title_tip left">{{$t('wallet.coin')}}</span>
        <div class="right">
          <span @click="hideDriblet">
            <el-checkbox v-model="checked">
              <span class="label-tip">{{$t('wallet.hideCoin')}}</span>
            </el-checkbox>
          </span>
          <div class="balance-block-search">
            <input type="text"
                   :placeholder="$t('wallet.searchCion')"
                   class='ipt_hover'
                   v-model="search"
                   @keyup.enter="searchCoin">
            <span class="search-tip">{{$t('home.searchButton')}}</span>
          </div>
        </div>
      </div>
      <table class="hex_table">
        <thead class="hex_table_header padding br">
        <tr>
          <th class="lt">
            <div>{{$t('wallet.cionShortName')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('wallet.available')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('wallet.freeze')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('wallet.appraisement')}}BTC/{{$store.getters.get_client_exchange_rate_name.name}}</div>
          </th>
          <th class="rt">
            <div>{{$t('home.tradeOperation')}}</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(m,i) in searchList">
          <tr class="hex_table_body padding"
              :class="{'active':isVisibleDetailRow(m.currency.id)}"
              :key="`body-${m.currency.id}`">
            <td>
              <div>
                <img class="hex_table_symble_icon"
                     :src="m.currency.icon"
                     v-if="m.currency.icon"
                     alt="">
                <span class="coinNane">{{m.currency.fullname}}</span>
                <!--只有cnyt和hx有提示-->
                <div
                  v-if="m.currency.fullname=='CNYT'||m.currency.fullname=='HX'"
                  @mouseenter="showManage(i,true)"
                  @mouseleave="showManage(i,false)"
                  :class="{'active':showManage,'coin-hx':m.currency.fullname=='HX'}"
                  class="trade-top_tip ">
                  <i></i>
                  <dl
                    v-show="isShowManage(i)"
                    class="tip_modal">
                    <div
                      class="row">
                      <dd v-if="m.currency.fullname=='CNYT'">
                        {{$t('manage.third-party')}}
                      </dd>
                      <dd v-else>
                        {{$t('manage.launched')}}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div class="inline-black">
                  <i></i>
                  <span class="manage-icon" v-if="m.currency.isfinancing">{{$t('manage.management')}}</span>
                </div>
              </div>
            </td>
            <td class="rt">
              <div>{{global_get_tofixed(m.canuseamount,global_get_decimal(m.currency.currencyname).a)}}</div>
            </td>
            <td class="rt por">
              <div>
                {{global_get_tofixed(getfrozenamount(m.frozenamount,m.lockamount),global_get_decimal(m.currency.currencyname).a)}}
              </div>
              <div
                v-if="m.currency.fullname=='HX'"
                :class="{'freeze-coin-hx':m.currency.fullname=='HX'}"
                class="trade-top_tip active">
                <i></i>
                <dl
                  class="tip_modal">
                  <div
                    class="row">
                    <dd class="lt">
                      {{$t('manage.fNum')}}
                    </dd>
                    <dd class="lt">
                      {{$t('manage.sNum')}}
                    </dd>
                  </div>
                </dl>
              </div>
            </td>
            <td class="rt">
              <div>
                {{global_get_tofixed($store.getters.get_btc_exchange_rate(m.currency.currencyname,m.totalamount),decimal.a)}}/
                {{$store.getters.get_client_exchange_rate_name.mark}}
                {{$store.getters.get_client_exchange_rate(m.currency.currencyname,m.totalamount)}}
              </div>
            </td>
            <td class="rt size0">
              <div class="hex_table_action">
                <span class="handle" v-if="m.currency.isfinancing" @click="goFinancing(m.currency.id)">{{$t('manage.management')}}</span>
                <!--充值-->
                <span class="handle" v-if="m.currency.currencyname=='cnyt'" @click="legalDeal(-1)">{{$t('legalDeal.Buy')}}</span>
                <span class="handle_no" v-else-if="!m.currency.iscandeposit">{{$t('wallet.recharge')}}</span>
                <span class="handle" v-else @click="showDetailRow(m,'chargeMoney')">{{$t('wallet.recharge')}}</span>
                <!--提现-->
                <span class="handle" v-if="m.currency.currencyname=='cnyt'" @click="legalDeal(1)">{{$t('legalDeal.Sell')}}</span>
                <span class="handle_no" v-else-if="!m.currency.iscanwithdraw">{{$t('wallet.withdraw')}}</span>
                <span class="handle" v-else @click="showDetailRow(m,'mentionMoney')">{{$t('wallet.withdraw')}}</span>
                
                <span class="handle_no" v-if="m.listsymble.length<=0">{{$t('wallet.deal')}}</span>
                <span class="handle deal "
                      v-else
                      @mouseenter="showDeal(i,true)"
                      @mouseleave="showDeal(i,false)"
                >{{$t('wallet.deal')}}</span>
                
                <ul class="deal_buttons "
                    @mouseenter="showDeal(i,true)"
                    @mouseleave="showDeal(i,false)"
                    v-show="isShowDeal(i)">
                  <li class="sanj" v-if="m.listsymble.length>0"></li>
                  <li v-for="(symble,i) in m.listsymble"
                      @click="toDeal(symble)"
                      :key="i">
                    {{symble.toUpperCase()}}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <template v-if="isVisibleDetailRow(m.currency.id)">
            <tr class="hex_table_row" :key="m.currency.id">
              <td colspan="5">
                <!--充值-->
                <ChargeMoney
                  v-if="m.type == 'chargeMoney'"
                  :decimal="decimal"
                  :currencyAll="m"></ChargeMoney>
                <!--提现-->
                <MentionMoney
                  v-else
                  @wallet:getInfo="getWalletInfo"
                  :currencyAll="m"
                  :decimal="decimal"
                  :maxmount="$userinfo.withdrawlimtperday"></MentionMoney>
              </td>
            </tr>
          </template>
        </template>
        </tbody>
      </table>
      <div v-if="!loading">
        <div class="anonymous" v-if="foundData">
          <div class="anonymous-pic">
            <img src="~/static/images/user/anonymous.svg" alt="">
          </div>
          <p class="anonymous-tip">
            {{$t('legalTrad.record')}}<span></span>
          </p>
        </div>
      </div>
      <div v-if="loading" class="loadingPic por" v-hex-loading="loading"></div>
    </div>
  </div>
</template>

<script>
  import ChargeMoney from '@/components/deal/charge-money'
  import MentionMoney from '@/components/deal/mention-money'
  import Wallet from '@/components/deal/wallet'
  import more from '@/components/public/more'
  
  export default {
    name: 'articles',
    components: {
      Wallet,
      ChargeMoney,
      MentionMoney,
      'hex-more': more
    },
    computed: {
      totalAssets: function () {
        const _this = this;
        let allbtc = 0;
        this.currencyData.forEach((item) => {
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.totalamount)
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currency.currencyname, item.lockamount)
        });
        _this.decimal = this.global_get_decimal('btc');
        return this.global_get_tofixed(allbtc, _this.decimal.a);
      },
      allTransition: function () {
        let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.totalAssets);
        return alltransition;
      },
      
      managetotalAssets: function () {
        const _this = this;
        let allbtc = 0;
        this.List.forEach((item) => {
          allbtc += this.$store.getters.get_btc_exchange_rate(item.currencyname, item.amount);
        });
        return this.global_get_tofixed(allbtc, _this.decimal.a);
      },
      manageallTransition: function () {
        let alltransition = this.$store.getters.get_client_exchange_rate('btc', this.managetotalAssets);
        return alltransition;
      },
      
      searchList: function () {
        const _this = this;
        const _isCheck = this.checked;
        const list = _this.currencyData;
        const value = _this.search.toLowerCase().replace(/ /g, '');
        let searchary = [];
        if (value) {
          const reg = new RegExp(value, 'g');
          list.map((item) => {
            if (reg.test(item.currency.currencyname)) {
              searchary.push(item)
            }
          });
          return _this.hideDriblet(searchary, _isCheck);
        } else {
          return _this.hideDriblet(list, _isCheck);
        }
      }
    },
    data() {
      return {
        List: [],
        tipstate: false,
        decimal: {},
        foundData: false,
        loading: true,
        chargeMoney: 'chargeMoney',
        mentionMoney: 'mentionMoney',
        visibleDetailRows: [],
        checked: false,
        currencyData: [],
        currencyStatus: true,
        pageindex: 0,
        pagesize: 10,
        search: "",
        dribletCion: [],
        searchResult: [],
        dealtimer: {},
        managetimer: {},
        userassetsfirst: true,
        gofinancingloading: false
      }
    },
    methods: {
      getfrozenamount(f, l) {//f:冻结量 c:可用量 l：锁定量
        return this.$np.plus(f, l);
      },
      goFinancing(id) {
        if (this.gofinancingloading) {
          return
        }
        this.gofinancingloading = true
        this.$store.dispatch('finance_product_search', {
          status: 1,
          currencyid: id,
          type: null,
          cyclestart: null,
          cycleend: null,
          pageindex: 1,
          pagesize: 20
        })
          .then(({data}) => {
            if (data && data.pagedata.length > 0) {
              const d = data.pagedata.sort((itema, itemb) => {
                return (new Date(itema.finishselltime)) - (new Date(itemb.finishselltime))
              })
              this.$router.push({path: '/financial/' + d[0].id})
            }
            else {
              this.$router.push({
                name: 'financial-list',
                query: {
                  currencyid: id,
                  status: 1
                }
              })
            }
            this.gofinancingloading = false
          })
          .catch(() => {
            this.gofinancingloading = false
          })
      },
      getUserassets() {
        this.$store.dispatch("finance_user_assets_getlist", {pageindex: 1, pagesize: 50}).then((res) => {
          if (res.data && res.data.pagedata.length > 0) {
            this.List = res.data.pagedata;
          }
        })
      },
      legalDeal(val) {
        this.$router.push({
          name: 'trade',
          query: {
            direction: val
          }
        })
      },
      hideDriblet(arr, isCheck) {
        if (isCheck) {
          let filterList = [];
          arr.forEach((item) => {
            if (this.$np.plus(item.frozenamount, item.lockamount, item.canuseamount) > 0) {
              filterList.push(item)
            }
          })
          filterList.length > 0 ? this.foundData = false : this.foundData = true;
          return filterList;
        } else {
          arr.length > 0 ? this.foundData = false : this.foundData = true;
          return arr;
        }
      },
      searchCoin() {
        this.search = !this.search;
      },
      getSymbleImg(m) {
        if (!m) return;
        return m.currency.icon
      },
      getSymbleName(m) {
        if (!m) return;
        return m.currency.currencyname.toUpperCase();
      },
      
      toDeal(s) {
        s = s.replace('/', '_');
        this.$router.push({name: 'deal-id', params: {id: s}})
      },
      isVisibleDetailRow(rowid) {
        return this.visibleDetailRows.indexOf(rowid) >= 0
      },
      showDeal(i, m) {
        this.dealtimer[i] && clearTimeout(this.dealtimer[i]);
        if (!m) {
          this.dealtimer[i] = setTimeout(() => {
            this.currencyData[i].showDeal = m;
            this.$forceUpdate()
          }, 300)
        } else {
          this.currencyData[i].showDeal = m;
          this.$forceUpdate()
        }
      },
      showManage(i, m) {
        this.managetimer[i] && clearTimeout(this.managetimer[i]);
        if (!m) {
          this.managetimer[i] = setTimeout(() => {
            this.currencyData[i].showManage = m;
            this.$forceUpdate()
          }, 300)
        } else {
          this.currencyData[i].showManage = m;
          this.$forceUpdate()
        }
      },
      isShowDeal(i) {
        return !!this.currencyData[i].showDeal
      },
      isShowManage(i) {
        return !!this.currencyData[i].showManage
      },
      showDetailRow(row, type) {
        if (type == 'mentionMoney' && (!this.$userinfo.isopenpaypassword)) {
          this.$store.commit('set_message', {type: 'error', text: this.$t('wallet.openPayPassword')});
          this.$router.push('/person/security')
        }
        if (!this.isVisibleDetailRow(row.currency.id)) {
          this.visibleDetailRows = [];
          this.visibleDetailRows.push(row.currency.id)
        } else {
          if (row.type == type) {
            this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(row.currency.id), 1);
          }
        }
        row.type = type;
        
        this.$forceUpdate()
      },
      getWalletInfo() {
        const _self = this;
        this.currencyStatus = true;
        this.loading = true;
        _self.$store.dispatch('user_assets_get', {
          assetstype: 1,
          rows: 100
        }).then(({data}) => {
          if (data) {
            this.currencyData = data;
            /*是否是跳转过来的,展开充币、提币选项*/
            let openTab;
            let id;
            if (this.$route.params.id) {
              openTab = 'chargeMoney'
              id = this.$route.params.id
            } else if (this.$route.params.withdraw) {
              openTab = 'mentionMoney'
              id = this.$route.params.withdraw
            }
            // const id = this.$route.params.assetsid;
            if (id) {
              const active = data.find((item) => {
                return item.currency.id == id;
              })
              this.showDetailRow(active, openTab)
            }
          }
          this.currencyStatus = false;
          this.loading = false;
        })
      }
    },
    mounted() {
      this.getWalletInfo();
      this.getUserassets();
    }
  }
</script>

