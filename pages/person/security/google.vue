<template>
  <div class='goolge w990'>
    <popup
      @closepopup='popups()'
      @confirm='googleauthed'
      v-show="popupstate"
      ref="child"
    />
    <div class='common-head'>
      <span class='goback' @click="goback"></span>
      <span>
       {{$t('google.bindgoogle')}}
      </span>
    </div>
    <div class='google-countant'>
      <div class='google-download'>
        <div class='google-hint'>
          <span class='tag'>{{$t('google.one')}}</span>
          <span>{{$t('google.loadgoogle')}}</span>
        </div>
        <div class='hint-text'>
          <p>{{$t('google.iosload')}}</p>
          <p>{{$t('google.azload')}}</p>
          <div class='download-link'>
            <a href="https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8">
              <button class="apple">App Store</button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
              <button>Google Play</button>
            </a>
          </div>
        </div>
      </div>
      <div class='backups'>
        <div class='google-hint'>
          <span class='tag'>{{$t('google.two')}}</span>
          <span>{{$t('google.addSecretBackups')}}</span>
        </div>
        <div class='hint-text'>
          <p>{{$t('google.scan')}}</p>
          <p class='red-reg'>{{$t('google.saveKey')}}</p>
          <div class='google-code'>
            <div class='google-qrcode'>
              <!--<img :src='bindGoogleData.qrcode' alt="">-->
              <img :src='qrcode' :title="bindGoogleData.provisionurl" alt="">

            </div>
            <div class='secret-key'>
              <span>{{$t('google.key')}}：</span>
              <span id='keycopy'>{{encsecretkey}}</span>
              <button class='secret-keycopy'
                      data-clipboard-target="#keycopy"
                      @click="copy">{{$t('google.copy')}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class='validation-area'>
        <div class='google-hint mgb0'>
          <span class='tag'>{{$t('google.three')}}</span>
          <span>{{$t('google.googleInput')}}</span>
        </div>
        <div class=" hint-text">
          <div class="auth-content_group auth-content_group_code"
               v-if="$userinfo.isphoneauthed"
               :class="{'auth-content_group--error':$v.smsverifycode.$error}">
            <div class="title clearfix vcode">
              <p class="titlePhone fl">
                <span class="left">{{$t('formMenu.phoneCodeVerification')}}</span>
                <span class=" right">{{global_string_split($userinfo.phone)}}</span>
              </p>
              <p class="fr">
              <span class="normal-tip_error right"
                    v-if="!$v.smsverifycode.required">{{$t('formMenu.phoneCodeVerificationNone')}}</span>
              </p>
            </div>
            <div class="auth-content_group_mail">
              <input class="input vcode"
                     v-model.trim="$v.smsverifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     type="text">
              <verifycode :phone="$userinfo.phone" :template="'GoogleVerifySettingsOpened'"></verifycode>
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               v-if="$userinfo.isemailauthed"
               :class="{'auth-content_group--error':$v.emailverifycode.$error}">
            <div class="title clearfix vcode">
              <p class="titlePhone fl">
                <span class="left">{{$t('formMenu.emailCodeVerification')}}</span>
                <span class=" right">{{global_string_split($userinfo.email)}}</span>
              </p>
              <p class="fr">
              <span class="normal-tip_error right"
                    v-if="!$v.emailverifycode.required">{{$t('formMenu.emailCodeVerificationNone')}}</span>
              </p>
            </div>
            <div class="auth-content_group_mail">
              <input class="input vcode"
                     v-model.trim="$v.emailverifycode.$model"
                     :placeholder="$t('formMenu.emialInputVerification')"
                     type="text">
              <verifycode :email="$userinfo.email" :template="'GoogleVerifySettingsOpened'"></verifycode>
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.googleverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.googleverifycode.required"
              >{{$t('formMenu.googleCodeVerificationNone')}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input validation"
                     v-model.trim="$v.googleverifycode.$model"
                     :placeholder="$t('formMenu.googleInputVerification')"
                     @keyup.enter="googleauthed"
                     type="text">
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click='googleauthed'>{{$t('formMenu.bindding')}}
          </button>

        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import popup from '@/components/security/popup-public'
  import Clipboard from 'clipboard';
  import {required} from 'vuelidate/lib/validators'
  import QRcode from 'qrcode'
  import verifycode from '@/components/public/verifycode'


  export default {
    name: "google",
    components: {
      suggest,
      popup,
      verifycode
    },
    validations: {
      googleverifycode: {
        required
      },
      emailverifycode: {
        required
      },
      smsverifycode: {
        required
      }
    },
    data() {
      return {
        loading: false,
        submitState: false,
        emailverifycode: '',
        smsverifycode: '',
        isGooglePopup: false,
        isgoogleauthed: false,//是否绑定谷歌
        googleverifycode: '',
        popupstate: 0,
        bindGoogleData: {},
        qrcode: '',
        secretKey: '',
        encsecretkey:'',
        state: {
          tab: ''
        },
      }
    },
    mounted() {
      this.$store.dispatch('user_ga_create')
        .then((res) => {
          if (res.data) {
            this.bindGoogleData = res.data;
            this.secretKey = this.bindGoogleData['secretkey'];//短
            this.encsecretkey=this.bindGoogleData['encsecretkey'];//长
            this.getCode();
          }
        })
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getCode() {
        QRcode.toDataURL(this.bindGoogleData.provisionurl).then((url) => {
          this.qrcode = url;
        })
      },
      googleauthed() {
        const _user = this.$userinfo;
        let postData = {};
        if (_user.isphoneauthed && _user.isemailauthed) {
          this.$v.googleverifycode.$touch();
          this.$v.smsverifycode.$touch();
          this.$v.emailverifycode.$touch();
          if (this.$v.googleverifycode.$invalid || this.$v.smsverifycode.$invalid || this.$v.emailverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            smsverifycode: this.smsverifycode,
            emailverifycode: this.emailverifycode,
            account: this.secretKey,
            googleverifycode: this.googleverifycode
          }
        } else if (_user.isphoneauthed) {
          this.$v.googleverifycode.$touch();
          this.$v.smsverifycode.$touch();
          if (this.$v.googleverifycode.$invalid || this.$v.smsverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            account: this.secretKey,
            smsverifycode: this.smsverifycode,
            googleverifycode: this.googleverifycode
          }
        } else {
          this.$v.googleverifycode.$touch();
          this.$v.emailverifycode.$touch();
          if (this.$v.googleverifycode.$invalid || this.$v.emailverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthGoogle',
            emailverifycode: this.emailverifycode,
            account: this.secretKey,
            googleverifycode: this.googleverifycode
          }
        }
        if (this.submitState) return;
        this.submitState = true;
        this.loading = true;
        this.$store.dispatch('user_user_auth', postData).then((res) => {
          if (res.data) {
            this.popupstate = 0;
            this.global_refresh_user_info();
            this.$store.commit('set_message', {type: 'ok', text: res.msg});
            this.$router.push("/person/security");
          } else {
            this.submitState = false;
            this.loading = false;
          }
        });
      },
      copy() {
        let clipboard = new Clipboard('.secret-keycopy');
        clipboard.on('success', e => {
          this.$store.commit('set_message', {type: 'ok', text: this.$t('patch.copysuccess')})
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          this.$store.commit('set_message', {type: 'error', text: '复制失败'})
          clipboard.destroy()
        })
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "../../../static/styles/auth.less";

  @bg_858: #8583ac;
  @cl_333: #333;
  @cl_cd4: #cd4559;
  @cl_666: #666;
  button.commitBtn.bg_bbb {
    background: #bbb !important;
  }

  .auth-content_group .normal-tip_error {
    color: #CD4559;
    display: none;
  }

  .goolge {
    .google-countant {
      background: white;
      padding: 20px 20px 0px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }

  .google-hint {
    overflow: hidden;
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
    margin: 20px 26px 40px;
    color: @cl_666;
    font-size: 14px;
    line-height: 22px;
    .download-link {
      margin-top: 20px;
      button {
        width: 136px;
        height: 40px;
        background: @cl_link url('../../../static/images/security/down_google.svg') no-repeat 14px center;
        background-size: 18px 22px;
        color: white;
        margin-right: 20px;
        text-align: left;
        padding-left: 44px;
      }
      button.apple {
        padding-left: 49px;
        background: @cl_link url('../../../static/images/security/down_ios.svg') no-repeat 20px center;
        background-size: 18px 22px;
      }
    }
  }

  .backups {
    overflow: hidden;
    .google-code {
      overflow: hidden;
      height: 116px;
      margin-top: 20px;
      div {
        float: left;
      }
      .google-qrcode {
        width: 116px;
        height: 116px;
        margin-right: 20px;
        background: gray;

      }
      .secret-key {
        position: relative;
        bottom: -90px;
      }
    }
  }

  .secret-key-code {
    margin-right: 20px;
  }

  .secret-keycopy {
    color: @cl_link;
    background: white;

  }

  .red-reg {
    color: @cl_cd4;
  }

  .input-field {
    width: 400px;
    margin-top: 6px;
  }

  .mgb0 {
    margin-bottom: 0;
  }

  #keycopy {
    margin-right: 20px;
  }

  .auth-content_group_mail .input,
  .auth-content_group.auth-content_group_code .title,
  .auth-content_group.auth-content_group_code .title.vcode {
    width: 400px;
  }

  .auth-content_group_mail .input.vcode .titlePhone,
  .auth-content_group.auth-content_group_code .auth-content_group_mail .input.vcode,
  .auth-content_group.auth-content_group_code .title .titlePhone {
    width: 270px;
  }

  .titlePhone.fl span.right {
    color: rgba(187, 187, 187, 1);
  }

  .auth-content_group .title {
    margin-bottom: 0;
  }

  .auth-content_group {
    margin-top: 10px;
  }

</style>
