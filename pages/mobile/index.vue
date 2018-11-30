<template>
  <div class="invitation" :style="{'height':heightH+'px','width':IsPhone?'100%':'30%','margin':IsPhone?'inherit':'auto'}">
    <p class="invitation-title">您好！先行者！</p>
    <p class="invitation-title">欢迎来到HEX的世界</p>
    <p class="invitation-experience">开启数字资产交易新体验</p>
    <p class="invitation-person">你的好友邀请你参与HEX公测</p>
    <div class="register-btn" @click="register">
      <img src="~/static/images/guide/register-btn.png" alt="">
    </div>
    <p class="down-hex">我已经有账号，前往
      <nuxt-link to="/mobile/download" tag="span">下载HEX APP</nuxt-link>
    </p>
    <downitem/>
  </div>
</template>

<script>
  import downitem from '@/components/auth/downitem'

  export default {
    name: "index",
    layout: 'm-default',
    components: {
      downitem
    },
    data() {
      return {
        heightH: '',
        invitecode: "",
        IsPhone: true,
        windowW:'100%'
      }
    },
    mounted() {
      this.isphone();
      this.invitecode = this.$route.query.invitecode ? this.$route.query.invitecode : '';
      this.heightH =window.innerHeight;

    },
    methods: {
      isphone() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
          }
        }
        this.IsPhone = flag;
      },
      register() {
        if (this.invitecode) {
          this.$router.push({
            name: 'mobile-register',
            query: {
              invitecode: this.invitecode
            }
          })
        } else {
          this.$router.push('/mobile/register');
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  img {
    display: block;
    width: 100%;
  }

  .invitation {
    position: relative;
    padding-top: 8%;
    background: url('../../static/images/guide/invite-register.png') no-repeat top left;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    .invitation-title {
      font-size: 32px;
      color: #4169AA;
      letter-spacing: 1px;
      text-align: center;
      line-height: 32px;
    }
    .invitation-title:first-child {
      margin-bottom: 10px;
    }
    .invitation-experience {
      font-size: 18px;
      color: #4169AA;
      letter-spacing: 0;
      text-align: center;
      line-height: 26px;
      margin-top: 2.2%;
    }
    .invitation-person {
      font-size: 15px;
      color: #344B6C;
      letter-spacing: 0;
      text-align: center;
      margin-top: 1.2%;
      span {
        font-size: 15px;
        color: rgba(3, 191, 123, 1);
        letter-spacing: 0;
        text-align: center;
        line-height: 21px;
      }
    }
    .head-award {
      width: 60%;
      height: 4.2%;
      margin: auto;
      margin-top: 1.3%;
    }
    .register-btn {
      width: 44.8%;
      height: 7.5%;
      margin: 3.7% auto;
    }
    .down-hex {
      text-align: center;
      span {
        color: #2895fb;
      }
    }
  }

</style>
