<script>
  import Email from "@/components/auth/email"
  import Phone from "@/components/auth/phone"
  import Captcha from '@/plugins/captcha'

  export default {
    name: 'Home',
    components: {
      Email, Phone
    },
    data() {
      return {
        state: {
          tab: 'email'
        },
        countryOptions: [],
      }
    },
    methods: {
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
            this.$store.dispatch(post, _send)
              .then(({data, msg}) => {
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
              _m.sendDelay = _this.$t("formMenu.getCode");
              clearInterval(_timer)
              resolve(true)
            }
          }, 1000)
        })
      }
    },
    mounted() {

    }
  }
</script>
<style lang='less'>
  @import "../static/styles/auth.less";

  .auth-bg {
    position: absolute;
    top: 180px;
    right: 150px;
    width: 420px;
    height: 326px;
  }

  .auth-content .auth-content_group .select_input {
    width: 100%;
  }

  .auth-content .auth-content_group /deep/ .select_input input {
    border-radius: 0;
  }

  .auth-content .auth-content_group /deep/ .select_input .el-input.is-focus .el-input__inner {
    border-color: #dddddd;
  }

  .auth-content .auth-content_group /deep/ .select_input .el-input__inner:focus {
    border-color: #dddddd;
  }

  .auth-content .auth-content_group /deep/ .select_input_popper {
    border-radius: 0;
  }
</style>
<template>
  <div class="hex-flex">
    <div class="auth hex-flex_auto">
      <div class="auth-content">
        <p class="auth-content_title">{{$t("formMenu.register")}} HEX</p>
        <div class="auth-content_nav">
          <span class="email" :class="state.tab=='email'?'active':''" @click="setRegisterActive('email')">{{$t("formMenu.registerEmail")}}</span>
          <span class="phone" :class="state.tab=='phone'?'active':''" @click="setRegisterActive('phone')">{{$t("formMenu.registerPhone")}}</span>
        </div>
        <Email
          ref="email"
          @register:sendCode="getCode"
          v-if="state.tab=='email'"/>
        <Phone
          v-else
          ref="phone"
          @register:sendCode="getCode"
          :countryOptions="countryOptions"/>
        <img class="auth-bg" src="~/static/images/user/exchange.png" alt="">
      </div>
    </div>
  </div>

</template>
