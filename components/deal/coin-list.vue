<style lang="less" scoped>
  @import "../../static/styles/color";
  
  .dealcoin-list {
    height: 388px;
    background-color: @cl_content;
    margin-bottom: 6px;
    .coin-title {
      color: @cl_8790A1;
      border-bottom: 1px solid @cl_292E39;
      font-size: 14px;
      .coin-title_item {
        line-height: 30px;
        height: 30px;
        float: left;
        text-align: center;
        padding: 0 10px;
        cursor: pointer;
        font-weight: 600;
      }
      
      .coin-title_item.active {
        color: @cl_link;
        border-top: 2px solid @cl_link;
        background-color: @cl_292E39;
        line-height: 26px;
      }
      .coin-title_item:hover {
        color: @cl_link;
      }
    }
    .coin-search {
      margin: 6px 8px 0 8px;
      color: @cl_8790A1;
      font-size: 12px;
      height: 24px;
      .search {
        display: inline-block;
        width: 90px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 7px;
        border: 1px solid @cl_292E39;
        position: relative;
        padding-right: 25px;
        padding-left: 10px;
        float: left;
        input {
          line-height: 1;
          color: #ffffff;
          width: 100%;
          background-color: transparent;
        }
        input:focus + .search_coin {
          background-image: url("../../static/images/foucs_search.svg");
          
        }
        .search_coin {
          background-image: url("../../static/images/search.svg");
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: cover;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 8px;
        }
      }
      .sort {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        border: 1px solid @cl_292E39;
        border-radius: 2px;
        width: 108px;
        text-align: center;
        overflow: hidden;
        float: right;
        .sort_item {
          float: left;
          width: 50%;
          cursor: pointer;
        }
        .sort_item.active {
          background-color: @cl_292E39;
          color: @cl_link;
        }
      }
      .cut {
        float: left;
        display: inline-block;
        width: 52px;
        height: 24px;
        line-height: 24px;
        background-color: #292E39;
        color: #9EAECB;
        border-radius: 2px;
        cursor: pointer;
      }
      .cut.active,
      .cut:hover {
        color: #6F8FF1;
      }
      .cut.active:before,
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
        margin: 0 2px 0 6px;
      }
    }
    
    .coin-content {
      position: relative;
      font-size: 12px;
      color: @cl_CED3DD;
      .market {
        width: 77px;
      }
      
      .price {
        width: 90px;
        .sort {
          line-height: 7px;
          padding-top: 7px;
          padding-left: 3px;
          display: inline-block;
          height: 30px;
          i {
            display: block;
            width: 10px;
            height: 8px;
          }
          i.sortup {
            background: url('../../static/images/s_up.png') no-repeat center center;
          }
          i.sortdown {
            background: url('../../static/images/s_down.png') no-repeat center center;
          }
        }
      }
      
      .limit {
        width: 71px;
      }
      
      .market img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 100%;
      }
      .colour {
        color: #8790A1;
        .market_from {
          color: #CED3DD;
          font-weight: 600;
        }
      }
      
      .coin-list_content .body > *,
      .coin-list_header > * {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .coin-list_header {
        font-size: 12px;
        color: @cl_5E6573;
        display: table;
        width: 100%;
        line-height: 30px;
        padding: 0 8px 0 8px;
        .select {
          width: 14px;
          margin-right: 8px;
          height: 30px;
        }
      }
      .coin-list_content {
        overflow-x: hidden;
        height: 295px;
        padding-bottom: 5px;
        .price_rate {
          font-size: 12px;
          color: @cl_c5c;
          margin-left: 6px;
        }
        .select {
          width: 14px;
          margin-right: 8px;
          height: 100%;
          background-position: center 8px;
        }
        
        .updown.i_down {
          color: @cl_sell
        }
        
        .updown.i_up {
          color: @cl_buy;
        }
        
        .body {
          height: 30px;
          line-height: 30px;
          padding: 0 8px 0 8px;
          cursor: pointer;
        }
        
        .body:hover {
          background-color: @cl_282D37;
        }
      }
      
      .el-scrollbar__thumb {
        background-color: rgba(41, 50, 76, 1);
      }
      
      .el-scrollbar__thumb:hover {
        background-color: rgba(41, 50, 76, 1);
      }
      .collect {
        background-image: url('../../static/images/collect.svg');
        background-repeat: no-repeat;
        background-size: 14px, 14px;
        background-position: left center;
        cursor: pointer;
      }
      
      .collect.active {
        background-image: url('../../static/images/collect-active.svg');
      }
    }
    .nodata {
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      font-size: 14px;
      color: @cl_8790A1;
      .repeal {
        color: @cl_link;
      }
    }
  }
  
  .sorts {
    color: @cl_999;
    padding-left: 3px;
    display: inline-block;
    height: 30px;
    i {
      display: inline-block;
      width: 10px;
      height: 6px;
      position: relative;
      top: -1px;
    }
    i.sortup {
      background: url('../../static/images/s_up.png') no-repeat center center;
    }
    i.sortdown {
      background: url('../../static/images/s_down.png') no-repeat center center;
    }
    i.sortup.active {
      background: url('../../static/images/s_up_check.svg') no-repeat center center;
    }
    i.sortdown.active {
      background: url('../../static/images/s_down_check.svg') no-repeat center center;
    }
  }
</style>
<template>
  <div class="dealcoin-list">
    <ul class="coin-title clearfix">
      <li
        class="coin-title_item"
        @click.stop="selectCoin('self')"
        :class="{'active':isSelectCoin=='self'}">{{$t('patch.Favourite')}}
      </li>
      <li
        v-for='(title , index) in $store.state.coinTitleList'
        :key="index"
        :class="{'active':isSelectCoin==title}"
        @click.stop="selectCoin(title)"
        class="coin-title_item">{{global_get_uppercase(title)}}
      </li>
    </ul>
    <div class="coin-search">
      <div class="search">
        <input type="text" v-model="searchvalue">
        <i class="search_coin"></i>
      </div>
      <div class="cut" :class="{'active':selectcut}" @click="selectcut = !selectcut">
        {{$store.getters.get_client_exchange_rate_name.name.toUpperCase()}}
      </div>
      <div class="sort clearfix">
        <span class="sort_item"
              :class="{'active':sortitemstate==1}"
              @click="sortitemstate=1">{{$t('home.tradelimit')}}</span>
        <span class="sort_item"
              :class="{'active':sortitemstate==2}"
              @click="sortitemstate=2">{{$t('home.turnover')}}</span>
      </div>
    </div>
    <div class="coin-content">
      <div class="coin-list_header">
        <span class="select"></span>
        <span class="market ovh cursor">
          <span
            class='fl'
            @click="setsorttype('symble')">{{$t('home.tradeOn')}}</span>
          <span class='fl sorts' v-if="sorttypelistactive.type=='symble'">
            <i class="sortup"
               v-if="sorttypelistactive.value==2"
               :class="initsorttypeclass('symble',2)"
               @click="setsorttype('symble')"></i>
            <i class="sortdown"
               v-if="sorttypelistactive.value==1"
               :class="initsorttypeclass('symble',1)"
               @click="setsorttype('symble')"></i>
          </span>
        </span>
        
        <span class="price ovh cursor">
          <span
            class='fl'
            @click="setsorttype('price')">{{$t('memberCenter.price')}}</span>
          <span class='fl sorts' v-if="sorttypelistactive.type=='price'">
            <i class="sortup"
               v-if="sorttypelistactive.value==2"
               :class="initsorttypeclass('price',2)"
               @click="setsorttype('price')"></i>
            <i class="sortdown"
               v-if="sorttypelistactive.value==1"
               :class="initsorttypeclass('price',1)"
               @click="setsorttype('price')"></i>
          </span>
        </span>
        <span class="limit rt cursor"
              v-show="sortitemstate==1">
           <span class='fr sorts' v-if="sorttypelistactive.type=='limitprice'">
            <i class="sortup"
               v-if="sorttypelistactive.value==2"
               :class="initsorttypeclass('limitprice',2)"
               @click="setsorttype('limitprice')"></i>
            <i class="sortdown"
               v-if="sorttypelistactive.value==1"
               :class="initsorttypeclass('limitprice',1)"
               @click="setsorttype('limitprice')"></i>
          </span>
          <span
            class='fr'
            @click="setsorttype('limitprice')">{{$t('home.tradelimit')}}</span>
        </span>
        <span class="limit rt cursor"
              v-show="sortitemstate==2">

           <span class='fr sorts' v-if="sorttypelistactive.type=='volume'">
            <i class="sortup"
               v-if="sorttypelistactive.value==2"
               :class="initsorttypeclass('volume',2)"
               @click="setsorttype('volume')"></i>
            <i class="sortdown "
               v-if="sorttypelistactive.value==1"
               :class="initsorttypeclass('volume',1)"
               @click="setsorttype('volume')"></i>
          </span>
          
          <span
            class='fr'
            @click="setsorttype('volume')">{{$t('home.turnover')}}</span>
        </span>
      </div>
      <div v-bar
           v-hex-loading="coinlistloading"
           ref="coin-list"
           class="coin-list_content hex-loading">
        <div>
          <div class="body clearfix"
               v-for="(item,i) in searchlist"
               @click="goDeal(item.symble)"
               :key="i">
            <span
              class="select collect"
              :class="{'active':iscollectList[item.ctid]}"
              @click.stop="collect(item)"
            ></span>
            <div class='market'>
              <span class='colour'>
                <span class="market_from">{{getSymble(item.symble).from}}</span>/{{getSymble(item.symble).to}}</span>
            </div>
            <div class="price">
              <span>{{getcnyprice(item)}}</span>
            </div>
            <div class="limit rt" v-show="sortitemstate==1">
              <span class="updown" :class='item.c - item.o<0?"i_down":"i_up"'>
                 {{getlimitprice(item)}}%
              </span>
            </div>
            <div class="limit rt" v-show="sortitemstate==2">
              {{toformatvolume(global_get_tofixed(getvolume(item),global_get_decimal(item.symble).a))}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
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
    props: ['day', 'symbleto', 'dailyDetail'],
    data() {
      return {
        searchlist: [],
        selectcut: false,
        searchvalue: '',
        coinList: [],
        socketcoinlist: [],
        collectchangeval: null,
        isSelectCoin: 'self',
        iscollectList: {},
        isselectcoinlist: [],
        coinlistloading: false,
        getCoinInfoTimer: null,
        noDataText: false,
        collecttimer: null,
        searchState: false,
        sortitemstate: 1,
        sorttypelistactive: {
          type: 'limitprice',
          value: '1'
        },
        sub: 'market.tickers'
      };
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
    mounted() {
      if (this.$store.state.coinTitleList.length > 0) {
        this.gettitlelist()
      }
      this.isSelectCoin = this.symbleto.toLowerCase()
    },
    /*订阅socket相关*/
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
    methods: {
      /*获取coinlist以及订阅socket*/
      gettitlelist() {
        if (this.coinlistloading) {
          return
        }
        this.coinlistloading = true
        this.searchlist = []
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
            } else if (sorttype.type == 'volume') {
              newa = this.getvolume(a)
              newb = this.getvolume(b)
            } else if (sorttype.type == 'symble') {
              newa = a.symble
              newb = b.symble
              if (sorttype.value == 1) {
                if (newa > newb) {
                  return 1;
                }
                if (newa < newb) {
                  return -1;
                }
                return 0;
              } else {
                if (newa < newb) {
                  return 1;
                }
                if (newa > newb) {
                  return -1;
                }
                return 0;
              }
              
            } else {
              newa = a.c
              newb = b.c
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
      toformatvolume(num) {
        if (num) {
          const _n = num.toString().split('.')[0]
          if (_n.length >= 8) {
            return _n
          } else {
            return parseFloat(num).toFixed(2)
          }
        } else {
          return 0
        }
      },
      getcnyprice(item) {
        if (this.selectcut) {
          return this.$store.getters.get_client_exchange_rate(item.symble.split('/')[1], item.c, this.$store.getters.get_client_exchange_rate_name.name)
        } else {
          return this.global_get_tofixed(item.c, this.global_get_decimal(item.symble).p)
        }
      },
      initsorttypeclass(type, value) {
        return (this.sorttypelistactive.type == type && this.sorttypelistactive.value == value) ? 'active' : ''
      },
      setsorttype(type) {// val:2 小到大  1 大到小
        let v = this.sorttypelistactive.value
        v = v == 1 ? 2 : 1
        this.sorttypelistactive.type = type
        this.sorttypelistactive.value = v
      },
      isLogin() {
        return (this.isSelectCoin == 'self' && !this.$userinfo.uid)
      },
      mouseleave() {
        this.$emit('coin:mouseleave')
      },
      getSymble(s) {
        s = this.global_get_uppercase(s)
        const symble = s.split('/')
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
        
        const isadd = !this.iscollectList[val.ctid]
        
        if (!this.$userinfo.uid) {
          /*设置本地自选*/
          this.$store.commit('set_client_collect', val.ctid)
          Object.assign(this.iscollectList, this.global_get_client_collect())
          this._changesearchlist()
          
          /*推送更新交易头部自选*/
          if (val.ctid == this.dailyDetail.ctid) {
            this.$pubsub.publish(this.$pubsub.changeHeaderCollect, isadd);
          }
          
          this.collecttimer = false
          return
        }
        
        let url;
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
        this.$router.push({path: '/deal/' + coinid})
      },
      /*获取成交额*/
      getvolume: function (item) {
        return this.$np.strip(item.v * item.c)
      },
      getCoinInfo() {
        const _self = this
        if (this.isSelectCoin == 'self' && !this.$userinfo.uid) {
          return
        }
        /*清除计时器*/
        if (this.getCoinInfoTimer) {
          clearTimeout(this.getCoinInfoTimer)
          this.getCoinInfoTimer = null
        }
        /*设置loading*/
        this.coinlistloading = this.isselectcoinlist.length <= 0
        
        const a = function (isSelectCoin) {
          let parame = {}
          let url = 'user_self_selection_getlist'
          if (isSelectCoin !== 'self') {
            parame = {ctype: isSelectCoin}
            url = 'quotation_daily_getall'
          }
          _self.$store.dispatch(url, parame).then(({data}) => {
            _self.coinList[isSelectCoin] = data ? data : []
            _self.coinlistloading = false
            if (isSelectCoin === _self.isSelectCoin) {
              _self.isselectcoinlist = data ? data : []
            }
          })
        }
        this.getCoinInfoTimer = setTimeout(() => {
          a(this.isSelectCoin)
        }, 500)
      }
    }
  };

</script>
