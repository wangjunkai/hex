<template>
  <div>
    <div class="person-block">
      <span class="person-block_icon wallet"></span>
      <div class="person-block_info clearfix">
        <nuxt-link to="/person/payment" class="traded_info_title left">
          <span class="traded_tip">{{$t('legalDeal.bankcardcard')}}</span>
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
             :class="{'auth-content_group--error':$v.bindBack.bank.$error}">
          <p class="titles clearfix">
            <span class="left-tip left">{{$t('legalDeal.depositbank')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.bindBack.bank.required"
            >{{$t('legalDeal.depositbankNone')}}</span>
          </p>
          <div class="auth-content_group">
            <input class="input validation"
                   v-model.trim="$v.bindBack.bank.$model"
                   :placeholder="$t('legalDeal.inputbankname')"
                   type="text">
          </div>
        </div>
        <div class="auth-content_group auth-content_group_code"
             :class="{'auth-content_group--error':$v.bindBack.openingBranch.$error}">
          <p class="titles clearfix">
            <span class="left-tip left">{{$t('legalDeal.openingbranch')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.bindBack.openingBranch.required"
            >{{$t('legalDeal.openingbranchNone')}}</span>
          </p>
          <div class="auth-content_group">
            <input class="input validation"
                   v-model.trim="$v.bindBack.openingBranch.$model"
                   :placeholder="$t('legalDeal.inputbranchname')"
                   type="text">
          </div>
        </div>
        <div class="auth-content_group auth-content_group_code"
             :class="{'auth-content_group--error':$v.bindBack.bankNumber.$error}">
          <p class="titles clearfix">
            <span class="left-tip left">{{$t('legalDeal.bankaccount')}}</span>
            <span class="normal-tip_error right"
                  v-if="!$v.bindBack.bankNumber.required"
            >{{$t('legalDeal.bankaccountNone')}}</span>
          </p>
          <div class="auth-content_group">
            <input class="input validation"
                   v-model.trim="$v.bindBack.bankNumber.$model"
                   :placeholder="$t('legalDeal.inputbankaccount')"
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
        bank: {
          required
        },
        openingBranch: {
          required
        },
        bankNumber: {
          required
        },
        payPassword: {
          required
        }
      }
    },
    data() {
      return {
        loading: false,
        bindBack: {
          paymentName: '',
          bank: '',
          openingBranch: '',
          bankNumber: '',
          payPassword: '',
        }
      }
    },
    methods: {
      submitBtn() {
        const _bind = this.$v.bindBack;
        const _bindData = this.bindBack;
        const _this = this;
        _bind.$touch();
        if (_bind.$invalid) return;
        _this.loading = true;
        let postData = {
          payment: 'BankCard',
          paypassword: crypto.md5String(_bindData.payPassword),
          payconfig: {
            paytypeid: '848',
            paytypename: '银行卡',
            realname: _bindData.paymentName,
            bankname: _bindData.bank,
            branchname: _bindData.openingBranch,
            account: _bindData.bankNumber
          }
        }
        _this.$store.dispatch('user_user_payments_set', postData).then(({data}) => {
          if (data) {
            _this.$store.commit('set_message', {type: 'ok', text: _this.$t('legalDeal.successfully')});
            _this.$router.push("/person/payment");
          }
          _this.loading = false;

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

  .person-block_info .traded_info_title {
    background: url("../../../static/images/security/an_back@2x.svg") no-repeat left center;
    padding-left: 30px;
  }
</style>
