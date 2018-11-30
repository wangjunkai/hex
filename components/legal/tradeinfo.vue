<style lang='less' scoped>
  .hex_table_row td {
    padding: 0;
    border: none;
  }
</style>
<template>
  <tr class="hex_table_row">
    <td colspan="8">
      <div class="trade-table-detail clearfix">
        <div class="deal-info">
          <p class="info_title">{{$t('legalTrad.Tradeinformation')}}</p>
          <dl class="info_content">
            <div class="row">
              <dt>{{$t('memberCenter.prices')}}:</dt>
              <dd>
                <p class="value price">{{unitprice+' '+ legalname}}({{$t('legalTrad.Refresh')}})</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{$t('legalTrad.Quantity')}}:</dt>
              <dd><p class="value">{{item.enableamount}} {{global_get_uppercase(item.currencyname)}}</p>
              </dd>
            </div>
            <div class="row">
              <dt>{{$t('legalTrad.Quota')}}:</dt>
              <dd><p class="value">{{$parent.getminprice(item)}}</p></dd>
            </div>
            <div class="row">
              <dt>{{$t('legalTrad.Seller')}}:</dt>
              <dd><p class="value">{{item.nikename}}</p></dd>
            </div>
            <div class="row">
              <dt>{{$t('c2c.PaymentMethod')}}:</dt>
              <dd><p class="value">{{$parent.getpaytypestring(item)}}</p></dd>
            </div>
            <div class="row">
              <dt>{{$t('legalTrad.Location')}}:</dt>
              <dd><p class="value">{{$parent.getarea(item)}}</p></dd>
            </div>
          </dl>
          <P class="deal_tip">{{$t('legalTrad.reminder')}}:</P>
          <p class="deal_tip_info">{{$t('legalTrad.suggested')}}</p>
        </div>
        <div class="buy-info">
          <p class="info_title">{{$t('c2c.Purchase')}}</p>
          <div class="buy_buttons_group" :class="{'group--error':$v.orderaddmodel.amount.$error}">
            <p class="buttons_title clearfix">
              <span class="left">{{$t('legalTrad.Tradequantity')}}</span>
              <span v-if="!$v.orderaddmodel.amount.$require" class="right require_tip ts--opacity">{{$t('c2c.agreater')}}</span>
              <span v-if="!$v.orderaddmodel.amount.$ismax" class="right require_tip ts--opacity">{{$t('c2c.Cannotmaximum')}} {{item.enableamount}}</span>
            </p>
            <trade-number
              @number:focus="selecttrade='from'"
              :num.sync="$v.orderaddmodel.amount.$model"
              :tip="global_get_uppercase(item.currencyname)"></trade-number>
          </div>
          <div class="buy_buttons_group" :class="{'group--error':$v.orderaddmodel.price.$error}">
            <p class="buttons_title clearfix">
              <span class="left">{{$t('legalTrad.Tradeamount')}}</span>
              <span v-if="!$v.orderaddmodel.price.$require"
                    class="right require_tip ts--opacity">{{$t('c2c.greater')}}</span>
              <span v-if="!$v.orderaddmodel.price.$ismin" class="right require_tip ts--opacity">{{$t('c2c.minimum')}} {{item.minprice}}</span>
              <span v-if="!$v.orderaddmodel.price.$ismax" class="right require_tip ts--opacity">{{$t('c2c.maximum')}} {{item.maxprice}}</span>
            </p>
            <trade-number
              @number:focus="selecttrade='to'"
              :num.sync="$v.orderaddmodel.price.$model"
              :tip="global_get_legaltype(item.legaltype).name"></trade-number>
          </div>
          
          <div class="buy_protocol ovh">
            <p class="fl" @click="ischecked=!ischecked">
              <span class="checkbox" :class="{'active':ischecked}"></span>
              <span class="">{{$t('legalTrad.agreed')}}</span>
            </p>
            <span class="buy_protocol_tip fl" @click="popup">{{$t('legalTrad.agreement')}}</span>
          </div>
          <terms @close="popup" v-show="popupStatue" :article="article"/>
          <div>
            <span
              :class="{'disabled':!ischecked}"
              v-loading="orderaddloading"
              @click="orderadd"
              class="buy-button">{{$t('legalTrad.Submit')}}</span>
          </div>
        </div>
      </div>
    </td>
  </tr>

</template>
<script>
  import tradeNumber from '@/components/public/trade-number'
  import terms from "@/components/public/terms-service.vue"
  
  export default {
    name: 'articles',
    validations: {
      orderaddmodel: {
        price: {
          $require(val) {
            val = parseFloat(val)
            if (!val) {
              return false
            }
            return true
          },
          $ismin(val) {
            val = parseFloat(val)
            const min = parseFloat(this.item.minprice)
            let _state = true
            if (val && min > 0 && val < min) {
              _state = false
            }
            return _state
          },
          $ismax(val) {
            val = parseFloat(val)
            const max = parseFloat(this.item.maxprice)
            let _state = true
            if (val && max > 0 && val > parseFloat(this.item.maxprice)) {
              _state = false
            }
            return _state
          }
        },
        amount: {
          $require(val) {
            val = parseFloat(val)
            if (!val) {
              return false
            }
            return true
          },
          $ismax(val) {
            val = parseFloat(val)
            const max = parseFloat(this.item.enableamount)
            let _state = true
            if (val && val > max) {
              _state = false
            }
            return _state
          }
        }
      }
    },
    components: {
      tradeNumber,
      terms
    },
    props: ['item'],
    computed: {
      unitprice: function () {
        return this.$parent.getprice(this.item)
      },
      legalname: function () {
        return this.global_get_legaltype(this.item.legaltype).name
      }
    },
    watch: {
      'orderaddmodel.price': function (val) {
        if (this.selecttrade == 'to') {
          this.orderaddmodel.amount = this.global_get_tofixed(this.$np.divide(val, this.unitprice))
        }
      },
      'orderaddmodel.amount': function (val) {
        if (this.selecttrade == 'from') {
          this.orderaddmodel.price = this.global_get_tofixed(this.$np.times(val, this.unitprice))
        }
      }
    },
    data() {
      return {
        popupStatue: false,
        selecttrade: '',
        to: '',
        from: '',
        ischecked: true,
        orderaddloading: false,
        orderaddmodel: this.getnewmodel(),
        article: {
          "zh_cn": 676904,
          "en_us": 676957
        }
      }
    },
    mounted() {
    },
    methods: {
      getnewmodel() {
        return {
          price: '',
          amount: '',
          orderid: '',
          paytypes: []
        }
      },
      popup() {
        this.popupStatue = !this.popupStatue;
      },
      /*用户下单*/
      orderadd() {
        if (!this.ischecked) {
          return
        }
        let _state = false
        this.$v.$touch()
        if (this.$v.$invalid) {
          _state = true
        }
        if (_state) {
          return
        }
        if (this.orderaddloading) {
          return
        }
        this.orderaddloading = true
        const newmodel = Object.assign({}, this.orderaddmodel)
        newmodel.orderid = this.item.id
        newmodel.price = parseFloat(newmodel.price)
        newmodel.amount = parseFloat(newmodel.amount)
        this.$store.dispatch('trading_c2c_order_add', newmodel).then(({data}) => {
          if (data) {
            this.$parent.getorderdetail(data)
              .then((orderdata) => {
                this.$store.commit('set_message', {type: 'ok', text: this.$t('c2c.Ordered')})
                this.orderaddmodel = this.getnewmodel()
                this.$v.$reset()
                //更新用户资产
                this.global_refresh_user_assets()
                this.$router.push({path: '/trade/' + data})
                this.orderaddloading = false
              })
            
          } else {
            this.orderaddloading = false
          }
        })
      }
    }
  }
</script>

