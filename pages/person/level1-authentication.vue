<template>
  <div class='authentication-verification-first'>
    <p class='verifieds'>Lv.1 {{$t("memberCenter.verifieds")}}</p>
    <div class='authentication-countant'>

      <!--已经开启手机-->
      <div class='authentication-google '>
        <div class="ovh phone-isopen" v-if="$userinfo.isphoneauthed">
          <div class="googletext phone  fl">{{$t('patch.VerifyPhone')}}</div>
          <div class="fl">
            <div class="googletext">{{$userinfo.phone}}</div>

            <div class="auth-content_group auth-content_group_code "
                 v-if="!$userinfo.isemailauthed||!$userinfo.isphoneauthed"
                 :class="{'auth-content_group--error':$v.phone.phoneverifycode.$error}">
              <p class="ovh ">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.phone.phoneverifycode.required">
                {{$t('formMenu.phoneCodeVerificationNone')}}</span>
              </p>
              <div class="auth-content_group_mail clearfix">
                <input class="input"
                       v-model.trim="$v.phone.phoneverifycode.$model"
                       :placeholder="$t('formMenu.phoneInputVerification')"
                       type="text">
                <verifycode :phone="$userinfo.phone"></verifycode>
              </div>
            </div>
          </div>
        </div>
        <!--已经开启邮箱-->
        <div class="ovh email-isopen" v-if="$userinfo.isemailauthed">
          <div class="googletext phone  fl">{{$t('patch.VerifyEmail')}}</div>
          <div class="fl">
            <div class="googletext">{{$userinfo.email}}</div>
            <div class="auth-content_group auth-content_group_code "
                 v-if="!$userinfo.isemailauthed||!$userinfo.isphoneauthed"
                 :class="{'auth-content_group--error':$v.email.emailverifycode.$error}">
              <p class="ovh ">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.email.emailverifycode.required">
                {{$t('formMenu.emailCodeVerificationNone')}}</span>
              </p>
              <div class="auth-content_group_mail ">
                <input class="input"
                       v-model.trim="$v.email.emailverifycode.$model"
                       :placeholder="$t('formMenu.emialInputVerification')"
                       type="text">
                <verifycode :email="$userinfo.email?$userinfo.email:'0'"></verifycode>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="auth-content_group clearfix nation"
           v-if="!$userinfo.isphoneauthed"
           :class="{'auth-content_group--error':$v.phone.countryid.$error}">
        <div class="fl nationtext">
          <span>{{$t("formMenu.nationality")}}</span>
        </div>
        <div class="fl">
          <p class="title clearfix">
          <span class="normal-tip_error right"
                v-if="!$v.phone.countryid.required">{{$t("formMenu.nationSelect")}}</span>
          </p>
          <el-select
            filterable
            class="select_input mobile"
            popper-class="select_input_popper"
            :popper-append-to-body="false"
            v-model.trim="$v.phone.countryid.$model"
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
      </div>

      <!--没开启手机号码-->
      <div class='authentication-google ovh'>
        <div class="nothing-phone ovh" v-if="!$userinfo.isphoneauthed">
          <div class="googletext phone  fl">{{$t("formMenu.telPhone")}}</div>

          <div class="auth-content_group auth-content_group_code fl">
            <div :class="{'auth-content_group--error':$v.phone.telNumber.$error}">
              <p class="ovh ">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.phone.telNumber.required">
                {{$t('formMenu.phoneNone')}}</span>
                <span
                  :class="{'normal-tip_error_exi':isphone}"
                  class=" right fz12 mgb5"
                  style="color:#CD4559"> 手机号已存在</span>
              </p>
              <div class="auth-content_group_mail ">
                <input class="ipt_hover"
                       v-model.trim="$v.phone.telNumber.$model"
                       :placeholder="$t('formMenu.phoneNumber')"
                       type="text">
              </div>
            </div>
            <div class="auth-content_group_mail auth-content_group_mail_input"
                 :class="{'auth-content_group--error':$v.phone.phoneverifycode.$error}">
              <p class="ovh ">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.phone.phoneverifycode.required">
                {{$t('formMenu.phoneCodeVerificationNone')}}</span>
              </p>
              <input class="input"
                     v-model.trim="$v.phone.phoneverifycode.$model"
                     :placeholder="$t('formMenu.phoneInputVerification')"
                     type="text">
              <verifycode :phone="phone.telNumber?phone.telNumber:'0'"
                          :isexist="true"
                          @isexist="exist"
                          :nation="true"
                          :country="country"
                          @checkStatus="checkStatus"
                          ref="names"
              ></verifycode>
            </div>
          </div>
        </div>
        <!--没开启邮箱-->
        <div class="nothing-phone ovh" v-if="!$userinfo.isemailauthed">
          <div class="googletext phone  fl">{{$t("formMenu.telEmail")}}</div>
          <div class="auth-content_group fl ">
            <!--<span :class="{'normal-tip_error_exi':isphone}"-->
            <!--class=" right fz12 mgb5"-->
            <!--style="color:#CD4559"> 邮箱已存在</span>-->
            <div class="auth-content_group mgt0"
                 :class="{'auth-content_group--error':$v.email.emailAddress.$error}">
              <p class="title clearfix mgb5 ">
                <span class="normal-tip_error right fz12 mgb5" v-if="!$v.email.emailAddress.required">{{$t("formMenu.emailNone")}}</span>
                <span class="normal-tip_error right fz12 mgb5" v-if="!$v.email.emailAddress.email">{{$t("formMenu.emailFormatError")}}</span>
              </p>
              <input class="input"
                     v-model.trim="$v.email.emailAddress.$model"
                     :placeholder="$t('formMenu.emialInputAddress')"
                     type="text">
            </div>
            <div class="auth-content_group auth-content_group_code "
                 :class="{'auth-content_group--error':$v.email.emailverifycode.$error}">
              <p class="ovh">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.email.emailverifycode.required">
               {{$t('formMenu.emailCodeVerificationNone')}}</span>
              </p>
              <div class="auth-content_group_mail clearfix">
                <input class="input"
                       v-model.trim="$v.email.emailverifycode.$model"
                       :placeholder="$t('formMenu.emialInputVerification')"
                       type="text">
                <verifycode ref="emailNames"
                            :email="email.emailAddress?email.emailAddress:'0'"
                            :isexist="true"
                            @isexist="exist"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='authentication-google ovh' v-if="$userinfo.isopengoogleverify">
        <div class="googletext  fl">{{$t("formMenu.googleCodeVerification")}}</div>
        <div class="auth-content_group auth-content_group_code fl"
             :class="{'auth-content_group--error':$v.googleverifycode.$error}">
          <p class="ovh ">
              <span class="normal-tip_error right fz12 mgb5"
                    v-if="!$v.googleverifycode.required">
                {{$t('formMenu.googleCodeVerificationNone')}}</span>
          </p>
          <div class="auth-content_group_mail ">
            <input class="ipt_hover"
                   v-model.trim="$v.googleverifycode.$model"
                   :placeholder="$t('formMenu.googleInputVerification')"
                   type="text">
          </div>
        </div>
      </div>
      <button class='submit-audit button-loading--por'
              v-loading="loading"
              v-if="!$userinfo.isemailauthed||!$userinfo.isphoneauthed"
              @click="submits">{{$t("formMenu.bindding")}}
      </button>
    </div>
  </div>
</template>
<script>
  import articles from './security/index'
  import verifycode from "@/components/public/verifycode.vue";
  import levelauthed2 from './level2-authentication'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: "authentication",
    components: {
      articles, verifycode, levelauthed2
    },
    validations: {
      email: {
        emailverifycode: {//邮箱 验证码
          required
        },
        emailAddress: {//邮箱号码
          required, email
        }
      },
      phone: {
        countryid: {
          required
        },
        telNumber: {//手机号码
          required
        },
        phoneverifycode: {//手机验证码
          required
        }
      },
      googleverifycode: {//谷歌验证码
        required
      }
    },
    data() {
      return {
        loading: false,
        submitState: false,
        lang: this.$store.state.hex_lang.locale,
        googleverifycode: '',
        phone: {
          countryid: "",
          telNumber: '',
          phoneverifycode: ''
        },
        email: {
          emailAddress: '',
          emailverifycode: ''
        },
        state: 0,
        isphone: true,
        countryOptions: [],
        country: {}

      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        console.log(val)
        this.countryOptions.map((item) => {
          if (val == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          } else {
            item.name = item.chname;
          }
        });
      },
      'phone.countryid': function (val) {
        this.country = this.countryOptions.find((item) => {
          this.phone.telNumber = '';
          this.$v.phone.$reset();
          return item.countryid == val
        })
      }
    },
    mounted() {
      this.$store.dispatch('com_country_getlist').then(({data}) => {
        this.countryOptions = data;
        this.countryOptions.map((item) => {
          if (this.lang == 'en_us') {
            item.chname = item.name;
            item.name = item.engname;
          }
        });
      })
    },
    methods: {
      checkStatus(val) {
        const countryid = this.$v.phone[val];
        countryid.$touch();
        if (countryid.$invalid) return;
      },
      exist(val) {
        this.isphone = val;
      },
      submits() {
        let postData = {};
        const _this = this;
        const _user = this.$userinfo;
        if (_user.isemailauthed) { //已绑定邮箱
          const _phone = this.$v.phone;
          _phone.$touch();
          this.$v.email.emailverifycode.$touch();
          if (_user.isopengoogleverify) {
            this.$v.googleverifycode.$touch();
            if (this.$v.googleverifycode.$invalid) {
              return;
            }
          }
          if (_phone.$invalid || this.$v.email.emailverifycode.$invalid) {
            return;
          }
          if (_this.submitState) return;
          _this.submitState = true
          _this.loading = true;
          postData = {
            authtype: 'AuthPhone',
            countryid: _this.phone.countryid,
            countrycode: _this.country.areacode,
            account: _this.phone.telNumber,
            emailverifycode: _this.email.emailverifycode,
            smsverifycode: _this.phone.phoneverifycode
          }
          if (_user.isopengoogleverify) postData.googleverifycode = _this.googleverifycode;

        } else if (_user.isphoneauthed) {//已绑定手机
          const _email = _this.$v.email;
          _email.$touch();
          _this.$v.phone.phoneverifycode.$touch();
          if (_user.isopengoogleverify) {
            _this.$v.googleverifycode.$touch();
            if (_this.$v.googleverifycode.$invalid) {
              return;
            }
          }
          if (_email.$invalid || _this.$v.phone.phoneverifycode.$invalid) {
            return;
          }
          if (_this.submitState) return;
          _this.submitState = true;
          _this.loading = true;
          postData = {
            authtype: 'AuthEmail',
            account: this.email.emailAddress,
            emailverifycode: this.email.emailverifycode,
            smsverifycode: this.phone.phoneverifycode
          }
          if (_user.isopengoogleverify) postData.googleverifycode = this.googleverifycode;
        }
        this.$store.dispatch("user_user_auth", postData).then((res) => {
          if (res.data) {
            _this.$emit('getUserInfo');
            _this.$store.commit('set_message', {type: 'ok', text: res.msg});
          } else {
            _this.submitState = false;
            _this.loading = false;
          }
        })
      },
    }
  };
</script>

<style lang='less' scoped>
  @import "../../static/styles/color.less";
  @import "../../static/styles/auth.less";
.verifieds{
  font-size:16px;
  font-weight: bold;
}
  button.submit-audit.bg_bbb {
    background: #bbb !important;
  }

  .auth-content_group.clearfix.nation {
    border-radius: 0;
  }

  @border_color: rgba(221, 221, 221, 1);
  .googletext {
    margin-top: 10px;
    line-height: 40px;
    width: 175px;
    color: #666666;
  }

  .auth-content_group--error input {
    border: 1px solid #CD4559 !important;
    color: #CD4559 !important;
  }

  .normal-tip_error.right {
    margin-bottom: 5px;
  }

  .noneGetCode {
    width: 120px;
    margin-left: 10px;
    font-size: 14px;
    color: #6F8FF1;
    background-color: #F0EFF7;
    line-height: 40px;
    display: inline-block;
    float: right;
    text-align: center;
    cursor: pointer;
  }

  .normal-tip_error_exi {
    display: none;
  }

  .auth-content_group.nation {
    width: 100%;
    color: #666666;
    .nationtext {
      line-height: 40px;
      width: 175px;
    }
  }

  .authentication-verification-first {
    background: white;
    padding: 18px 20px;
    margin-bottom: 30px;
    height: 626px;
    box-sizing: border-box;
    .authentication-countant {
      font-size: 14px;
      padding-left: 56px;
      margin-top: 40px;
      .authentication-email {
        width: 100%;
        color: #666;
        span:last-child {
          margin-left: 58px;
          color: #333;
        }
      }
      .authentication-phone {
        .bindemail, .bindphone {
          margin-top: 20px;
        }
        div:first-child {
          color: #666;
        }
        .authentication-input {
          margin-left: 58px;
          .phone-number {
            width: 403px;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            border: 1px solid rgba(221, 221, 221, 1);
          }
          input.phone-number:hover {
            border: 1px solid rgba(133, 131, 172, 1);
          }
          .authentication-phone-number {
            margin-top: 10px;
            input {
              width: 270px;
              display: inline-block;
              margin-right: 10px;
              padding-left: 10px;
              border: 1px solid rgba(221, 221, 221, 1);
              height: 40px;
            }
            input:hover {
              border: 1px solid rgba(133, 131, 172, 1);
            }
            button.authentication-phone-btn {
              height: 40px;
              display: inline-block;
              text-align: center;
              width: 120px;
              background: rgba(240, 239, 247, 1);
              font-size: 14px;
              cursor: pointer;
            }
            button.authentication-phone-btn:hover {
              background: rgba(240, 239, 255, 1);
            }
          }
          .submit-audit {
            width: 120px;
            height: 40px;
            background: @cl_link;
            color: white;
            margin-top: 30px;
            font-size: 14px;
            cursor: pointer;
            color: white;
          }
          .submit-audit:hover {
            background: @cl_link_hover;
            text-align: center;
          }
        }
      }
    }
  }

  .auth-content_group_mail.auth-content_group_mail_input {
    margin-top: 10px;
  }

  .submit-audit {
    margin-left: 175px;
    width: 120px;
    height: 40px;
    background: @cl_link;
    color: white;
    margin-top: 30px;
    font-size: 14px;
    cursor: pointer;
    color: white;
  }

  .submit-audit:hover {
    background: @cl_link_hover;
    text-align: center;
  }

  .auth-content_group {
    margin-top: 10px;
  }

  .auth-content_group.mgt0 {
    margin-top: 0;
  }

  .auth-content_group .title {
    display: inline;
  }


</style>
