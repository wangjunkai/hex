<style scoped>
  .toresetpassword {
    font-size: 14px;
    margin-top: 15px;
    text-align: right;
    width: 400px;
    color: #6F8FF1;
    cursor: pointer;
  }
</style>
<template>
  <div class='change-password w990'>
    <div class='common-head'>
      <popup
        @closepopup='popups'
        ref="child"
        v-show="popupstate"
        :template="'ModifyPwd'"
        @confirm="tomodifypassword"
      />
      <span class='goback' @click="goback"></span>
      <span>{{$t('memberCenter.modifyPassword')}}</span>
    </div>
    <div class='google-countant'>
      <div class='validation-area change-password-area'>
        <div class='hint-text'>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifypassword.originalpwd.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.yLoginPassword')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifypassword.originalpwd.required">{{$t('formMenu.yLoginPasswordNone')}}</span>
            </p>
            <input class="input"
                   :placeholder="$t('formMenu.yLoginPasswordInput')" type="password"
                   v-model.trim="$v.modifypassword.originalpwd.$model">
          </div>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifypassword.newpwd.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('security.loginPassword')}}</span>
              <span class="normal-tip right"
                    v-if="!$v.modifypassword.newpwd.$error">{{$t('formMenu.passwordCombination')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifypassword.newpwd.required">{{$t('formMenu.loginPasswordNone')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifypassword.newpwd.minLength">
                {{$t('formMenu.loginPasswordL')}}{{$v.modifypassword.newpwd.$params.minLength.min}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifypassword.newpwd.maxLength">
                {{$t('formMenu.loginPasswordG')}}{{$v.modifypassword.newpwd.$params.maxLength.max}}</span>
            </p>
            <div class="password_group">
              <input class="input"
                     v-model.trim="$v.modifypassword.newpwd.$model"
                     :placeholder="$t('login.userLoginPassword')"
                     type="password">
              <span class="password_group_tip" v-if="!$v.modifypassword.newpwd.$error">
                <span class="password_group_tip week"
                      v-show="modifypassword.passwordstrength==1"></span>
                <span class="password_group_tip middle"
                      v-show="modifypassword.passwordstrength==2"></span>
                <span class="password_group_tip strong"
                      v-show="modifypassword.passwordstrength==3"></span>
              </span>
            </div>
          </div>
          <div class="auth-content_group"
               :class="{'auth-content_group--error':$v.modifypassword.passwordagain.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.loginPasswordConfirm')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.modifypassword.passwordagain.sameAsPassword">
                {{$t("formMenu.passwordInconformity")}}</span>
            </p>
            <input class="input"
                   v-model.trim="$v.modifypassword.passwordagain.$model"
                   :placeholder="$t('formMenu.loginPasswordAgain')"
                   @keyup.enter="popups(1)"
                   type="password">
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click="popups(1)">{{$t('security.modify')}}
          </button>
          <nuxt-link to="/reset-password" class="toresetpassword" tag="p">{{$t('login.forgetPassword')}}</nuxt-link>
        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import {required, email, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";
  import popup from '@/components/security/popup-public'
  
  export default {
    name: 'Home',
    components: {
      suggest, popup
    },
    watch: {
      'modifypassword.newpwd': function (val) {
        const _modifypassword = this.modifypassword
        if (this.reg.strong.test(val)) {
          _modifypassword.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _modifypassword.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _modifypassword.passwordstrength = 1
        } else {
          _modifypassword.passwordstrength = 0
        }
      }
    },
    validations: {
      modifypassword: {
        originalpwd: {
          required
        },
        newpwd: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        passwordagain: {
          sameAsPassword: sameAs('newpwd')
        }
      },
      googleverifycode: {
        required
      }
    },
    data() {
      return {
        loading: false,
        popupstate: 0,
        sendModel: {
          template: 'Default'
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        state: {
          phone: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          email: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          sendEmail: false,
          stepState: false,
          resetState: 1,
          codeState: false
        },
        googleverifycode: '',
        modifypassword: {
          originalpwd: '',
          newpwd: '',
          passwordstrength: '',
          passwordagain: '',
        },
      }
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      popups(val) {
        if (val) {
          const _self = this;
          const _modifypassword = _self.$v.modifypassword
          _modifypassword.$touch();
          if (_modifypassword.$invalid) return
          if (_self.state.stepState) return;
          _self.loading = true;
          this.state.stepState = true
          this.$store.dispatch("user_user_pwd_check",
            {password: crypto.md5String(_self.modifypassword.originalpwd)})
            .then(({data}) => {
              if (data) {
                _self.popupstate = val;
                if (_self.$userinfo.isopengoogleverify) {
                  _self.$refs.child.isgooglepopup(true);
                }
                _self.state.stepState = false;
                _self.loading = false;
              } else {
                _self.state.stepState = false;
                _self.loading = false;
                return;
              }
            })
        } else {
          this.popupstate = val;
        }
      },
      tomodifypassword(_childthis) {
        const _child = _childthis;
        const _self = this
        const _modify = _self.$v.modifypassword
        _modify.$touch()
        if (_modify.$invalid) return;
        const _modifypassword = Object.assign({}, this.modifypassword);
        _modifypassword.newpwd = crypto.md5String(_modifypassword.newpwd)
        _modifypassword.originalpwd = crypto.md5String(_modifypassword.originalpwd)
        if (_child.googleverifycode) {
          _modifypassword.googleverifycode = _child.googleverifycode;
        }
        if (_child.emailverifycode && _child.smsverifycode) {
          _modifypassword.emailverifycode = _child.emailverifycode;
          _modifypassword.smsverifycode = _child.smsverifycode;
        } else if (_child.emailverifycode) {
          _modifypassword.emailverifycode = _child.emailverifycode;
        } else if (_child.smsverifycode) {
          _modifypassword.smsverifycode = _child.smsverifycode;
        }
        this.$store.dispatch('user_user_password', _modifypassword)
          .then((res) => {
            if (res.data) {
              _self.popupstate = 0;
              _self.$store.commit('set_message', {type: 'ok', text: res.msg});
              if (_self.$store.state.hex_uid.value) {
                _self.$store.commit('set_user_info', res)
              }
              _self.$store.commit('remove_user_info');
              _self.$router.push('/login')
            } else {
              _self.$refs.child.closeloading();
            }
          })
          .then(() => {
            // this.state.stepState = false
          })
      },
    },
  }

</script>
<style lang='less' scoped>
  @import "./../../../static/styles/auth.less";
  
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }
  
  .change-password {
    .google-countant {
      background: white;
      padding: 0px 40px 30px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }
</style>
