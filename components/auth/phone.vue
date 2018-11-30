<script>
  import {required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";
  import verifycode from "@/components/public/verifycode.vue";
  import terms from "@/components/public/terms-service.vue";
  
  export default {
    name: 'Home',
    components: {
      verifycode,
      terms
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.state.sendDelay = this.$i18n.t('formMenu.getCode');
        this.countryOptions.map((item) => {
          if (val == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          } else {
            item.name = item.chname;
          }
        })
      },
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
        lang: this.$store.state.hex_lang.locale,
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
          sendDelay: this.$i18n.t('formMenu.getCode')
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
        }
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
        if (_signModel.$invalid) return;
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
              location.href = '/person'
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
        phone.$touch();
        countryid.$touch();
        if (phone.$invalid || countryid.$invalid) return;
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
      this.$store.dispatch('com_country_getlist').then(({data}) => {
        this.countryOptions = data;
        this.countryOptions.map((item) => {
          if (this.lang == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          } else {
            item.name = item.name;
          }
        });
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

</style>

<template>
  <div class="auth-content_form">
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.countryid.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.nationality")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.countryid.required">{{$t("formMenu.nationSelect")}}</span>
      </p>
      <el-select
        filterable
        class="select_input"
        popper-class="select_input_popper"
        :popper-append-to-body="false"
        v-model.trim="$v.signModel.countryid.$model"
        :placeholder="$t('formMenu.select')">
        <el-option
          v-for="item in countryOptions"
          :key="item.countryid"
          :label="item.name+' +'+item.areacode"
          :value="item.countryid">
          <span style="float: left">{{item.name+' +'+item.areacode }}</span>
          <span style="float: right;">
              <img :src="item.flag" style="width:20px;height:auto;padding-top:11px">
            </span>
        </el-option>
      </el-select>
    </div>
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.phone.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.phone")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.phone.required">{{$t("formMenu.phoneNone")}}</span>
        <span class=" right"
              :class="{'normal-normal-tip_error':isphone}"
              style="color:#CD4559"
              v-if="!isphone">{{$t('patch.PhoneExists')}}</span>
        <span class=" right"
              :class="{'normal-normal-tip_error':phoneformat}"
              style="color:#CD4559"
              v-if="!phoneformat">{{$t('patch.MobileIncorrect')}}</span>
      </p>
      <input class="input"
             v-focus
             v-model.trim="$v.signModel.phone.$model"
             :placeholder="$t('formMenu.phoneNumberInput')"
             type="text">
    </div>
    <div class="auth-content_group auth-content_group_code"
         :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.phoneCodeVerification")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.verifycode.required">{{$t("formMenu.phoneCodeVerificationNone")}}</span>
      </p>
      <div class="auth-content_group_mail">
        <input class="input"
               v-model.trim="$v.signModel.verifycode.$model"
               :placeholder="$t('formMenu.phoneInputVerification')"
               type="text">
        <span class="mail_code get-code button-loading--por"
              :class="{'auth-content_group--unavailable':state.sendDelayState}"
              v-loading="state.send"
              @click="getCode(1)">{{state.sendDelay}}</span>
      </div>
    </div>
    <div class="auth-content_group" :class="{'auth-content_group--error':$v.signModel.password.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.loginPassword")}}</span>
        <span class="normal-tip right"
              v-if="!$v.signModel.password.$error">{{$t("formMenu.passwordCombination")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.password.required">{{$t("formMenu.loginPasswordNone")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.password.minLength">{{$t("formMenu.loginPasswordL")}}{{$v.signModel.password.$params.minLength.min}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.password.maxLength">{{$t("formMenu.loginPasswordG")}}{{$v.signModel.password.$params.maxLength.max}}</span>
      </p>
      <div class="password_group">
        <input class="input"
               v-model.trim="$v.signModel.password.$model"
               :placeholder="$t('formMenu.loginPassword')"
               type="password">
        <span class="password_group_tip" v-if="!$v.signModel.password.$error">
                <span class="password_group_tip week" v-show="signModel.passwordstrength==1">{{$t("formMenu.passwordWeak")}}</span>
                <span class="password_group_tip middle" v-show="signModel.passwordstrength==2">{{$t("formMenu.passwordMiddle")}}</span>
                <span class="password_group_tip strong" v-show="signModel.passwordstrength==3">{{$t("formMenu.passwordStrong")}}</span>
        </span>
      </div>
    </div>
    <div class="auth-content_group"
         :class="{'auth-content_group--error':$v.signModel.passwordagain.$error}">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.loginPasswordConfirm")}}</span>
        <span class="normal-tip_error right"
              v-if="!$v.signModel.passwordagain.sameAsPassword">{{$t("formMenu.passwordInconformity")}}</span>
      </p>
      <input class="input"
             v-model.trim="$v.signModel.passwordagain.$model"
             :placeholder="$t('formMenu.loginPasswordAgain')"
             @keyup.enter="signUp"
             type="password">
    </div>
    <div class="auth-content_group">
      <p class="title clearfix">
        <span class="left">{{$t("formMenu.InviteCode")}}</span>
        <span class="normal-tip right">{{$t("formMenu.notFill")}}</span>
      </p>
      <input class="input"
             v-model.trim="signModel.referee"
             @keyup.enter="signUp"
             :placeholder="$t('formMenu.InviteCodeInput')" type="text">
    </div>
    <div class="auth-content_group">
      <el-checkbox v-model="state.check">
        <span class="label-tip">{{$t("formMenu.read")}} HEX.COM</span>
      </el-checkbox>
      <span class="serve-tip" @click="popup">{{$t("formMenu.service")}}</span>
      <terms @close="popup" v-show="popupStatue" :article="article"/>
    </div>
    <div class="auth-content_button"
         @click="signUp">
      {{$t("formMenu.register")}}
    </div>
  </div>
</template>
