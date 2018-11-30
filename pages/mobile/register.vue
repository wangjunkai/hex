<template>
  <div class="register" :style="{'width':IsPhone?'100%':'30%','margin':IsPhone?'inherit':'auto'}">
    <div class="registeri-title">
      <img class="registeri-title-picture" src="../../static/images/guide/head-tip.png" alt="">
    </div>
    <div class="auth-content_navs">
      <span class="phone" :class="state.tab=='phone'?'active':''" @click="setRegisterActive('phone')">手机注册</span>
      <span class="email" :class="state.tab=='email'?'active':''" @click="setRegisterActive('email')">邮箱注册</span>
    </div>
    <Email
      ref="email"
      v-if="state.tab=='email'"
      @register:sendCode="getCode"
    />
    <Phone
      v-else
      @register:sendCode="getCode"
      ref="phone"/>
    <downitem/>
  </div>
</template>

<script>
  import Email from "@/components/auth/mobile-email"
  import Phone from "@/components/auth/mobile-phone"
  import downitem from '@/components/auth/downitem'
  import Captcha from '@/plugins/captcha'

  export default {
    name: 'mobile-register',
    layout: 'm-default',
    components: {
      Email, Phone, downitem
    },
    data() {
      return {
        state: {
          tab: 'phone'
        },
        countryOptions: [],
        windowH: '',
        IsPhone:true,
      }
    },
    methods: {
      isphone() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
          }
        }
        this.IsPhone = flag;
      },
      setRegisterActive(tab) {
        this.state.tab = tab
      },
      getCode(_self) {
        const _tab = this.state.tab
        const _send = _self.sendModel
        _self.state.send = true;
        const post = _tab == 'email' ? 'com_email_verifycode_send' : 'com_sms_verifycode_send';
        Captcha.init().then((res) => {
          if (res && res.ret == 0) {
            _send.randstr = res.randstr
            _send.ticket = res.ticket
            _send.captchaid = Captcha.appId
            this.$store.dispatch(post, _send).then(({data, msg}) => {
              if (data) {
                this.delaySend(_self, data)
              } else {
                _tab == 'email' ? this.$refs.email.closeloading() : this.$refs.phone.closeloading();
                this.$store.commit('set_message', {type: 'error', text: msg});
              }
            })
          } else if (res && res.ret == 2) {
            _self.state.send = false
          }
        })
          .catch((error) => {
            _self.state.send = false;
          })
      },
      delaySend(_self, data) {
        const _this = this;
        let _m = _self.state
        return new Promise(function (resolve) {
          if (!(data && data.succeed)) {
            resolve(true)
            return
          }
          let number = 119
          _m.send = false
          _m.sendDelayState = true
          _m.sendDelay = number + 's'
          const _timer = setInterval(() => {
            --number
            _m.sendDelay = number + 's'
            if (number == 0) {
              _m.sendDelayState = false
              _m.sendDelay = '获取验证码';
              clearInterval(_timer)
              resolve(true)
            }
          }, 1000)
        })
      }
    },
    mounted() {
      this.isphone();
      this.windowH = window.innerHeight;
    }
  }
</script>
<style scoped lang="less">
  @import "../../static/styles/auth";

  .register {
    position: relative;
    height: 100%;
    background: white;
    .register-title {
      width: 100%;
      height: 17%;
      img {
        display: block;
        width: 100%;
      }
    }
    .auth-content_navs {
      text-align: center;
      font-size: 16px;
      color: #21283E;
      letter-spacing: 0;
      line-height: 20px;
      span {
        padding: 0 15px;
      }
      span:first-child {
        border-right: 1px solid #dddddd;
      }
      span.active {
        color: #646B8C;
      }
    }
  }

</style>
