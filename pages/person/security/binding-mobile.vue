<template>
  <div class='binding w990'>
    <div class='common-head'>
      <span class='goback' @click="goback"></span>
      <span>{{$t('formMenu.bindPhone')}}</span>
    </div>
    <div class='google-countant'>
      <div class='validation-area bind-email-area'>
        <div class='hint-text'>
          <div v-if="$userinfo.isemailauthed"
               class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validatePhone.emailverifycode.$error}">
            <p class="title clearfix">
              <span class="left note">
                <span>{{$t("formMenu.emailCodeVerification")}}</span>
                <span class="fr">{{global_string_split($userinfo.email)}}</span>
              </span>
              <span class="normal-tip_error right"
                    v-if="!$v.validatePhone.emailverifycode.required">{{$t("formMenu.emailCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.validatePhone.emailverifycode.$model"
                     :placeholder="$t('formMenu.emialInputVerification')"
                     type="text">
              <verifycode :email="$userinfo.email"></verifycode>
            </div>
          </div>


          <div class="auth-content_group nation"
               :class="{'auth-content_group--error':$v.validatePhone.countryid.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.nationality")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validatePhone.countryid.required">{{$t("formMenu.nationSelect")}}</span>
            </p>
            <el-select
              filterable
              class="select_input mobile"
              popper-class="select_input_popper"
              :popper-append-to-body="false"
              v-model.trim="$v.validatePhone.countryid.$model"
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

          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validatePhone.telNumber.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.telPhone")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validatePhone.telNumber.required">{{$t("formMenu.phoneNone")}}</span>
              <span class=" right"
                    :class="{'normal-normal-tip_error':isphone}"
                    style="color:#CD4559"
                    v-if="!isphone">{{$t('patch.PhoneExists')}}</span>
              <span class=" right"
                    :class="{'normal-normal-tip_error':phoneformat}"
                    style="color:#CD4559"
                    v-if="!phoneformat">{{$t('patch.MobileIncorrect')}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input validation"
                     v-model.trim="$v.validatePhone.telNumber.$model"
                     :placeholder="$t('formMenu.phoneNumberInput')"
                     type="text"
              >
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validatePhone.smsverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t("formMenu.phoneCodeVerification")}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validatePhone.smsverifycode.required">{{$t("formMenu.phoneCodeVerificationNone")}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input"
                     v-model.trim="$v.validatePhone.smsverifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     type="text">

              <verifycode ref="names"
                          :phone="validatePhone.telNumber?validatePhone.telNumber:'0'"
                          :isexist="true"
                          :country="country"
                          @isexist="exist"
                          @change="change"
                          @checkStatus="checkStatus"
              ></verifycode>
            </div>
          </div>
          <div v-if="$userinfo.isopengoogleverify"
               class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.validatePhone.googleverifycode.$error}">
            <p class="title clearfix">
              <span class="left">{{$t('formMenu.googleCodeVerification')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.validatePhone.googleverifycode.required">{{$t('formMenu.googleCodeVerificationNone')}}</span>
            </p>
            <div class="auth-content_group_mail">
              <input class="input validation"
                     v-model.trim="$v.validatePhone.googleverifycode.$model"
                     :placeholder="$t('formMenu.googleInputVerification')"
                     @keyup.enter="openPhone"
                     type="text">
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click='openPhone'>{{$t("formMenu.bindding")}}
          </button>
        </div>
      </div>
    </div>
    <suggest/>
  </div>
</template>
<script>
  import suggest from './setting-suggest'
  import {required} from 'vuelidate/lib/validators'
  import verifycode from '@/components/public/verifycode'

  export default {
    name: "binding-email-google",
    components: {
      suggest, verifycode
    },
    validations: {
      validatePhone: {
        telNumber: {
          required
        },
        countryid: {
          required
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
    watch: {
      'validatePhone.countryid': function (val) {
        this.country = this.countryOptions.find((item) => {
          this.validatePhone.telNumber = '';
          this.$v.$reset();
          return item.countryid == val
        })
      },
      '$store.state.hex_lang.locale': function (val) {
        this.countryOptions.map((item) => {
          if (val == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          } else {
            item.name = item.chname;
          }
        });
      }
    },
    data() {
      return {
        loading: false,
        lang: this.$store.state.hex_lang.locale,
        state: {
          isopen: false,
          phone: {
            state: false,
            sendDelay: this.$t('formMenu.getCode')
          },
          email: {
            state: false,
            sendDelay: this.$t('formMenu.getCode')
          },
        },
        validatePhone: {
          countryid: "",
          emailverifycode: '',
          googleverifycode: '',
          smsverifycode: '',
          telNumber: ''
        },
        country: {},
        isphone: true,
        countryOptions: [],
        phoneformat: true,
        submitState: false
      };
    },
    mounted() {
      this.$store.dispatch('com_country_getlist').then(({data}) => {
        this.countryOptions = data
        this.countryOptions.map((item) => {
          if (this.lang == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          }
        });
      })
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      checkStatus(val) {
        const countryid = this.$v.validatePhone[val];
        countryid.$touch();
        if (countryid.$invalid) return;
      },
      change(val) {
        this.phoneformat = val;
      },
      exist(val) {
        this.isphone = val;
      },
      openPhone() {
        const _self = this;
        const _modifyPhone = this.$v.validatePhone;
        let postData;
        if (this.$userinfo.isopengoogleverify) {
          _modifyPhone.$touch();
          if (_modifyPhone.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthPhone',
            countryid: _self.validatePhone.countryid,
            countrycode: _self.country.areacode,
            account: _self.validatePhone.telNumber,
            emailverifycode: _self.validatePhone.emailverifycode,
            googleverifycode: _self.validatePhone.googleverifycode,
            smsverifycode: _self.validatePhone.smsverifycode
          }
        } else {
          _modifyPhone.emailverifycode.$touch();
          _modifyPhone.telNumber.$touch();
          _modifyPhone.smsverifycode.$touch();
          if (_modifyPhone.emailverifycode.$invalid || _modifyPhone.telNumber.$invalid || _modifyPhone.smsverifycode.$invalid) {
            return;
          }
          postData = {
            authtype: 'AuthPhone',
            countryid: _self.validatePhone.countryid,
            countrycode: _self.country.areacode,
            emailverifycode: _self.validatePhone.emailverifycode,
            account: _self.validatePhone.telNumber,
            smsverifycode: _self.validatePhone.smsverifycode
          }
        }
        if (_self.state.issopen) return;
        if (_self.submitState) return;
        _self.submitState = true;
        _self.loading = true;
        _self.state.isopen = true;
        _self.$store.dispatch('user_user_auth', postData).then((res) => {
          if (res.data) {
            _self.global_refresh_user_info();
            _self.$store.commit('set_message', {type: 'ok', text: res.msg});
            _self.$router.push("/person/security");
          } else {
            _self.submitState = false;
            _self.loading = false;
          }
        })
      },
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

  .nation {
    border-radius: 0;
  }

  .nogetcode {
    width: 120px;
    margin-left: 10px;
    font-size: 14px;
    color: @cl_link;
    background-color: #ccc;
    line-height: 40px;
    display: inline-block;
    float: right;
    text-align: center;
    cursor: pointer;
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
      padding: 0 20px 30px;
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

  .select_input.mobile {
    width: 400px;
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

  .auth-content_group .title {
    margin-bottom: 0;
  }
</style>
