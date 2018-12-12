<template>
  <div class="financial-product" @click="goRush">
    <img class="icon" :src="product.currencyicon" alt="">
    <p class="title" v-if="product.pronames">{{lang=='en_us'?product.pronames.en_us:product.pronames.zh_cn}}</p>
    <p class="title" v-else>{{product.name}}</p>
    <p class="rate">{{(product.yearlyrate*100).toFixed(2)}}%</p>
    <p class="rate_tip">{{$t('manage.Estimate')}}</p>
    <p class="process">
      <span class="process_tip" :style="{'width':getProcess()}"></span>
    </p>
    <p class="lock">{{$t('manage.sold')}} {{product.selledamount}}</p>
    <financial-button :product="product"></financial-button>
  </div>
</template>


<style lang='less' scoped>
  @import "../../static/styles/color";
  
  .financial-product {
    position: relative;
    width: 270px;
    height: 324px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 10px 2px rgba(51, 51, 51, 0.15);
    text-align: center;
    line-height: 1;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    cursor: pointer;
    .icon {
      width: 25px;
      height: 25px;
      margin: 25px auto 10px auto;
      display: block;
    }
    .title {
      color: @cl_333;
      font-size: 16px;
      margin-bottom: 35px;
      font-weight: 600;
      padding: 0 5px;
    }
    .rate {
      font-family: HexNumber;
      color: @cl_financial;
      font-size: 45px;
      font-weight: 600;
      margin-bottom: 10px;
      display: inline-block;
    }
    .rate_tip {
      margin-bottom: 35px;
      font-size: 14px;
      color: #999999;
    }
    .process {
      width: 246px;
      height: 8px;
      background: rgba(240, 240, 240, 1);
      border-radius: 2px;
      margin: 0 auto 10px auto;
      position: relative;
      .process_tip {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        border-radius: 2px;
        height: 8px;
        background-color: @cl_financial;
      }
    }
    .lock {
      color: #666666;
      font-size: 14px;
    }
    .rush {
      text-align: center;
      line-height: 44px;
      color: #ffffff;
      font-size: 16px;
      background: @cl_financial;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .no_rush {
      background: #F8F8F8;
      color: #999999;
    }
  }
  
  .financial-product:hover {
    transform: translateY(-10px);
  }
</style>
<script>
  import finbutton from '@/components/financial/financial-button'
  
  export default {
    name: "block",
    props: {
      product: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
      'financial-button': finbutton
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
      }
    },
    data() {
      return {
        lang: this.$store.state.hex_lang.locale
      };
    },
    methods: {
      goRush() {
        this.$router.push({path: '/financial/' + this.product.id})
      },
      getProcess() {
        let pro = Math.abs(this.$np.divide(this.product.selledamount, this.product.expectamount)) * 100
        if (pro < 0.5) {
          pro = 0.5
        }
        return pro + '%'
      }
    },
    mounted() {
    },
    created() {
    }
  };

</script>
