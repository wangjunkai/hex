<template>
  <div class="baseselect">
    <div class="searchBox">
      <div @click='showdown'  :class='["ipt_hover",inputStyle?"cl_333":"",ulShow?"hovers":""]'>{{selectVal?selectVal:"请选择"}}</div>
    </div>
    <div v-show='ulShow' class="skill">
      <div class='skill-ipt'>
        <input type="text"
               :placeholder="$t('home.search')"
               v-model="searchCoin"
               v-on:input="search(searchCoin)"
          @keyup.enter="search(searchCoin)" />
        <!-- <button @click='search(searchCoin)'>搜索</button> -->
      </div>
      <ul>
        <li v-show='statusa'>{{$t('home.headDataNone')}}</li>
        <li v-show='!statusa' 
          :class="{'cur':index==active}" v-for="(item,index) in data" 
          :key="item.countryid" 
          :label="item.name+' +'+item.areacode"
          :value="item.countryid" 
          @click='changeVal( item.name, item.areacode, item.countryid)'>{{item.name}} +{{item.areacode}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hex-select',
    props: ['currency'],
    data() {
      return {
        data: '',
        ulShow: false, //下拉状态
        selectVal: '', //模拟select获取到option的值
        searchCoin: '', //搜索币种的input
        statusa: false, //没有搜到显示‘暂无改币种’的状态
        stockpile: '',
        active: '',
        inputStyle:false
      }
    },
    mounted() {
      this.data = this.stockpile = this.currency;
    },
    methods: {
      selectDown(val) {
        if (val == 'next') {
          this.active = Number(this.active) + 1;
          console.log(this.active)
        }

      },
      changeVal(value, areaCode,countryid) {
        if (areaCode) {
          this.selectVal = value + "  +" + areaCode;
        } else {
          this.selectVal = this.data[areaCode].name + "+" + this.data[areaCode].areacode;
        }
        this.ulShow = false;
        this.searchCoin = '';
        this.inputStyle=true;
        
        this.$emit("getareaCode", areaCode, countryid);
      },
      showdown() {
        this.ulShow = !this.ulShow;
        this.data = this.stockpile;
      },
      search(val) {
        if (val) {
          // var searchStr = this.searchCoin.replace(/ /g, '').toUpperCase();//
          let obj = [];
          this.stockpile.forEach((item) => {
            if ((item.name).indexOf(this.searchCoin) != -1) {
              obj.push(item)
            }
          });
          if (obj != '') {
            this.data = obj;
            this.statusa = false;
          } else {
            this.statusa = true;
          }
        } else {
          this.statusa = false;
          this.data = this.stockpile;
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .baseselect {
    position: relative;
    .searchBox {
      .ipt_hover {
        width: 100%;
        line-height: 40px;
        padding: 0 10px;
        border: 1px solid rgba(221, 221, 221, 1);
        color: rgb(187, 187, 187);
        background: url('./../../static/images/security/an_select_down.png') no-repeat 97% center;
      }
      .ipt_hover.cl_333{
        color:#333;
      }
      .ipt_hover:hover {
        border: 1px solid #8583ac;
      }
      .hovers {
        border: 1px solid #8583ac;
        background: url('./../../static/images/security/an_select_up.png') no-repeat 97% center;
      }
    }
    .skill {
      position: absolute;
      width: 99%;
      background: white;
      box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, .2);
      z-index: 999;
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
        max-height: 224px;
        overflow-y: scroll;
        margin-top: 5px;
        li {
          line-height: 32px;
          font-size: 14px;
          color: rgb(51, 51, 51);
          padding: 0 10px;

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
