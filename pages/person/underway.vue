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
    width: 200px;
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
  }

  .traded .person-block_info {
    line-height: 36px;
  }

  .hex_table_body td, .hex_table_header th {
    padding: 0 10px;
  }
</style>
<template>
  <div class="traded">
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <p class="traded_info_title left">
          <span class="traded_tip">{{$t('home.userLoginDeal')}}</span>
          <span class="person-block_title_tip">{{$t('person.underway')}}</span>
        </p>
        <div class="right">
          <div class="traded-block-search">
            <input type="text" :placeholder="$t('wallet.searchCion')" class=' ipt_hover'>
          </div>
          <div class="traded-block-search">
            <input type="text" :placeholder="$t('wallet.searchCion')" class=' ipt_hover'>
          </div>
          <div class="traded-block-search">
            <input type="text" :placeholder="$t('wallet.searchCion')" class=' ipt_hover'>
          </div>
          <span class="traded-block-search_button">{{$t('wallet.inquire')}}</span>
        </div>
      </div>
    </div>
    <div class="traded-block">
      <table class="hex_table">
        <thead class="hex_table_header padding br">
        <tr>
          <th class="lt">
            <div>{{$t('memberCenter.orderTime')}}</div>
          </th>
          <th class="lt">
            <div>{{$t('memberCenter.dealTime')}}</div>
          </th>
          <th class="lt">
            <div>{{$t('memberCenter.market')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.type')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.direction')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.prices')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.turnover')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.unturnover')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.prices')}}</div>
          </th>
          <th class="rt">
            <div>{{$t('memberCenter.statue')}}</div>
          </th>
          <th class="rt">
            <span>{{$t('home.tradeOperation')}}</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="hex_table_body padding"
            v-for="(coins,index) in orderDetail"
            :key="index">
          <td class="lt">
            {{global_get_local_time(coins.createtime).format('YYYY-MM-DD HH:mm:ss')}}
          </td>
          <td class="lt">
            {{getRecordTime(coins)}}
          </td>
          <td class="lt">
            {{global_get_uppercase(coins.symble)}}
          </td>
          <td class="rt">
            {{global_get_order_type(coins.ordertype)}}
          </td>
          <td class="rt" :class="{'success':coins.direction==1,'fail':coins.direction==-1}">
            {{global_get_order_direction(coins.direction)}}
          </td>
          <td class="rt">
            {{coins.price}}
          </td>
          <td class="rt">
            {{coins.transactionamount}}
          </td>
          <td class="rt">
            {{coins.amount-coins.transactionamount}}
          </td>
          <td class="rt">
            {{getAllPrice(coins)}}
          </td>
          <td class="rt">
            {{global_get_order_state(coins.orderstatus)}}
          </td>
          <td class="ct">
            <span v-if="coins.orderstatus==0||coins.orderstatus==1"
                  @click="setPepeal(coins.id,index)"
                  class="handle">{{$t('memberCenter.revocation')}}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <hex-more
        @more:get="getUserDeal"
        :index="orderModel.pageindex"
        :max="orderModel.pagesize"
        :list="orderDetail"
        :state="orderState"></hex-more>
    </div>
  </div>
</template>

<script>
  import more from '@/components/public/more'

  export default {
    name: 'articles',
    components: {
      'hex-more': more
    },
    data() {
      return {
        orderState: true,
        orderModel: {
          pageindex: 0,
          pagesize: 10,
          orderstatus: '0,1'
        },
        orderDetail: []
      }
    },
    mounted() {
      this.getUserDeal()
    },
    methods: {
      getRecordTime: function (coins) {
        return coins.updatetime ? this.global_get_local_time(coins.updatetime).format('YYYY-MM-DD HH:mm:ss') : '--'
      },
      getAllPrice(coins) {
        const p = coins.price * coins.transactionamount
        if (!p) return p.toFixed(2)
        return this.global_get_tofixed(p)
      },
      //过去用户交易记录
      getUserDeal() {
        this.orderState = true
        this.orderModel.pageindex++
        this.$store.dispatch('trading_order_search', this.orderModel).then(({data}) => {
          if (data) {
            this.orderDetail = this.orderDetail.concat(data.pagedata)
          }
          this.orderState = false
        })
      },
      setPepeal(id, index) {
        this.$store.dispatch('trading_order_cancel', {orderId: id}).then((res) => {
          if (res.data) {
            this.$store.commit('set_message', {type: 'ok', text: res.msg})
            this.orderDetail.splice(index, 1)
          }
        })
      }
    }
  }
</script>

