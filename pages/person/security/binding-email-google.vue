<template>
  <div class='binding w990'>
    <div class='common-head'>
      <span class='goback' @click="goback"></span>
      <span>{{$t("formMenu.bindEmail")}}</span>
    </div>
    <div class='google-countant'>
      <div class='validation-area bind-email-area'>
        <div class='hint-text'>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validateEmail.emailAddress.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.registerEmailAddress")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validateEmail.emailAddress.email">{{$t("formMenu.emailFormatError")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validateEmail.emailAddress.required">{{$t("formMenu.emailNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input validation"
                     v-model.trim="$v.validateEmail.emailAddress.$model"
                     :placeholder="$t('formMenu.emialInputAddress')"
                     type="text" >
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validateEmail.emailverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.emailCodeVerification")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validateEmail.emailverifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.validateEmail.emailverifycode.$model"
                     :placeholder="$t('formMenu.emialInputVerification')"
                     type="text">
              <verifycode :email="validateEmail.emailAddress" :isexist="true"></verifycode>
            </div>
          </div>

          <div v-if="$userinfo.isphoneauthed"
               class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validateEmail.smsverifycode.$error}">
            <p class="title clearfix">
              <span class="left note">
                <span>{{$t("formMenu.phoneCodeVerification")}}</span>
                <span class="fr">{{global_string_split($userinfo.phone)}}</span>
              </span>
              <span class="normal-tip_error right"
                    v-if="!$v.validateEmail.smsverifycode.required">{{$t("formMenu.phoneCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.validateEmail.smsverifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     type="text">
              <verifycode :phone="$userinfo.phone"></verifycode>
            </div>
          </div>

          <!-- 绑定邮箱 谷歌验证 -->
          <div v-if="$userinfo.isopengoogleverify"
               class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validateEmail.googleverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.googleCodeVerification")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validateEmail.googleverifycode.required">{{$t("formMenu.googleCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input validation"
                     v-model.trim="$v.validateEmail.googleverifycode.$model"
                     :placeholder="$t('formMenu.googleInputVerification')"
                     type="text">
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click='openEmail'>{{$t("formMenu.bindding")}}
          </button>
        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import {required, email} from 'vuelidate/lib/validators'
  import verifycode from '@/components/public/verifycode'

  export default {
    name: "binding-email-google",
    components: {
      suggest, verifycode
    },
    validations: {
      validateEmail: {
        emailAddress: {
          required, email
        },
        googleverifycode: {
          required
        },
        emailverifycode: {
          required
        },
        smsverifycode: {
          required
        },
      }
    },
    data() {
      return {
        loading:false,
        submitState:false,
        state: {
          isopen: false,
          phone: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
          email: {
            state: false,
            sendDelay: this.$t("formMenu.getCode")
          },
        },
        validateEmail: {
          emailverifycode: '',
          googleverifycode: '',
          smsverifycode: '',
          emailAddress: ''
        },
        bindingStatue: '',
        isemail: ""
      };
    },
    mounted() {
    },
    methods: {
      goback(){
        this.$router.go(-1);
      },
      openEmail() {
        const _self = this;
        const _modifyEmail = this.$v.validateEmail;
        let postData;
        if (this.$userinfo.isopengoogleverify && this.$userinfo.isphoneauthed) {
          _modifyEmail.$touch();
          if (_modifyEmail.$invalid) {
            return;
          }
          if (_self.submitState) return;
          _self.submitState = true;
          _self.loading=true;
          postData = {
            authtype: 'AuthEmail',
            account: this.validateEmail.emailAddress,
            emailverifycode: this.validateEmail.emailverifycode,
            googleverifycode: this.validateEmail.googleverifycode,
            smsverifycode: this.validateEmail.smsverifycode
          }
        } else if (this.$userinfo.isphoneauthed) {
          _modifyEmail.emailverifycode.$touch();
          _modifyEmail.emailAddress.$touch();
          _modifyEmail.smsverifycode.$touch();
          if (_modifyEmail.emailverifycode.$invalid||_modifyEmail.emailAddress.$invalid||_modifyEmail.smsverifycode.$invalid){
            return;
          }
          if (_self.submitState) return;
          _self.submitState = true;
          _self.loading=true;
          postData = {
            authtype: 'AuthEmail',
            emailverifycode: this.validateEmail.emailverifycode,
            account: this.validateEmail.emailAddress,
            smsverifycode: this.validateEmail.smsverifycode
          }
        }
        if (_self.state.issopen) return;
        _self.state.isopen = true;
        this.$store.dispatch('user_user_auth', postData).then((res) => {
          if (res.data) {
            this.global_refresh_user_info();
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            this.$router.push("/person/security");
          }else{
            _self.submitState = false;
            _self.loading = false;
          }
        });
      }
    }
  };

</script>
<style lang='less' scoped>
  @import "./../../../static/styles/auth.less";
  @import "./../../../static/styles/color.less";
  @bg_858: #8583ac;
  @cl_333: #333;
  @cl_cd4: #cd4559;
  @cl_666: #666;
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }
  .bind-email-area .hint-text .auth-content_group_code {
    p {
      width: 400px;
      span.note {
        width: 270px
      }
    }
    .validation {
      width: 400px;
    }
  }

  .binding {
    .google-countant {
      background: white;
      padding: 0px 20px 30px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }

  .google-hint {
    overflow: hidden;
    padding-left: 26px;
    span {
      float: left;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .tag {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      color: white;
      background: #8583ac;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
    }
  }

  .hint-text {
    padding: 0px 26px 0px;
    color: @cl_666;
    font-size: 14px;
    p {
      line-height: 20px;
    }
    .download-link {
      margin-top: 20px;
      button {
        width: 136px;
        height: 40px;
        background: @cl_link;
        color: white;
        margin-right: 20px;
        text-align: left;
        padding-left: 49px;
      }
      button:last-child {
        padding-left: 44px;
      }
    }
  }

  .secret-key-code {
    margin-right: 20px;
  }

  .secret-keycopy {
    color: @cl_link;
  }

  .red-reg {
    color: @cl_cd4 !important;
  }

  span.validation-title {
    line-height: 17px;
    color: #666;
  }

  .input-field {
    width: 400px;
    margin-top: 6px;
  }

  .mgb0 {
    margin-bottom: 0;
  }

  .left.note .fr {
    color: rgba(187, 187, 187, 1);
  }

</style>
