<template>
  <div class="invitation"  :style="{'width':IsPhone?'100%':'30%','margin':IsPhone?'inheart':'auto'}">
    <div class="incitation-success">
     <nuxt-link to="/mobile/download">
       <img src="~/static/images/guide/register-success.png" alt="">
     </nuxt-link>
      <div class="code">
        <img :src='qrcode' alt="">
      </div>
    </div>
    <downitem/>
  </div>
</template>
<script>
  import downitem from '@/components/auth/downitem'
  import QRcode from 'qrcode'

  export default {
    name: "register-success",
    layout: 'm-default',
    components: {
      downitem
    },
    data() {
      return {
        qrcode: '',
        IsPhone:true
      }
    },
    mounted() {
      this.getCode();
      this.isphone();
    },
    methods:{
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
      getCode() {
        QRcode.toDataURL('https://www.hex.com/mobile/download').then((url) => {
          this.qrcode = url;
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .invitation {
    position: relative;
    background: url('../../static/images/guide/success.png') no-repeat top left;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;

    .incitation-success {
      position: absolute;
      width: 45%;
      margin: auto;
      top: 27%;
      left:50%;
      transform: translate(-50%);
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
