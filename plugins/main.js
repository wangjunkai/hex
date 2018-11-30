import Vue from 'vue'
import moment from 'moment'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import lang from '@/components/public/lang'
import '../static/styles/base.less'
import '../static/styles/day.less'
import Vuelidate from "vuelidate";
import Crypto from './axios/crypto'
import improvider from '../components/public/im-provider'
import Socket from './axios/socket'
import Pubsub from './pubsub'
import Np from './np'
import Directive from './directive'

Vue.use(Directive)
Vue.use(Np)
Vue.mixin({
  data() {
    return {
      $im: improvider(),
      $legaltype_option: [
        {
          value: 0,
          name: 'CNY',
          label: '人民币 (CNY)'
        },
        {
          value: 1,
          name: 'USD',
          label: '美元 (USD)'
        }
      ]
    }
  },
  computed: {
    $userassets: function () {
      const assets = this.$store.state.hex_server_user_assets.value
      const token = this.$store.state.hex_token.value.access_token
      if (!assets || !token) {
        return {}
      }
      if (typeof info === 'string') {
        const data = Crypto.decrypt(assets, token)
        return data
      } else {
        return assets
      }
    },
    $userinfo: function () {
      const info = this.$store.state.hex_server_user_info.value
      const token = this.$store.state.hex_token.value.access_token
      if (!info || !token) {
        return {}
      }
      if (typeof info === 'string') {
        const data = Crypto.decrypt(info, token)
        return data
      } else {
        return info
      }
    }
  },
  methods: {
    /*获取本地自选*/
    global_get_client_collect() {
      let collect = JSON.parse(localStorage.getItem('HEX_COLLECT'))
      if (!(collect && typeof collect == 'object')) {
        collect = {}
      }
      return collect
    },
    global_get_fee(coin) {
      if (coin.direction == 1) {
        if (coin.ordertype == 2) {
          return this.$np.times(this.$np.divide(coin.transactionamount, coin.tradeavgprice), coin.fee)
        }
        return this.$np.times(coin.transactionamount, coin.fee)
      } else {
        return this.$np.times(coin.tradeavgprice, coin.transactionamount, coin.fee)
      }
    },
    /*获取涨跌幅*/
    global_get_limitprice: function (item) {
      let limit_price = Number(Math.abs(((item.c - item.o) / item.o) * 100)).toFixed(2);
      return isNaN(limit_price) ? 0 : limit_price;
    },
    global_init_meiqia(val) {
      const meiqia = document.querySelector('body')
      if (!val) {
        meiqia.classList.add('hidemeiqia')
      } else {
        meiqia.classList.remove('hidemeiqia')
      }
    },
    global_get_replace_dot(val) {
      if (!val) {
        return 0
      }
      return val.toString().replace(/\.$/, '')
    },
    global_get_uid(val) {
      if (val) {
        return val.slice(-8)
      }
      return ''
    },
    global_get_legaltype(val) {
      return this.$data.$legaltype_option.find((item) => {
        return item.value == val
      })
    },
    global_get_random_color(val) {
      const colorary = ['#E35744', '#5D8CC2', '#B09472', '#8F5AAD', '#B2A040', '#A16C92', '#7692AB', '#7CACC5', '#BF82AD', '#83639C']
      return colorary[Number(val)]
    },
    global_get_count_decimals(value) {
      if (!value) {
        return 0
      }
      if (Math.floor(value) === Number(value)) return 0;
      return value.toString().split(".")[1].length || 0;
    },
    global_num_split(val) {
      const a = val.toString().split('.')
      if (a.length > 1) {
        if (a[1].length > 8) {
          a[1] = a[1].substring(0, 8)
          return this.global_get_langnum(a.join('.'))
        }
      }
      return this.global_get_langnum(val)
    },
    global_get_langnum(val) {
      val = Number(val)
      if (!val) {
        return 0
      }
      return val
    },
    global_get_uppercase(val) {
      if (val) {
        return val.toUpperCase()
      } else {
        return '--'
      }
    },
    global_string_split(val) {
      if (!val) {
        return ''
      }
      if (val.split('@').length == 1) {
        return val.substr(0, 3) + '****' + val.slice(val.length - 4)
      } else {
        let reg = /(.{3}).+(@.+)/g;
        return val.replace(reg, "$1***$2");
      }
    },
    //更新用户信息
    global_refresh_user_info() {
      return this.$store.dispatch("user_user").then((res) => {
        if (res.data) {
          const _user = res.data ? res.data : res.hexdata
          this.$store.commit('set_user_info', res)
          return _user
        }
      })
    },
    /*更新用户资产*/
    global_refresh_user_assets() {
      return this.$store.dispatch('user_assets_uc_get', {assetstype: 1})
        .then((res) => {
          const _assets = res.data ? res.data : res.hexdata
          if (_assets) {
            this.$store.commit('set_server_user_assets_uc', _assets)
            return _assets
          }
        })
    },
    global_get_tofixed(val, tofix) {
      if (isNaN(Number(val))) {
        val = 0
      } else {
        val = this.$np.strip(parseFloat(val))
      }
      let fix
      if (typeof tofix == 'number') {
        fix = tofix
      } else {
        const newval = 1 / parseFloat(val)
        if (newval >= 500) {
          fix = 8
        } else if (newval >= 10) {
          fix = 6
        } else if (newval < 10) {
          fix = 4
        }
      }

      const valary = val.toString().split('.')
      if (valary.length > 1) {
        valary[1] = valary[1].substring(0, fix)
        val = valary.join('.')
      }
      return parseFloat(this.global_get_langnum(val)).toFixed(fix)
    },
    global_get_decimal(name) {
      const list = this.$store.state.decimalsList
      let obj = {
        name: '',
        a: '',
        p: '',
        s: ''
      }
      const copename = name
      if (name && list) {
        name = name.toLowerCase()
        const a = this.$store.state.decimalsList.find((item) => {
          return item.name == name
        })
        return a ? {
          name: copename,
          a: a.amountdigits,
          p: a.pricedigits,
          s: a.sumdigits
        } : obj
      }
      else {
        return obj
      }
    },
    //获取本地时间
    global_get_local_time(time) {
      let local

      if (time && time.toString().length <= 10) {
        time = time * 1000
      }
      local = moment(time).local()

      return local
    },
    //获取订单类型
    global_get_order_type(type) {
      let ot = ''
      switch (type) {
        case 1:
          ot = this.$t('patch.LimitOrderShort');
          break;
        case 2:
          ot = this.$t('patch.MarketOrderShort');
          break;
        case 3:
          ot = this.$t('patch.LossOrder');
          break;
      }
      return ot
    },
    //获取订单状态
    global_get_order_state(s) {
      let order = ''
      switch (s) {
        case 0:
          order = this.$t('patch.UnDeal');
          break;
        case 1:
          order = this.$t('patch.PartialDeal');
          break;
        case 2:
          order = this.$t('patch.cancelled');
          break;
        case 3:
          order = this.$t('patch.DealSuccess');
          break;
        case 4:
          order = this.$t('patch.PartialTransaction');
          break;
        case 5:
          order = this.$t('patch.SystemWithdrawal');
          break;
      }
      return order
    },
    //获取充币状态
    global_get_charge_state(s) {
      let order = ''
      switch (s) {
        case 0:
          order = this.$t('patch.Pending');
          break;
        case 1:
          order = this.$t('patch.DepositSuccess');
          break;
        case 2:
          order = this.$t('patch.DepositFailed');
          break;
      }
      return order
    },
    //获取交易方向
    global_get_order_direction(s) {
      let order = ''
      switch (s) {
        case 1:
          order = this.$t('memberCenter.buy');
          break;
        case -1:
          order = this.$t('memberCenter.sell');
          break;
      }
      return order
    },
    //获取提币状态
    global_get_mention_state(s) {
      let order = ''
      switch (s) {
        case 0:
          order = this.$t('patch.WaitingReview');
          break;
        case 1:
          order = this.$t('patch.WithdrawSuccess');
          break;
        case 2:
          order = this.$t('patch.WithdrawFailed');
          break;
        case 3:
          order = this.$t('patch.Processing');
          break;
        case 4:
          order = this.$t('patch.Rejected');
          break;
        case 5:
          order = this.$t('patch.cancelled');
          break;
      }
      return order
    },
  },
  beforeMount() {
    this.$nextTick(() => {
      this.$v && this.$v.$reset()
    })
  },
  components: {
    'hex-header': Header,
    'hex-footer': Footer,
    'hex-lang': lang
  }
})
Vue.use(Socket)
Vue.use(Pubsub)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  console.error(err, info)
  return true
}












