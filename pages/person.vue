<template>
  <div class="hex-flex">
    <div class="person  hex-flex_auto">
      <div class='w1200 pdt20 pdb20 clearfix'>
        <div class='articles   fl'>
          <div class='articles'>
            <div class='person mgb4'>
              <h2 class='fw personage'>{{$t('person.memberCenter')}}</h2>
              <ul>
                <nuxt-link
                  :class="{'hover':selfRoute.person==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.person}">
                  {{$t('person.home')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.authentication==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.authentication}">
                  {{$t('person.authentication')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.payment==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.payment}">
                  {{$t('legalDeal.payment')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.invitation==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.invitation}">
                  {{$t('invitation.Invite')}}
                </nuxt-link>
              </ul>
            </div>
            <div class='wallet mgb4'>
              <h2 class='money'> {{$t('legalTrad.asset')}}</h2>
              <ul>
                <nuxt-link
                  :class="{'hover':selfRoute.wallet==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.wallet}">
                  {{$t('person.chargeMoney')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.walletHistory==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.walletHistory}">
                  {{$t('person.chargeRecord')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.manage==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.manage}">
                 {{$t('manage.Financialassets')}}
                </nuxt-link>

              </ul>
            </div>
            <div class='transaction mgb4'>
              <h2 class='deal'>{{$t('legalTrad.entrust')}}</h2>
              <ul>
                <nuxt-link
                  :class="{'hover':selfRoute.deal==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.deal}">
                  {{$t('home.headCionDeal')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.legal==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.legal}">
                  {{$t('legalDeal.fiatdeal')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.financialDeal==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.financialDeal}">
                  {{$t('manage.transaction')}}
                </nuxt-link>
              </ul>
            </div>
            <div class='security mgb4'>
              <h2 class='safety'> {{$t('person.security')}}</h2>
              <ul>
                <nuxt-link
                  :class="{'hover':selfRoute.security==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.security}">
                  {{$t('person.settings')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.withdraw==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.withdraw}">
                  {{$t('person.address')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.history==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.history}">
                  {{$t('person.loginHistory')}}
                </nuxt-link>
                <nuxt-link
                  :class="{'hover':selfRoute.api==selfRoute.active}"
                  tag="li"
                  :to="{path:selfRoute.api}">
                  {{$t('person.ceartApi')}}
                </nuxt-link>
              </ul>
            </div>
            <div class='changes button-loading--por'
                 v-loading="loading"
                 @click="quitAccount"> {{$t('person.switchAccount')}}
            </div>
          </div>
        </div>
        <div class="right">
          <nuxt-child/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'articles',
    data() {
      return {
        loading: false
      }
    },
    computed: {
      hovers: function () {
        return this.$store.state.hovers
      },
      selfRoute: function () {
        return this.$store.state.route
      }
    },
    methods: {
      quitAccount() {
        this.loading = true;
        this.$router.push('/')
        this.$store.commit('remove_user_info');
      },
    }
  }

</script>
<style lang='less' scoped>
  .openUp {
    font-size: 12px;
    border: 1px solid rgba(82, 90, 113, 1);
    padding: 0 1px;
    border-radius: 2px;
    color: rgba(118, 127, 154, 1);
    
  }
  
  .right {
    width: 990px;
  }
  
  .person, .articles {
    background: #f5f5f8;
  }
  
  .mgb4 {
    margin-bottom: 4px;
  }
  
  .articles .person .personage {
    background: white url('../static/images/person/icon_personage.svg') no-repeat 11px center;
    background-size: 14px auto;
  }
  
  .articles .security .safety {
    background: white url('../static/images/person/icon_safety.svg') no-repeat 11px center;
    background-size: 14px auto;
  }
  
  .articles .transaction .deal {
    background: white url('../static/images/person/icon_deal.svg') no-repeat 11px center;
    background-size: 16px auto;
  }
  
  .articles .wallet .money {
    background: white url('../static/images/person/icon_money.svg') no-repeat 11px center;
    background-size: 14px auto;
  }

</style>
