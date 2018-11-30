<script>
  import {required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";

  export default {
    name: 'mobile-phone',
    layout: 'm-default',
    watch: {
      'signModel.password': function (val) {
        const _signModel = this.signModel
        if (this.reg.strong.test(val)) {
          _signModel.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _signModel.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _signModel.passwordstrength = 1
        } else {
          _signModel.passwordstrength = 0
        }
      },
      'signModel.countryid': function (val) {
        this.state.country = this.countryOptions.find((item) => {
          return item.countryid == val
        })
      }
    },
    validations: {
      signModel: {
        phone: {
          required
        },
        verifycode: {
          required
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        countryid: {
          required
        },
        passwordagain: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    data() {
      return {
        loading: false,
        popupStatue: false,
        phoneformat: true,//false 手机号有误
        phoneReg: '/^1[345789]\d{9}$/',
        isphone: true,
        state: {
          sendDelayState: false,
          send: false,
          check: true,
          signup: false,
          country: {},
          sendDelay: '获取验证码',
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        //注册model
        signModel: {
          signuptype: 'phone',
          phone: '',
          password: '',
          passwordagain: '',
          passwordstrength: '',
          source: '',
          referee: '',
          verifycode: '',
          countryid: '',
          countrycode: '',
          usertype: 0,
        },
        //验证model
        sendModel: {
          phone: '',
          areacode: '',
          template: 'Signup',
        },
        countryOptions: [],
        article: {
          "zh_cn": 654641,
          "en_us": 638881
        },
      }
    },
    methods: {
      closeloading() {
        this.state.send = false;
      },
      signUp() {
        if (!this.state.check) return
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        const _signModel = _self.$v.signModel;
        _signModel.$touch();

        if (_signModel.countryid.$invalid) {
          _self.$store.commit('set_message', {
            type: "error",
            text: "请选择国家"
          })
          return;
        }
        if (_signModel.phone.$invalid) {
          _self.$store.commit('set_message', {
            type: "error",
            text: "手机号不能为空"
          })
          return;
        }

        if (_signModel.verifycode.$invalid) {
          _self.$store.commit('set_message', {
            type: "error",
            text: "验证码不能为空"
          })
          return;
        }
        let $model = _signModel.password.$model;
        if (_signModel.password.$invalid) {
          if (!$model) {
            _self.$store.commit('set_message', {
              type: "error",
              text: "密码不能为空"
            })
            return;
          } else {
            let tip;
            if($model.length < 8){
              tip = '密码不能少于8位'
            }else if($model.length > 20 ){
              tip = '密码不能大于20位'
            }
            _self.$store.commit('set_message', {
              type: "error",
              text: tip
            })
            return;
          }
        }
        if (this.signModel.passwordagain.trim()) {
          if (!_signModel.passwordagain.sameAsPassword) {
            _self.$store.commit('set_message', {
              type: "error",
              text: "二次密码不一致"
            })
            return;
          }
        } else {
          if (_signModel.passwordagain.$invalid) {
            _self.$store.commit('set_message', {
              type: "error",
              text: "请再次输入登录密码"
            })
            return;
          }
        }
        // if (_signModel.$invalid) return;
        if (_self.state.signup) return;
        _self.state.signup = true;
        const {areacode} = _self.state.country;
        _sign.countrycode = areacode;
        _sign.password = crypto.md5String(_sign.password);
        delete _sign.passwordagain
        _self.$store.dispatch('user_user_signup', _sign)
          .then((res) => {
            if (res.data) {
              _self.$store.commit('set_message', {
                type: 'ok',
                text: res.msg
              });
              _self.$store.commit('set_user_info', res);
              _self.$router.push('/')
            }
          })
          .then((data) => {
            _self.state.signup = false
          })
      },
      popup() {
        this.popupStatue = !this.popupStatue;
      },
      getCode() {
        const _this = this;
        if (_this.state.send) return
        _this.sendModel.phone = this.signModel.phone;
        _this.sendModel.areacode = this.state.country.areacode;
        const phone = this.$v.signModel.phone;
        const countryid = this.$v.signModel.countryid;

        countryid.$touch();
        if (countryid.$invalid) {
          _this.$store.commit('set_message', {
            type: "error",
            text: "请选择国家"
          })
          return;
        }
        phone.$touch();
        if (phone.$invalid) {
          _this.$store.commit('set_message', {
            type: "error",
            text: "手机号不能为空"
          })
          return;
        }
        _this.state.send = true
        if (_this.signModel.countryid == '243') {
          let patt1 = new RegExp(/^1[3,4,5,7,8,9][0-9]{9}$/);
          if (!patt1.test(_this.signModel.phone)) {
            // _this.phoneformat = false;
            _this.state.send = false
            _this.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.phoneFormatError')});
          } else {
            _this.$store.dispatch("user_user_exist", {phone: _this.signModel.phone}).then(({data}) => {
              if (data) {
                _this.state.send = false
                _this.$store.commit('set_message', {type: 'error', text: this.$t('formMenu.exisPhone')});
              } else {
                _this.$emit('register:sendCode', _this)
              }
            })
          }
        } else {
          _this.$emit('register:sendCode', _this)
        }
      }
    },
    mounted() {
      this.signModel.referee = this.$route.query.invitecode ? this.$route.query.invitecode : '';
      this.loading = true;
      this.$store.dispatch('com_country_getlist').then(({data}) => {
        this.countryOptions = data;
        this.loading = false;
      })

    }
  }
</script>
<style scoped lang="less">
  .serve-tip {
    font-size: 14px;
    margin-left: 10px;
    cursor: pointer;
  }

  .flag {
    width: 20px;
    float: right;
    padding-top: 11px;
  }

  .phone {
    padding: 5% 8%;
    .auth-content_form .auth-content_group {
      font-size: 16px;
      height: 41px;
      line-height: 40px;
      display: flex;
      select {
        border: none;
        outline: none;
      }
      .country {
        width: 100%;
      }
      input {
        display: inline-block;
      }
      .getCode {
        background: none;
        float: right;
        color: #2895FB;
        line-height: 40px;

      }
      .areaCode.isTrue {
        padding-right: 10px;
      }
    }
  }

  .phone .auth-content_form .auth-content_group.auth-content_group_border {
    border-bottom: 1px solid #DDDDdd;
  }

  .phone .auth-content_form .auth-content_group.auth-content_group--error {
    border-bottom: 1px solid #DDDDdd;
  }

  .agreement {
    margin-top: 15px;
    span a {
      color: #2895FB;
    }
  }

  .flex {
    display: flex;
  }

  .flex-auto {
    flex: auto;
  }

  .registerbtn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #2895FB;
    text-align: center;
    color: white;
    line-height: 40px;
    margin-top: 20px;
  }

  .registerbtn.register-cant {
    background: #dddddd;
  }

  .el-select.select_input {
    width: 100%;
    input {
      border: none !important;
    }
  }

  .password_group_tip {
    span.week {
      color: #CD4559;
    }
    span.middle {
      color: #F5A623;
    }
    span.strong {
      color: #03BF7B;
    }
  }

  .agreement span.label-tip {
    color: #333;
  }

  .mobile.phone input {
    font-size: 16px !important;
  }

  .get-codes {
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #6f8ff1;
    background: #F0EFF7;
    font-size: 14px;
  }
</style>
<template>
  <div class="mobile phone ">
    <div class="auth-content_form">
      <div class="auth-content_group "
           :class="$v.signModel.countryid.$error?'auth-content_group--error':'auth-content_group_border'">
        <el-select
          filterable
          :loading="loading"
          loading-text="加载中..."
          class="select_input mobile-select"
          popper-class="select_input_popper"
          :popper-append-to-body="false"
          v-model.trim="$v.signModel.countryid.$model"
          placeholder="请选择">
          <el-option
            v-for="item in countryOptions"
            :key="item.countryid"
            :label="item.name+' +'+item.areacode"
            :value="item.countryid">
            <span style="float: left">{{item.name+' +'+item.areacode }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="auth-content_group area "
           :class="$v.signModel.phone.$error?'auth-content_group--error':'auth-content_group_border'">
        <span class="areaCode"
              :class="{'isTrue':state.country.areacode}">{{state.country.areacode?"+"+state.country.areacode:''}}</span>
        <input class="flex-auto"
               v-model.trim="$v.signModel.phone.$model"
               placeholder="输入手机号码"
               type="text">
      </div>

      <div class="auth-content_group area "
           :class="$v.signModel.verifycode.$error?'auth-content_group--error':'auth-content_group_border'">
        <input class="flex-auto"
               v-model.trim="$v.signModel.verifycode.$model"
               placeholder="输入验证码"
               type="text">
        <span class=" get-codes button-loading--por"
              :class="{'auth-content_group--unavailable':state.sendDelayState}"
              v-loading="state.send"
              @click="getCode(1)">{{state.sendDelay}}</span>
      </div>

      <div class="auth-content_group "
           :class="$v.signModel.password.$error?'auth-content_group--error':'auth-content_group_border'">
        <input class="flex-auto"
               v-model.trim="$v.signModel.password.$model"
               placeholder="输入登录密码(8-20位字符)"
               type="password">
        <span class="password_group_tip" v-if="!$v.signModel.password.$error">
                <span class="password_group_tip week" v-show="signModel.passwordstrength==1">弱</span>
                <span class="password_group_tip middle" v-show="signModel.passwordstrength==2">中</span>
                <span class="password_group_tip strong" v-show="signModel.passwordstrength==3">强</span>
        </span>
      </div>

      <div class="auth-content_group "
           :class="$v.signModel.passwordagain.$error?'auth-content_group--error':'auth-content_group_border'">

        <input class="flex-auto"
               v-model.trim="$v.signModel.passwordagain.$model"
               placeholder="再次输入登录密码"
               type="password">
      </div>

      <div class="auth-content_group auth-content_group_border">
        <input class="flex-auto"
               v-model.trim="signModel.referee"
               @keyup.enter="signUp"
               placeholder="邀请码（可不填）"
               type="text">
      </div>
      <div class="agreement ">
        <el-checkbox v-model="state.check">
          <span class="label-tip">我已阅读并同意HEX.com<span><nuxt-link to="/mobile/clause">《服务条款》 </nuxt-link></span></span>
        </el-checkbox>
      </div>
      <div>
        <div class=" registerbtn auth-content_button"
             :class="{'register-cant':!state.check}"
             @click="signUp">
          注册
        </div>
      </div>

    </div>
  </div>
</template>
