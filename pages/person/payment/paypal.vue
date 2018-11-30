<template>
  <div>
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <nuxt-link to="/person/payment" class="traded_info_title left">
          <span class="traded_tip">Paypal</span>
        </nuxt-link>
      </div>
    </div>
    <div class="pay">
      <div class="tip ovh">
        <div class="prompt fl">{{$t('legalDeal.hinttext')}}：</div>
        <div class="fl tip-text" >
          <p>{{$t('legalDeal.hint')}}</p>
          <p>{{$t('legalDeal.hintTip')}}</p>
        </div>

      </div>
      <div class="formMenu">
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
             :class="{'auth-content_group--error':$v.bindBack.paypal.$error}">
          <p class="titles clearfix">
            <span class="left-tip left">{{$t('legalDeal.Collection')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.bindBack.paypal.required"
            >{{$t('c2c.Receipt')}}</span>
            <span   v-if="!$v.bindBack.paypal.$error"
                  class="left-tip-right right"
            >{{$t('legalDeal.transaction')}}</span>
          </p>
          <div class="auth-content_group">
            <input class="input validation"
                   v-model.trim="$v.bindBack.paypal.$model"
                   :placeholder="$t('c2c.PaypalAccount')"
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
        paypal: {
          required
        },
        payPassword: {
          required
        }
      }
    },
    data() {
      return {
        tip:true,
        loading: false,
        submitState: false,
        bindBack: {
          paymentName: '',
          paypal: '',
          payPassword: '',
        }
      }
    },
    methods: {
      submitBtn() {
        const _bindV = this.$v.bindBack;
        const _bindData = this.bindBack;
        _bindV.$touch();
        if (_bindV.$invalid) {
          return;
        }
        if (this.submitState ) return;
        this.submitState = true;
        this.loading = true;
        let postData = {
          payment: 'Paypal',
          paypassword: crypto.md5String(_bindData.payPassword),
          payconfig: {
            paytypeid: '850',
            paytypename: 'Paypal',
            realname: _bindData.paymentName,
            account: _bindData.paypal
          }
        }
        this.$store.dispatch('user_user_payments_set', postData).then(({data}) => {
          if (data) {
            this.$store.commit('set_message', {type: 'ok', text: this.$t('legalDeal.successfully')});
            this.$router.push("/person/payment");
          } else {
            this.submitState = false;
            this.loading = false;
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
  .cl_bbb {
    background: #bbb !important;
  }

  .person-block {
    position: relative;
    background-color: #ffffff;
    padding: 16px 20px 20px 20px;
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

  .titles.clearfix span.left-tip-right {
    color: rgba(187, 187, 187, 1);
    font-size: 12px;
  }

  .person-block_info .traded_info_title {
    background: url("../../../static/images/security/an_back@2x.svg") no-repeat left center;
    padding-left: 30px;
  }
</style>
