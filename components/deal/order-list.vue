<style scoped lang="less">
  @import "../../static/styles/color";
  
  .exchange-record {
    background-color: @cl_content;
    margin-bottom: 20px;
    font-size: 12px;
    color: @cl_CED3DD;
    .exchange-record_table_body .sale {
      color: @cl_sell;
    }
    
    .exchange-record_table span.tr {
      text-align: right;
    }
    .exchange-record_title {
      color: @cl_8790A1;
      font-size: 14px;
      border-bottom: 1px solid @cl_292E39;
      > span {
        font-weight: bold;
        line-height: 30px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
      }
      .active {
        border-top: 2px solid @cl_link;
        background-color: @cl_292E39;
        color: @cl_link;
      }
    }
    
    .exchange-record_table {
      display: table;
      width: 100%;
    }
    
    .exchange-record_table_header {
      font-size: 12px;
      color: @cl_8790A1;
      display: table-header-group;
    }
    
    .exchange-record_table_header span,
    .exchange-record_table_body span {
      display: table-cell;
      padding: 8px 20px;
      line-height: 22px;
    }
    
    .exchange-record_table_body {
      background-color: @cl_1a2;
      font-size: 12px;
      color: @cl_c5c;
      display: table-row;
    }
    
    .exchange-record_table_body .buy {
      color: @cl_buy;
    }
    .anonymous {
      background: none;
    }
    
    .entrust-list_title {
      padding: 0;
    }
    p.entrust-list_title:first-child {
      margin: 0 10px;
    }
    
    .entrust-list_title {
      color: rgba(197, 195, 221, 1);
    }
    .entrust-list_title.active {
      border-bottom: 2px solid @cl_link;
      color: white;
    }
    /*分页*/
    .paging-source-deal {
      padding: 10px 0;
      text-align: center;
      .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        background: rgba(26, 33, 52, 1);
        border: 1px solid rgba(52, 75, 108, 1);
        color: rgba(189, 188, 203, 1);
      }
    }
    .repeal {
      color: @cl_link;
      cursor: pointer;
    }
  }
  
  .hide-trading .el-checkbox .el-checkbox__label .label-tip {
    font-size: 12px;
    font-weight: 400;
    color: rgba(135, 144, 161, 1);
    line-height: 14px;
  }
  
  .el-checkbox__inner {
    background: none !important;
  }
</style>
<template>
  <div class="exchange-record">
    <div class="exchange-record_title">
      <span
        :class="{'active':changeState==1}"
        @click="tabChange(1)">{{$t('patch.OpenOrder')}}</span>
      <span
        :class="{'active':changeState==2}"
        @click="tabChange(2)">{{$t('patch.TradeHistory')}}</span>
      <span class="right hide-trading">
            <el-checkbox v-model="checked">
              <span class="label-tip">{{$t('c2c.hideCoin')}}</span>
            </el-checkbox>
          </span>
    </div>
    <hex-entrust
      v-show="changeState==1"
      :changeState="changeState"
      :symbleto="symbleto"
      :isSelect="isSelect"
    />
    <hex-transaction
      v-show="changeState==2"
      :changeState="changeState"
      :symbleto="symbleto"
      :isSelect="isSelect"
    />
  </div>
</template>
<script>
  import entrust from '@/components/deal/order-list-entrust'
  import transaction from '@/components/deal/order-list-transaction'
  
  export default {
    name: 'order-list',
    components: {
      'hex-entrust': entrust,
      'hex-transaction': transaction,
    },
    props: {
      symbleto: '',
      ordersymble: '',
      symbleParameString: '',
      dailyDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    watch: {
      'checked': function (val) {
        if (val) {
          this.isSelect = this.ordersymble;
        } else {
          this.isSelect = '';
        }
      }
    },
    data() {
      return {
        //交易记录
        checked: false,
        found: false,
        total: 0,
        tradingRecord: [],
        changeState: 1,
        isSelect: ''
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      //设置订单类型
      tabChange(num) {
        this.changeState = num
      }
    }
  }
</script>
