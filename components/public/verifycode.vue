<template>
  <span class="mail_code get-code button-loading--por"
        v-loading="loading"
        :class="{'auth-content_group--unavailable':send}"
        @click="getCode">{{sendDelay}}</span>
</template>
<script>
  import Captcha from '@/plugins/captcha'

  export default {
    name: "verifycode",
    props: {
      country: {
        type: Object,
        default: null
      },
      isexist: {//用于是否需要校验号码是否存在
        type: Boolean,
        default: false
      },
      template: {//用户发送模板
        type: String,
        default: 'Default'
      },
      email: {
        type: String,
        default: ''
      },
      areacode: {
        type: String,
        default: ''
      },
      phone: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        send: false,
        sendDelay: this.$t("formMenu.getCode"),
        timer: null
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.sendDelay = this.$t("formMenu.getCode")
      }
    },
    methods: {
      getCode() {
        const _self = this;
        if (_self.send) return;
        this.send = true;
        this.loading = true;
        let nation;
        if (this.country != null) {//是否需要选择国家
          nation = JSON.stringify(this.country);
          if (nation == "{}") {
            this.$emit('checkStatus', 'countryid');
            this.send = false;
            this.loading = false;
            return;
          }
        }
        if (_self.email == '0') {//邮箱或者手机不能为空
          _self.$store.commit('set_message', {type: 'error', text: this.$t('patch.EmailAddress')});
          this.loading = false;
          this.send = false;
          return;
        } else if (_self.phone == '0') {
          _self.$store.commit('set_message', {type: 'error', text: this.$t('patch.MobilePhone')});
          this.loading = false;
          this.send = false;
          return;
        }
        if (_self.isexist) {//用于检验用户号码是否存在
          let postData = {
            uid: 0
          };
          if (_self.phone != 0) {
            if (_self.country != null) {
              if (_self.country.areacode == '0086') {
                let patt1 = new RegExp(/^1[3,4,5,7,8,9][0-9]{9}$/);
                if (!patt1.test(_self.phone)) {
                  _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.phoneFormatError')});
                  this.loading = false;
                  this.send = false;
                  return;
                }
              }
            }
            postData.phone = _self.phone;
          } else if (_self.email != 0) {
            postData.email = _self.email;
          } else if (_self.email == '') {
            _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.emialInputAddress')});
            this.loading = false;
            this.send = false;
            return;
          } else if (_self.phone == '') {
            _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.phoneNumberInput')});
            this.send = false;
            this.loading = false;
            return;
          }
          _self.$store.dispatch("user_user_exist", postData).then(({data}) => {
            if (data) {
              if (_self.phone) {
                _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.exisPhone')});
              } else if (_self.email) {
                _self.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.existEmail')});
              }
              this.loading = false;
              this.send = false;
              return;
            } else {
              this.send = false;
              this.getcodes();
            }
          })
        } else {
          this.send = false;
          this.getcodes();
        }

      },
      getcodes() {
        const _self = this
        if (_self.send) return
        this.send = true
        const send = {}
        let post = ''
        if (_self.email) {
          send.email = _self.email
          post = 'com_email_verifycode_send'
        }
        if (_self.phone) {
          send.phone = _self.phone
          post = 'com_sms_verifycode_send'
        }
        if (_self.areacode) {
          send.areacode = _self.areacode
        }
        send.template = _self.template
        this.getCaptch().then((res) => {
          if (res && res.ret == 0) {
            send.randstr = res.randstr
            send.ticket = res.ticket
            send.captchaid = Captcha.appId
          } else if (res && res.ret == 2) {
            _self.loading = false;
            _self.send = false;
            return null
          }
          return _self.$store.dispatch(post, send);
        })
          .then((data) => {
            if (data) {
              if (data.data) {
                return _self.delaySend(data)
              } else {
                _self.loading = false;
                _self.send = false;
                return;
              }
            }
          })
          .then(() => {
            _self.send = false
          })

      },
      getCaptch() {
        if (this.phone) {
          return Captcha.init()
        } else {
          return new Promise((resolve) => {
            resolve(null)
          })
        }
      },
      delaySend(data) {
        this.loading = false;
        let _self = this
        return new Promise(function (resolve) {
          if (!(data && data.data.succeed)) {
            resolve(true);
            return
          }
          let number = 119;
          _self.sendDelay = number + 's';
          _self.timer = setInterval(() => {
            --number
            _self.sendDelay = number + 's';
            if (number == 0) {
              _self.sendDelay = _self.$t("formMenu.getCode");
              clearInterval(_self.timer);
              _self.send = false;
              resolve(true)
            }
          }, 1000)
        })
      },
      clearTime() {
        const _self = this;
        clearInterval(this.timer);
        _self.send = false;
        _self.sendDelay = _self.$t("formMenu.getCode");
        _self.timer = null;
      }
    },

  };
</script>
<style lang='less' scoped>
</style>

