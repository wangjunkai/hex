<style lang='less' scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/person";
  @import "../../static/styles/table";
  
  .traded_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
  
  .traded_info {
    font-size: 14px;
  }
  
  .traded_info .btc {
    color: @cl_buy;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .traded_info .cny {
    color: @cl_link;
    font-size: 30px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .traded_info .br {
    margin: 0 20px;
    border-right: 1px solid @cl_858;
    display: inline-block;
    height: 20px;
  }
  
  .traded_info_title {
  }
  
  .traded_info_num {
    padding: 4px 0;
  }
  
  .traded_info_address_button {
    color: @cl_link;
    margin-top: 16px;
  }
  
  .traded-block {
    margin-top: 10px;
    background-color: @cl_fff;
  }
  
  .traded-block-title {
    padding: 18px 20px 8px 20px;
  }
  
  .traded-block-title .title_tip {
    font-size: 16px;
    font-weight: bold;
  }
  
  .traded-block-search {
    margin-right: 10px;
    font-size: 14px;
    width: 130px;
    display: inline-table;
    border-collapse: separate;
  }
  
  .traded-block-search input {
    height: 30px;
    line-height: 30px;
    border: 1px solid #DDDDDD;
    display: table-cell;
    width: 100%;
    padding: 5px 10px;
  }
  
  .traded-block-search .search-tip {
    display: table-cell;
    width: 60px;
    background-color: @cl_link;
    color: @cl_fff;
    border: 1px solid @cl_link;
    text-align: center;
  }
  
  .traded-block-search .search-tip::placeholder {
    color: @cl_bbb;
  }
  
  .traded-block-search_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: @cl_fff;
    background-color: @cl_link;
    font-size: 14px;
    width: 60px;
    cursor: pointer;
  }
  
  .traded-block-reset_button {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: @cl_link;
    font-size: 14px;
    width: 60px;
    margin-left: 10px;
    cursor: pointer;
    
  }
  
  .traded .person-block_info {
    line-height: 36px;
  }
  
  .person-block {
    padding: 18px 20px 16px 20px;
  }
  
  .traded-block .search-market {
    margin: 14px 0 10px 20px;
  }
  
  .ordertab {
    padding: 10px 20px;
  }
  
  .ordertab span {
    font-size: 14px;
    padding-bottom: 3px;
    cursor: pointer;
  }
  
  .ordertab span.entrust {
    margin-right: 20px;
  }
  
  .ordertab span.cur {
    color: rgba(40, 149, 251, 1);
    border-bottom: 2px solid rgba(40, 149, 251, 1);
  }
  
  .person-block .person-block_icon.wallet {
    background: url("../../static/images/user/exchange_icon.svg");
  }
</style>
<style lang='less'>
  @import "../../static/styles/color";
  
  .soldout-order-warn {
    width: 360px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    text-align: center;
    color: #333333;
    .icon {
      display: inline-block;
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
    }
    .tip_h1 {
      font-weight: 600;
    }
    .tip_h2 {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .soldout-button {
      display: inline-block;
      width: 180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: @cl_fff;
      background-color: #6F8FF1;
      font-size: 14px;
      margin-bottom: 40px;
      cursor: pointer;
    }
    .el-dialog__body {
      padding: 15px 20px 30px 20px;
      .soldout-button {
        margin: 0;
      }
    }
  }
</style>
<template>
  <div class="traded">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <p class="traded_info_title left">
          <span class="traded_tip">{{$t('legalDeal.fiatdeal')}}</span>
        </p>
      </div>
    </div>
    <div class="traded-block">
      <div class="ordertab">
        <span class=" entrust"
              :class="{'cur':flag==0}"
              @click="changeTab(0,'entrust')">{{$t('legalDeal.resting')}}</span>
        <span
          :class="{'cur':flag==1}"
          @click="changeTab(1,'transaction')">{{$t('memberCenter.dealList')}}</span>
      </div>
      
      <hex-entrust ref="entrust" v-if="flag==0"/>
      <hex-transaction ref="transaction" v-if="flag==1"/>
    </div>
  </div>
</template>

<script>
  import entrust from '@/components/legal/legal-entry-orders'
  import transaction from '@/components/legal/legal-transaction'
  
  export default {
    name: 'legal-currency',
    components: {
      'hex-entrust': entrust,
      "hex-transaction": transaction
    },
    data() {
      return {
        flag: 0
      }
    },
    methods: {
      changeTab(val, name) {
        this.flag = val;
        this.$nextTick(() => {
          if (this.$refs[name]) {
            this.$refs[name].resetSelect();
            this.$refs[name].getUserDeal(true);
          }
        })
      }
    },
    mounted() {
      if (this.$userinfo.uid) {
        this.$store.dispatch('trading_c2c_tencentim_sig_get').then(({data}) => {
          if (data) {
            this.$store.commit('set_server_tencentim_sign', data)
          }
        })
      }
    }
  }
</script>

