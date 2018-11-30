<template>
  <div class="home hex-flex">
    <div class='headarea'>
      <div class='welcome'>
        <div class='bannel'>
          <Bannelarticle style="position: absolute;top: 0;"/>
          <p class='hex'>{{ $t("home.bannelTitle") }}</p>
          <p class='perceive_hex'>{{$t("home.bannelMarkedWords") }}</p>
          <swiper/>
          <currency/>
        </div>
      </div>
    </div>
    <div class='area'>
      <trade/>
      <exprience/>
      <terminal/>
    </div>
    <a href="/mobile/download" class="download_load" :class="{'download_load_block':IsPhone}">
      <img src="~/static/images/load.png" alt="">
    </a>
  </div>
</template>
<script>
  import trade from "@/components/home/trade";
  import exprience from "@/components/home/exprience";
  import terminal from "@/components/home/terminal";
  import swiper from "@/components/home/swiper";
  import Bannelarticle from "@/components/home/banner-article";
  import currency from "@/components/home/currency-figure";

  export default {
    name: "Home",
    watch: {
      '$store.state.hex_lang.locale': function () {
        // this.getarticle()
      }
    },
    components: {
      trade,
      exprience,
      terminal,
      swiper,
      Bannelarticle,
      currency
    },
    data() {
      return {
        IsPhone: false
      };
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
      }
    },
    mounted() {
      this.isphone();
    },
    created() {

    },
    beforeDestroy() {
      this.$socket.cleartimer(this.$socket.url.quotation_daily_getall_figure)
    }
  };

</script>
<style lang='less' scoped>
  .swiper-container {
    margin-top: 60px !important;
  }

  .headarea {
    min-width: 1200px;
    background: #131316;
    background-size: 100% auto;
  }

  .por.area {
    /*  padding-top:142px;*/
    padding-top: 40px;
  }

  .headarea .bg1c {
    background: rgba(28, 27, 54, 0.1098);
  }

  .headarea .bg1c /deep/ .header {
    background-color: rgba(30, 34, 42, 1);
  }

  .welcome {
    padding-top: 40px;
    position: relative;
  }

  .swiper_area {
    width: 1200px;
    position: absolute;
    top: -70px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .hex {
    text-align: center;
    font-size: 30px;
  }

  .perceive_hex {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }

  .bgf5 {
    .h400 {
      height: 400px;
      background: #1c1b36;
    }
    background: #f5f5f8;
  }

  .home {
    background: white;
    color: black;
  }

  .bannel {
    min-height: 400px;
    margin-top: 59px;
    color: white;
    text-align: center;
    .bannel-logo {
      width: 50px;
      height: 63px;
      margin: 0px auto 20px;
    }
  }

  .menu-cur {
    background: #6F8FF1;
    color: white;
  }

  .download_load {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 5;
    display: none;
  }

  .download_load_block {
    display: block;
  }
</style>
