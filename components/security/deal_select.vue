<template>
  <div class="baseselect">
    <div class="searchBox">
      <div @click.stop='showdown'
           :class='[ typestate,"ipt_hover",inputStyle?"cl_333":"",ulShow?"hovers":"",changeStype?"cl_66":""]'>
        {{selectVal?global_get_uppercase(selectVal):type}}
      </div>
    </div>
    <div v-show='ulShow' class="skill">
      <div class='skill-ipt'></div>
      <div v-bar>
        <div class="bar-scroll">
          <ul>
            <li v-show='statusa'>{{$t('home.headDataNone')}}</li>
            <li v-show='!statusa'
                :class="{'cur1':index==active}"
                v-for="(item,index) in getCurrencyList"
                :key="index"
                @click.stop='changeVal(item)'>{{global_get_uppercase(item.value?item.value:item.currencyname)}}
            </li>
            <li @click.stop="clearStatus" class="clearStatue">{{$t('wallet.clear')}}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'deal_select',
    props: ["order", 'market', 'type', 'frenchcurrency'],
    // frenchcurrency 用于判断获取币种or交易对
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        getCurrencyList: [],
        ulShow: false, //下拉状态
        selectVal: '', //模拟select获取到option的值
        searchCoin: '', //搜索币种的input
        statusa: false, //没有搜到显示‘暂无改币种’的状态
        stockpile: '',
        active: '',
        inputStyle: false,
        typestate: '',
        changeStype: false,
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.inputStyle = false;
        this.statueShow();
      }
    },
    mounted() {
      document.addEventListener('click', () => {
        if (this.ulShow) {
          this.ulShow = false
        }
      })
      this.statueShow();
    },
    methods: {
      statueShow() {
        this.getCurrencyList = this.order;
        this.typestate = this.market;
        switch (this.typestate) {
          case 'symble':
            this.getSymbols();
            this.selectVal = this.$t('memberCenter.market');
            break;
          case  'ordertype':
            this.selectVal = this.$t('memberCenter.type');
            break;
          case 'direction':
            this.selectVal = this.$t('memberCenter.direction');
            break;
          case 'orderstatus':
            this.selectVal = this.$t('memberCenter.statue');
            break;
          case 'cycleend'://理财周期
            this.selectVal = this.$t('manage.cycle');
            break;
          case 'status'://理财状态
            this.selectVal = this.$t('manage.all');
            break;
          case 'financial'://理财币种
            this.getfinancial();
            this.selectVal = this.$t('legalTrad.Currencies');
            break;
        }
      },
      getfinancial() {
        let postData = {
          "pageindex": 1,
          "pagesize": 100,
          "isfinancing":true
        }
        this.$store.dispatch('com_currency_getpagelist',postData).then(({data}) => {
          if (data) {
            this.getCurrencyList = data.pagedata.map((item) => {
              item.value = item.currencyname;
              item.type = this.market
              return item;
            })
          }
        })
      },
      clearStatus() {
        this.selectVal = this.type;
        this.ulShow = false;
        this.inputStyle = false;
        this.$emit('clearCurrentState', this.market);
      },
      changeBack() {
        this.ulShow = false;
      },
      changeVal(value) {//选中给select赋值
        this.ulShow = false;
        this.selectVal = value.value ? value.value : value.currencyname;
        this.searchCoin = '';
        this.inputStyle = true;
        this.changeStype = false;
        if (this.market == "symble") {
          value.type = 'symble'
        }
        this.$emit('searchData', value)
      },
      getSymbols() {//获取所有交易对
        let url;
        this.frenchcurrency ? url = 'quotation_frenchcurrency' : url = 'com_currency_transaction_symbols';
        this.$store.dispatch(url).then(({data}) => {
          if (data) {
            if (this.frenchcurrency) {//币种  用在法币交易界面
              data.map((item) => {
                let result = {};
                result['value'] = item;
                this.getCurrencyList.push(result);
              });
            } else {
              this.getCurrencyList = data.map((item) => {
                item.value = item.fcsymbol + "/" + item.tcsymbol;
                return item;
              });
            }

          }
        })
      },
      showdown() {
        this.ulShow = !this.ulShow;
        if (this.ulShow) {
          this.$emit("change", this.typestate);
        }
      },
      search(val) {
        if (val) {
          var searchStr = this.searchCoin.replace(/ /g, '').toUpperCase();
          let searchCurrency = [];
          this.stockpile.forEach((item) => {
            if ((item.fullname).indexOf(searchStr) != -1) {
              searchCurrency.push(item)
            }
          });
          if (searchCurrency != '') {
            this.getCurrencyList = searchCurrency;
            this.statusa = false;

          } else {
            this.statusa = true;
          }
        } else {
          this.statusa = false;
          this.getCurrencyList = this.stockpile;
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .bar-scroll {
    max-height: 300px !important;
  }

  .baseselect {
    position: relative;
    .searchBox {
      .ipt_hover {
        width: 100%;
        line-height: 30px;
        height: 32px;
        padding: 0 25px 0 10px;
        border: 1px solid rgba(221, 221, 221, 1);
        color: rgb(187, 187, 187);
        position: relative;
      }
      .ipt_hover:after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 6px;
        background-image: url('./../../static/images/security/an_select_down.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
      .ipt_hover.cl_333 {
        color: #333;
      }
      .ipt_hover.cl_66 {
        color: #aea9a9;
      }
      .ipt_hover:hover {
        border: 1px solid #8583ac;
      }
      .hovers {
        border: 1px solid #8583ac;
      }
      .hovers.ipt_hover:after {
        background-image: url('../../static/images/security/an_select_up.png')
      }
    }
    .skill {
      position: absolute;
      width: 99%;
      background: white;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, .2);
      z-index: 1;
      left: 0.5%;
      .skill-ipt {
        padding: 0 10px;
        box-sizing: border-box;
        input {
          height: 40px;
          display: block;
          border: none;
          border-bottom: 1px solid rgba(216, 216, 216, 1);
          width: 100%;
          font-size: 14px;
        }
      }
      ul {
        /*max-height: 224px;*/
        /*overflow-y: scroll;*/
        /*padding-left: 8px;*/
        li {
          line-height: 32px;
          font-size: 14px;
          color: rgb(51, 51, 51);
          padding: 0 10px;

        }
        li:first-child {
          margin-top: 5px;
        }
        li.clearStatue {
          line-height: 26px;
          background: rgba(240, 239, 247, 1);
          font-size: 12px;
          color: rgba(131, 140, 172, 1);
          text-align: center;
        }
        li:hover,
        li.cur {
          background: rgba(240, 239, 247, 1);
        }

      }
      ul::-webkit-scrollbar {
        width: 8px;
        height: 1px;
      }
      ul::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(144, 147, 153, .3);
      }
      ul::-webkit-scrollbar-track {
        border-radius: 5px;
      }
    }
  }

</style>
