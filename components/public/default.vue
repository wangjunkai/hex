<script>
  import * as jsCokie from 'js-cookie'
  import init from '../../init'
  
  export default {
    name: 'error',
    data() {
      return {
        timer: null,
        title: 'HEX | ',
      }
    },
    watch: {
      '$store.state.message': function (message) {
        this.show()
      }
    },
    methods: {
      show() {
        let _self = this.$store.state.message
        this.$notify({
          group: 'hex-message-template',
          text: _self.text,
          type: _self.type,
        })
      },
      //获取汇率
      getRate() {
        const _self = this
        if (this.$store.state.exchangeRate.length > 0) {
          return
        }
        _self.$store.dispatch('getIntervalData', {
          url: 'quotation_getrateinfo_get',
          timer: 1000 * 60,
          callback: ({data}) => {
            if (data && data.length > 0) {
              _self.$store.commit('set_exchange_rate', data)
            }
          }
        })
      },
      /*获取币种列表*/
      getFrenchCurrency() {
        if (this.$store.state.coinTitleList.length > 0) {
          return
        }
        this.$store.dispatch('quotation_frenchcurrency')
          .then(({data}) => {
            if (data) {
              this.$store.commit('set_coin_title', data)
            }
          })
      },
      /*获取用户登录信息*/
      getUser() {
        this.$store.dispatch('user_user')
          .then((res) => {
            const _user = res.data ? res.data : res.hexdata
            if (_user) {
              this.$store.commit('set_server_user_info', _user)
            }
          })
      },
      /*获取用户资产*/
      getUcGet() {
        this.$store.dispatch('user_assets_uc_get', {assetstype: 1})
          .then((res) => {
            const _assets = res.data ? res.data : res.hexdata
            if (_assets) {
              this.$store.commit('set_server_user_assets_uc', _assets)
            }
          })
      },
      /*是否维护中*/
      isMaintain() {
        //测试 1048
        this.$store.dispatch('com_constants_getconstantsinfo', {id: init.pro ? 1052 : 1048})
          .then(({data}) => {
            if (data.cvalue) {
              let {en_us, zh_cn} = JSON.parse(data.cvalue)
              const zh_cnary = zh_cn.split('@')
              const en_usary = en_us.split('@')
              if (zh_cnary.length > 1) {
                if (Number(zh_cnary[1]) * 1000 > (new Date().getTime())) {
                  zh_cnary[1] = this.global_get_local_time(Number(zh_cnary[1])).format('YYYY-MM-DD HH:mm')
                  en_usary[1] = this.global_get_local_time(Number(en_usary[1])).format('YYYY-MM-DD HH:mm')
                  sessionStorage.setItem('isMaintain', JSON.stringify({
                    zh_cn: zh_cnary.join(''),
                    en_us: en_usary.join('')
                  }))
                  if (location.pathname != '/isMaintain') {
                    location.href = '/isMaintain'
                  }
                  return
                }
              }
            }
            sessionStorage.setItem('isMaintain', '')
          })
      }
    },
    mounted() {
    },
    created() {
      if (process.client) {
        if (this.$store.state.hex_uid.value) {
          this.getUcGet()
        }
        
        /*汇率*/
        this.getRate()
        /*币种列表*/
        this.getFrenchCurrency()
        
        /*是否维护中*/
        this.isMaintain()
      }
    },
    beforeCreate() {
      if (process.client) {
        const uid = jsCokie.get(this.$store.state.hex_uid.type)
        if (!uid) {
          this.$store.commit('remove_user_info')
        }
        /*设置本地token*/
        const cookie_token = jsCokie.get(this.$store.state.hex_token.type)
        const hex_token = this.$store.state.hex_token.value
        if (hex_token.access_token && !cookie_token) {
          this.$store.commit('set_token', hex_token)
        }
      }
    }
  }

</script>
<template>
  <div>
    <no-ssr>
      <notifications group="hex-message-template"
                     animation-type="velocity"
                     :duration="1000">
        
        <template slot="body" slot-scope="props">
          <div class="hex-message">
            <div class="hex-message-content">
              <span class="hex-message-icon" :class="props.item.type"></span>
              <span class="hex-message-text"
                    v-html="props.item.text"></span>
            </div>
          </div>
        </template>
      </notifications>
    </no-ssr>
  </div>
</template>
<style lang="less" scoped>
  .notifications {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 90px;
    text-align: center;
  }
  
  .hex-message {
    background: rgba(41, 46, 57, 1);
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    opacity: 0.95;
    min-width: 160px;
    color: #ffffff;
    font-size: 14px;
    display: inline-block;
    margin: 0 auto 10px auto;
    padding: 15px 30px;
  }
  
  .hex-message-icon {
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-left: -10px;
    position: absolute;
  }
  
  .hex-message-icon.error {
    background-image: url("../../static/images/help/error.svg");
  }
  
  .hex-message-icon.ok {
    background-image: url("../../static/images/help/right.png");
  }
  
  .hex-message-content {
    position: relative;
  }
  
  .hex-message-text {
    display: inline-block;
    text-align: left;
    padding-left: 25px;
    line-height: 24px;
  }

</style>

