<style lang="less" scoped>
  @import "../../static/styles/color";
  
  .noDataText {
    line-height: 120px;
    height: 120px;
    text-align: center;
  }
  
  .coin-title {
    line-height: 40px;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid rgba(30, 34, 42, 1);
  }
  
  .coin-title_item {
    float: left;
    cursor: pointer;
    margin-right: 30px;
    font-weight: 600;
    text-align: center;
    color: rgba(197, 195, 221, 1);
    
  }
  
  .coin-title_item:hover {
    color: @cl_link;
  }
  
  .coin-title .coin-title_item:first-child {
    margin-left: 20px;
  }
  
  .coin-title_item.active {
    /*border-bottom: 2px solid rgba(111, 143, 241, 1);*/
    color: rgba(111, 143, 241, 1);
  }
  
  .coin-list-trades {
    font-size: 14px;
    color: white;
  }
  
  .coin-list-trades .coin-list_content .select {
    width: 4%;
    height: 37px;
  }
  
  .coin-list-trades .market {
    width: 20%;
  }
  
  .coin-list-trades .price {
    width: 36%;
  }
  
  .coin-list-trades .limit {
    width: 20%;
  }
  
  .coin-list-trades .num {
    width: 20%;
  }
  
  .coin-list-trades .market img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 100%;
  }
  
  .coin-list_header {
    font-size: 12px;
    color: #646B8C;
    display: table;
    width: 100%;
    padding: 0 20px;
    background: rgba(250, 250, 253, 1);
    line-height: 40px;
  }
  
  .coin-list_header .select {
    width: 4%;
  }
  
  .coin-list-trades .coin-list_content .body {
    line-height: 40px;
    padding: 0 20px;
  }
  
  .coin-list-trades .coin-list_content .body:hover {
    background: rgba(245, 247, 251, 1);
  }
  
  .coin-list-trades .coin-list_content .body > *,
  .coin-list_header > * {
    float: left;
  }
  
  .coin-list-trades .collect {
    background: url('../../static/images/collect.svg') no-repeat left center;
    background-size: 14px, 14px;
    cursor: pointer;
  }
  
  .coin-list-trades .collect.active {
    background-image: url('../../static/images/collect-active.svg');
  }
  
  .coin-list_content .price_rate {
    font-size: 12px;
    color: @cl_c5c;
    margin-left: 6px;
  }
  
  .coin-list-trades .coin-list_content .updown.i_down {
    color: rgba(233, 108, 66, 1);
  }
  
  .coin-list-trades .coin-list_content .updown.i_down:after {
    background: url('../../static/images/security/i_down.svg') no-repeat;
    content: '';
    display: inline-block;
    width: 9px;
    height: 11px;
    background-size: cover;
    margin-left: 5px;
  }
  
  .coin-list-trades .coin-list_content .updown.i_up {
    color: rgba(3, 191, 123, 1);
  }
  
  .coin-list-trades .coin-list_content .updown.i_up:after {
    color: rgba(3, 191, 123, 1);
    background: url('../../static/images/security/i_up.svg') no-repeat;
    content: '';
    display: inline-block;
    width: 9px;
    height: 11px;
    background-size: cover;
    margin-left: 5px;
  }
  
  .market_from {
    font-weight: 600;
  }
  
  .coin-title_search {
    float: right;
  }
  
  .coin-title_search .search {
    display: inline-block;
    width: 160px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 3px;
    margin-right: 13px;
    background: rgba(30, 34, 42, 1);
    position: relative;
    padding-right: 25px;
    padding-left: 10px;
    color: white !important;
    border: 1px solid rgba(68, 75, 89, 1);
    border-radius: 3px;
    margin-top: 6px;
  }
  
  .coin-title_search input {
    display: inline-block;
    width: 145px;
    line-height: 22px;
    color: white !important;
    background: rgba(30, 34, 42, 1);
  }
  
  .coin-title_search input:focus {
    color: rgba(51, 51, 51, 1);
  }
  
  .coin-title_search .search_coin {
    background-image: url("../../static/images/search.svg");
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
  
  .coin-title_search input:focus + i.search_coin {
    background-image: url("../../static/images/foucs_search.svg");
  }
  
  .noDataText .repeal {
    color: @cl_link;
  }
  
  .trande-rise {
    line-height: 40px;
    overflow: hidden;
    .trande-s {
      li {
        font-size: 14px;
        float: left;
        color: rgba(154, 163, 181, 1);
        height: 40px;
        line-height: 40px;
        .red,
        .green {
          display: inline-block;
          width: 5px;
          height: 6px;
        }
      }
      li.trande-data:hover {
        background-color: #333946;
      }
      .deal-twain {
        width: 29%;
      }
      li.trande-data.deal-twain {
        padding: 0 20px;
      }
      .tac.deal-twain {
        text-align: left;
        padding-left: 29px;
      }
      .real-time-price {
        width: 33%;
        .real-price {
          color: @cl_fff;
        }
        .data-price {
          display: inline-block;
          text-align: left;
          padding-left: 7px;
        }
      }
      .Volume {
        width: 20%;
        .fl {
          float: right;
        }
      }
      .price-limit {
        width: 18%;
        .fl {
          float: right;
        }
      }
      .operation {
        width: 77px;
        text-align: right;
      }
      .rightAlign {
        padding-right: 6px;
      }
      .trande-data {
        /*border-bottom: 1px solid rgba(241, 244, 248, 1);*/
        width: 100%;
        cursor: pointer;
        div {
          float: left;
          color: @cl_fff;
          text-align: right;
          
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
            margin-left: 10px;
          }
          span {
            color: rgb(153, 153, 153);
          }
          .colour {
            margin-left: 10px;
            color: rgb(51, 51, 51);
            font-weight: 600;
            
          }
          .symble {
            font-size: 14px;
            font-weight: bold;
            color: @cl_fff;
          }
          .symbleTo {
            font-size: 14px;
            color: @cl_fff;
          }
        }
        .real-time-price {
          text-align: left;
        }
        .c-green {
          span {
            display: inline-block;
          }
          .i_down:after {
            /*color: rgba(233, 108, 66, 1);*/
            /*padding-right: 20px;*/
            background: url('../../static/images/security/i_down.svg') no-repeat;
            content: '';
            display: inline-block;
            width: 9px;
            height: 11px;
            background-size: cover;
            color: #46B05D;
            margin-left: 5px;
            
          }
          .i_up {
            color: rgba(3, 191, 123, 1);
          }
          .i_down {
            color: rgba(233, 108, 66, 1);
          }
          .i_up:after {
            color: rgba(3, 191, 123, 1);
            background: url('../../static/images/security/i_up.svg') no-repeat;
            content: '';
            display: inline-block;
            width: 9px;
            height: 11px;
            background-size: cover;
            color: #46B05D;
            margin-left: 5px;
          }
          img {
            width: 8px;
            height: 10px;
            position: relative;
            top: 0;
            left: 3px;
          }
        }
        .nams {
          box-sizing: border-box;
          img {
            border-radius: 50%;
          }
        }
        button {
          height: 40px;
          background: url("../../static/images/deals.svg") no-repeat center right;
          text-align: center;
          line-height: 20px;
          border: none;
          outline: none;
          color: white;
        }
        .cancel_collect {
          cursor: pointer;
          width: 14px;
          text-align: center;
          display: inline-block;
          background: url('../../static/images/collect.svg') no-repeat center center;
        }
        .collect {
          cursor: pointer;
          width: 14px;
          text-align: center;
          display: inline-block;
          background: url('../../static/images/collect-active.svg') no-repeat center center;
        }
        
      }
    }
    .trandeTitle {
      padding: 0 20px;
    }
    .more {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-top: 1px solid rgba(133, 131, 172, 0.2);
    }
  }
  
  .sorts {
    color: @cl_999;
    line-height: 7px;
    padding-left: 6px;
    display: inline-block;
    height: 30px;
    /*min-width: 16px;*/
    i {
      display: block;
      width: 10px;
      height: 8px;
    }
    i.sortup {
      display: none;
      background: url('../../static/images/s_up.png') no-repeat center center;
    }
    i.sortdown {
      display: none;
      background: url('../../static/images/s_down.png') no-repeat center center;
    }
    i.sortup.active {
      display: block;
      padding-top: 40px;
      background: url('../../static/images/s_up_check.svg') no-repeat center center;
    }
    i.sortdown.active {
      display: block;
      padding-top: 40px;
      background: url('../../static/images/s_down_check.svg') no-repeat center center;
    }
  }
  
  .trande-rise .trande-s .trande-data div.deal-twain {
    text-align: left;
  }
  
  .cut {
    float: left;
    display: inline-block;
    width: 58px;
    height: 24px;
    line-height: 24px;
    color: #9EAECB;
    border-radius: 2px;
    cursor: pointer;
    background: rgba(65, 72, 87, 1);
    margin: 9px 10px 0 0;
  }
  
  .cut:hover {
    color: #6F8FF1;
  }
  
  .cut:hover:before {
    background-image: url("../../static/images/cut-active.svg");
  }
  
  .cut:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-image: url("../../static/images/cut.svg");
    background-repeat: no-repeat;
    background-size: 8px;
    background-position: center;
    margin: 0 6px;
  }


</style>
<style lang="less">
  @import "../../static/styles/color";
  
  .coin-list .coin-list_content .select {
    width: 4%;
    height: 37px;
  }
  
  .coin-list .coin-list_content .updown.i_down {
    color: @cl_sell;
    padding-right: 15px;
    background: url('../../static/images/decline.svg') no-repeat right center;
  }
  
  .coin-list .coin-list_content .updown.i_up {
    color: @cl_buy;
    padding-right: 15px;
    background: url('../../static/images/rise.svg') no-repeat right center;
  }
  
  .coin-list .coin-list_content .body {
    line-height: 36px;
    padding: 0 20px;
    cursor: pointer;
  }
  
  .coin-list .coin-list_content .body:hover {
    background-color: #333946;
  }
  
  .coin-list .coin-list_content .body > *,
  .coin-list_header > * {
    float: left;
  }
</style>
<template>
  <div
    class="coin-content"
    @click.stop>
    <ul class="coin-title clearfix">
      <li
        class="coin-title_item"
        @click="selectCoin('self')"
        :class="{'active':isSelectCoin=='self'}">{{$t('patch.Favourite')}}
      </li>
      <li
        v-for='(title , index) in $store.state.coinTitleList'
        :key="index"
        :class="{'active':isSelectCoin==title}"
        @click="selectCoin(title)"
        class="coin-title_item">{{global_get_uppercase(title)}}
      </li>
      <li class="coin-title_search">
        <div class="search">
          <input type="text" v-model="searchvalue" :placeholder="$t('wallet.searchCion')">
          <i class="search_coin"></i>
        </div>
      </li>
    </ul>
    <div
      class="coin-list-trades"
      v-loading="coinlistloading">
      <div class="coin-list_content trande-rise">
        <ul class='trande-s trandeTitle tab-header clearfix'>
          <li class='tac deal-twain'>{{$t('patch.Market')}}</li>
          <li class=" real-time-price ovh">
            <div class='fl cursor'>
              <span @click="setsorttype('c')">{{$t("deal.NewTransactionPrice")}}</span>
            </div>
            <div class='fl sorts'>
              <i class="sortup"
                 :class="initsorttypeclass('c',2)"
                 @click="setsorttype('c')"></i>
              <i class="sortdown "
                 :class="initsorttypeclass('c',1)"
                 @click="setsorttype('c')"></i>
            </div>
          </li>
          <li class=' price-limit ovh'>
            <div class='fr sorts'>
              <i class="sortup"
                 :class="initsorttypeclass('limitprice',2)"
                 @click="setsorttype('limitprice')"></i>
              <i class="sortdown "
                 :class="initsorttypeclass('limitprice',1)"
                 @click="setsorttype('limitprice')"></i>
            </div>
            <div class='fr cursor'>
              <span @click="setsorttype('limitprice')">{{$t('home.tradelimitDay')}}</span>
            </div>
          </li>
          <li class='Volume ovh'>
            <div class='fr sorts'>
              <i class="sortup"
                 :class="initsorttypeclass('v',2)"
                 @click="setsorttype('v')"></i>
              <i class="sortdown"
                 :class="initsorttypeclass('v',1)"
                 @click="setsorttype('v')"></i>
            </div>
            <div class='fr cursor'>
              <span @click="setsorttype('v')">{{$t('home.tradeCostDay')}}</span>
            </div>
          </li>
        </ul>
        <div class="scroll-bar"
             :style="{'height':searchlist.length>=8?'320px':''}"
             v-bar>
          <div>
            <ul class='trande-s tab-body clearfix' v-if="!coinlistloading">
              <li class=' trande-data deal-twain'
                  v-for="(tradeData,aindex) in searchlist"
                  :key="aindex"
                  @click="goDeal(tradeData.symble)">
                <div class="deal-twain nams">
                  <span
                    :class="[iscollectList[tradeData.ctid]?'collect':'cancel_collect']"
                    @click.stop="collect(tradeData)">&nbsp;
                </span>
                  <img :src='tradeData.logo' v-if="tradeData.logo" alt="">
                  <span class='colour'>{{tradeData.title }}</span>
                  <span class="symble">{{getSymble(tradeData.symble).from}}</span><span class="symbleTo">/{{getSymble(tradeData.symble).to}}</span>
                </div>
                <div class="real-time-price ovh">
              <span class="real-price">
                {{global_get_tofixed(tradeData.c,global_get_decimal(tradeData.symble).p)}}
              </span>
                  <span class='fz12 c-a data-price '>
               ≈{{$store.getters.get_client_exchange_rate(getSymble(tradeData.symble).to,tradeData.c)}}
                {{$store.getters.get_client_exchange_rate_name.name}}
              </span>
                </div>
                <div class='price-limit c-green '>
                <span
                  :class='tradeData.c-tradeData.o<0?"i_down":"i_up"'>{{getlimitprice(tradeData)}}%</span>
                </div>
                <div class='Volume rightAlign'>
                  {{global_get_tofixed(tradeData.v,global_get_decimal(tradeData.symble).a)}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
  import more from '@/components/public/more'
  
  export default {
    name: 'trade',
    components: {
      'hex-more': more
    },
    props: ['day', 'symbleto', 'dailyDetail'],
    data() {
      return {
        selectcut: '',
        dcs: {},
        total: 0,
        searchvalue: '',
        coinList: [],
        collectchangeval: null,
        isSelectCoin: 'btc',
        getCoinInfoTimer: null,
        noDataText: false,
        searchState: false,
        collecttimer: '',
        loadState: true,
        coinlistloading: false,
        moreState: true,
        sorttypelistactive: {
          type: '',
          value: ''
        },
        isselectcoinlist: [],
        searchlist: [],
        iscollectList: {},
        sub: 'market.tickers'
      }
    },
    watch: {
      'sorttypelistactive': {
        handler: function (val) {
          this.changesearchlist()
        },
        deep: true
      },
      '$userinfo': function (val) {
        if (!val.uid) {
          Object.assign(this.iscollectList, this.global_get_client_collect())
          this._changesearchlist()
        }
      },
      'coinList': {
        handler: function (data) {
          this._changesearchlist()
        },
        deep: true
      },
      'isSelectCoin': function (val) {
        this._changesearchlist()
      },
      'searchvalue': function () {
        this._changesearchlist()
      },
      '$store.state.coinTitleList': function () {
        this.gettitlelist()
      }
    },
    subscribe() {
      return {
        /*订阅自选*/
        changeCollect(res) {
          this.iscollectList[res.key] = res.value
          this._changesearchlist()
        }
      }
    },
    created() {
    
    },
    sockets() {
      return {
        /*订阅的类型*/
        type: this.$socket.type.quotation_daily_getall,
        receive(res) {
          if (res && res.topic == this.sub && !this.coinlistloading) {
            let data = res.data
            if (!Array.isArray(data)) {
              data = data.result
            }
            data.map((item) => {
              delete item.self
            })
            this.coinList = data
          }
        }
      }
    },
    mounted() {
      if (this.$store.state.coinTitleList.length > 0) {
        this.gettitlelist()
      }
      if (window.localStorage.getItem("thisMarket")) {
        this.isSelectCoin = window.localStorage.getItem("thisMarket");
      } else {
        this.isSelectCoin = 'btc';
      }
    },
    methods: {
      gettitlelist() {
        if (this.coinlistloading) {
          return
        }
        this.coinlistloading = true
        this.searchlist = [];
        this.coinList = []
        let l = 0
        this.$store.state.coinTitleList.map((item) => {
          this.$store.dispatch(this.$socket.url.quotation_daily_getall, {ctype: item})
            .then(({data}) => {
              l++
              if (data) {
                data.forEach((_d) => {
                  this.iscollectList[_d.ctid] = _d.self
                })
                this.coinList = this.coinList.concat(data);
              }
              if (l == this.$store.state.coinTitleList.length) {
                this.$nextTick(() => {
                  this.coinlistloading = false
                  if (!this.$userinfo.uid) {
                    Object.assign(this.iscollectList, this.global_get_client_collect())
                  }
                  this.$socket.invoke({
                    sub: this.sub,
                    type: this.$socket.type.quotation_daily_getall
                  })
                })
              }
            })
        })
      },
      _changesearchlist() {
        this.changecoinlist()
        this.changesearchlist()
      },
      changesearchlist() {
        const _this = this;
        /*排序*/
        const sorttype = _this.sorttypelistactive;
        
        /*筛选的值*/
        const value = _this.searchvalue.toLowerCase().replace(/ /g, '');
        
        /*需要筛选的列表*/
        const list = _this.isselectcoinlist;
        
        let searchlist = [];
        /*筛选*/
        if (value) {
          const reg = new RegExp(value, 'g');
          list.map((item) => {
            if (item.symble.search(reg) >= 0) {
              searchlist.push(item)
            }
          })
        } else {
          searchlist = list
        }
        if (sorttype.type) {
          searchlist.sort((a, b) => {
            let newa, newb
            if (sorttype.type == 'limitprice') {
              newa = this.global_get_limitprice(a)
              newb = this.global_get_limitprice(b)
              if (a.c - a.o < 0) {
                newa = newa * -1
              }
              if (b.c - b.o < 0) {
                newb = newb * -1
              }
            } else {
              newa = a[sorttype.type]
              newb = b[sorttype.type]
            }
            return sorttype.value == 1 ? newb - newa : newa - newb
          })
        }
        
        this.searchlist = searchlist;
      },
      changecoinlist(data) {
        data = data ? data : this.coinList
        let _list = []
        if (this.isSelectCoin != 'self') {
          data.forEach((_d) => {
            if (_d.symble.split('/')[1] == this.isSelectCoin.toLowerCase()) {
              _list.push(_d)
            }
          })
        } else {
          for (const _l in this.iscollectList) {
            const newd = data.find((_d) => {
              return _d.ctid == _l
            })
            if (newd && this.iscollectList[_l]) {
              _list.push(newd)
            }
          }
        }
        this.isselectcoinlist = _list
      },
      getlimitprice(item) {
        const p = this.global_get_limitprice(item)
        if (item.c - item.o < 0) {
          return '-' + p
        } else {
          return '+' + p
        }
      },
      getcnyprice(item) {
        if (this.isSelectCoin != this.selectcut && this.selectcut != '--') {
          return this.$store.getters.get_client_exchange_rate(item.symble.split('/')[1], item.c, this.selectcut)
        } else {
          return this.global_get_tofixed(item.c, this.global_get_decimal(item.symble).p)
        }
      },
      changeselectcut() {
        const name = this.$store.getters.get_client_exchange_rate_name.name.toLowerCase()
        if (this.isSelectCoin == 'self') {
          this.selectcut = this.selectcut == '--' ? name : '--'
        } else {
          this.selectcut = this.selectcut == this.isSelectCoin ? name : this.isSelectCoin
        }
      },
      initsorttypeclass(type, value) {
        return (this.sorttypelistactive.type == type && this.sorttypelistactive.value == value) ? 'active' : ''
      },
      setsorttype(type) {// val:2 小到大  1 大到小
        let v = this.sorttypelistactive.value;
        if (this.sorttypelistactive.type == type) {
          v = v == 1 ? 2 : 1;
        } else {
          v = 1;
        }
        this.sorttypelistactive.type = type
        this.sorttypelistactive.value = v
      },
      getClientExchangeRate(tradeData) {
        if (tradeData.symble) {
          let symble = tradeData.symble.split('/');
          if (symble.length > 1) {
            symble = symble[1]
          }
          return this.$store.getters.get_client_exchange_rate(symble, tradeData.c)
        }
      },
      isLogin() {
        return (this.isSelectCoin == 'self' && !this.$userinfo.uid)
      },
      getSymble(s) {
        s = this.global_get_uppercase(s);
        const symble = s.split('/');
        return {
          from: symble[0],
          to: symble[1]
        }
      },
      selectCoin(i) {
        this.isSelectCoin = i
      },
      collect(val) {
        /*清除计时器*/
        if (this.collecttimer) {
          return
        }
        this.collecttimer = true
        
        if (!this.$userinfo.uid) {
          /*设置本地自选*/
          this.$store.commit('set_client_collect', val.ctid)
          Object.assign(this.iscollectList, this.global_get_client_collect())
          this._changesearchlist()
          this.collecttimer = false
          return
        }
        
        let url;
        const isadd = !this.iscollectList[val.ctid]
        isadd ? url = 'user_self_selection_add' : url = 'user_self_selection_delete';
        this.$store.dispatch(url, {ctid: val.ctid}).then((res) => {
          const data = res.data
          if (data) {
            this.iscollectList[val.ctid] = isadd
            this._changesearchlist()
            
            /*推送更新交易头部自选*/
            if (val.ctid == this.dailyDetail.ctid) {
              this.$pubsub.publish(this.$pubsub.changeHeaderCollect, isadd);
            }
            
            this.$store.commit('set_message', {
              type: 'ok',
              text: isadd ? this.$t('c2c.favorite') : this.$t('c2c.unfavorite')
            })
            this.collecttimer = false
          }
        })
      },
      goDeal(coinid) {
        coinid = coinid.replace('/', '_');
        this.$router.push({path: '/deal/pro/' + coinid})
      }
    },
    beforeDestroy() {
      this.$socket.uninvoke(this.$socket.type.quotation_daily_getall)
    }
  }

</script>

