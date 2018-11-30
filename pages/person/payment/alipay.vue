<template>
  <div>
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <nuxt-link to="/person/payment" class="traded_info_title left">
          <span class="traded_tip">{{$t('legalDeal.BindingAlipay')}}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="pay">
      <div class="tip ovh">
        <div class="prompt fl">{{$t('legalDeal.hinttext')}}：</div>
        <div class="fl tip-text">
          <p>{{$t('legalDeal.hint')}}</p>
          <p>{{$t('legalDeal.hintTip')}}</p>
        </div>
      </div>
      <div class="clearfix">
        <div class="formMenu fl">
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.bindBack.paymentName.$error}">
            <p class="titles clearfix">
              <span class="left-tip left">{{$t('legalDeal.Collectionname')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.bindBack.paymentName.required"
              >{{$t('legalDeal.CollectionnameNone')}}</span>
            </p>
            <div class="auth-content_group">
              <input class="input validation"
                     v-model.trim="$v.bindBack.paymentName.$model"
                     :placeholder="$t('legalDeal.realname')"
                     type="text">
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.bindBack.alipay.$error}">
            <p class="titles clearfix">
              <span class="left-tip left">{{$t('legalDeal.Alipayaccount')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.bindBack.alipay.required"
              ></span>
            </p>
            <div class="auth-content_group">
              <input class="input validation"
                     v-model.trim="$v.bindBack.alipay.$model"
                     :placeholder="$t('legalDeal.inputAlipayaccount')"
                     type="text">
            </div>
          </div>
          <div class="auth-content_group auth-content_group_code"
               :class="{'auth-content_group--error':$v.bindBack.payPassword.$error}">
            <p class="titles clearfix">
              <span class="left-tip left">{{$t('legalDeal.assetpassword')}}</span>
              <span class="normal-tip_error right"
                    v-if="!$v.bindBack.payPassword.required"
              >{{$t('legalDeal.inputassetpasswordNone')}}</span>
            </p>
            <div class="auth-content_group">
              <input class="input validation"
                     v-model.trim="$v.bindBack.payPassword.$model"
                     :placeholder="$t('legalDeal.inputassetpassword')"
                     @keyup.enter="submitBtn"
                     type="password">
            </div>
          </div>
          <button class='commitBtn button-loading--por'
                  v-loading="loading"
                  @click="submitBtn"
                  :class="{'cl_bbb':submitState}"
          >{{$t('formMenu.bindding')}}
          </button>
        </div>
        <div class="update fl ">
          <div class="file"
               :class="{'qrcode--error':$v.bindBack.qrcode.$error}">
            <img ref="image"
                 :src="bindBack.qrcode?bindBack.qrcode:''"
                 alt="">
            <span class="update-picture">+</span>
            <input type="file"
                   accept="image/*"
                   capture="camera"
                   @change="onFileChange($event)">
          </div>
          <p class="update-code">{{$t('legalDeal.QRcode')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  import crypto from "@/plugins/axios/crypto";

  export default {
    name: "payment",
    validations: {
      bindBack: {
        paymentName: {
          required
        },
        alipay: {
          required
        },
        payPassword: {
          required
        },
        qrcode: {
          required
        }
      }
    },
    data() {
      return {
        loading: false,
        submitState: false,
        bindBack: {
          paymentName: '',
          alipay: '',
          payPassword: '',
          qrcode: ''
        }
      }
    },
    methods: {
      onFileChange(event) {
        const _this = this;
        if (this.submitState ) return;
        _this.loading = true;
        this.submitState = true;
        let file = event.target.files[0];
        let formData = new FormData();
        formData.append("file", file);
        let imgUrlBase64;
        if (file.name) {
          let reader = new FileReader();
          imgUrlBase64 = reader.readAsDataURL(file);
          reader.onload = function (e) {
            _this.$store.dispatch("com_image_upload", {
              imagetype: 'Payment',
              imgbase64: (reader.result.split(','))[1],
              width: '120',
              height: '120',
              filename: new Date().getTime() + Number(Math.random() * 1000000000)
            }).then(({data}) => {
              if (data) {
                _this.bindBack.qrcode = data.imgurl;
                _this.submitState = false;
                _this.loading = false;
              }
            })
          }
        }
      },
      submitBtn() {
        const _this = this;
        const _bindV = this.$v.bindBack;
        const _bindData = this.bindBack;
        _bindV.$touch();
        if (_bindV.$invalid) {
          return;
        }
        if (_this.submitState ) return;
        _this.loading = true;
        _this.submitState = true;
        let postData = {
          payment: 'AliPay',
          paypassword: crypto.md5String(_bindData.payPassword),
          payconfig: {
            paytypeid: '849',
            paytypename: '支付宝',
            realname: _bindData.paymentName,
            imageurl: _bindData.qrcode,
            account: _bindData.alipay
          }
        }
        _this.$store.dispatch('user_user_payments_set', postData).then(({data}) => {
          if (data) {
            _this.$store.commit('set_message', {type: 'ok', text:_this.$t('legalDeal.successfully')});
            _this.$router.push("/person/payment");
          } else {
            _this.submitState = false;
            _this.loading = false;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../static/styles/auth.less";
.tip-text{
  width:90%;
}
  .person-block {
    position: relative;
    background-color: #ffffff;
    padding: 16px 20px 20px 20px;
  }

  .file.qrcode--error {
    border: 1px solid #CD4559;
  }

  .cl_bbb {
    background: #bbb !important;
  }

  .person-block .person-block_icon.wallet {
    background: url('../../../static/images/security/an_big_safe@2x.svg');
  }

  .person-block .person-block_icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
  }

  .person-block .person-block_info {
    padding-left: 56px;
    line-height: 36px;
  }

  .pay {
    margin-top: 10px;
    background: white;
    padding: 20px 20px 57px;
  }

  .traded_tip {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }

  .formMenu {
    margin-left: 20px;
    .auth-content_group_code {
      margin-top: 20px;
    }
  }

  .titles.clearfix {
    span {
      color: rgba(102, 102, 102, 1);
    }
  }

  .tip {
    background: rgba(249, 249, 251, 1);
    font-size: 14px;
    padding: 10px 20px;
    p {
      line-height: 24px;
    }
    .prompt {
      line-height: 24px;
      padding-left: 25px;
      background: url("../../../static/images/security/hint.png") no-repeat left center;
    }
  }

  auth-content_group_mail .input {
    width: 400px;
  }

  .left-tip, .normal-tip_error {
    font-size: 12px;
  }

  .auth-content_group {
    margin-top: 5px;
  }

  .update {
    margin-left: 40px;
    width: 120px;
  }

  .update-code {
    text-align: center;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    margin-top: 10px;
  }

  .file {
    position: relative;
    width: 120px;
    min-height: 120px;
    background: rgba(244, 246, 249, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    margin-top: 38px;
  }

  .update-picture {
    width: 42px;
    height: 42px;
    color: rgba(165, 169, 190, 1);
    font-size: 30px;
    text-align: center;
    line-height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .file input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  .person-block_info .traded_info_title {
    background: url("../../../static/images/security/an_back@2x.svg") no-repeat left center;
    padding-left: 30px;
  }
</style>
