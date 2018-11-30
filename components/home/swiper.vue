<template>
  <div class="swiper-container">
    <no-ssr>
      <carousel :perPage="swiperBannel.length>3?3:swiperBannel.length"
                :speed="1300"
                :loop="true"
                :autoplay="true"
                :autoplayTimeout="6500">
        <slide v-for="bannel in swiperBannel" :key="bannel.id">
          <a v-if="bannel.articlehref" :href="bannel.articlehref" target="_blank">
            <img class="swiper-container-img" :src="bannel.imgurl" alt="">
          </a>
          <img class="swiper-container-img" v-else :src="bannel.imgurl" alt="">
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>
<script>
  import carousel from '@/plugins/carousel/Carousel'
  import slide from '@/plugins/carousel/Slide'
  
  export default {
    name: 'swiper',
    data() {
      return {
        swiperBannel: []
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.getarticle()
      }
    },
    components: {
      carousel, slide
    },
    created() {
      if (process.client) {
        this.getarticle()
      }
    },
    mounted() {
    },
    methods: {
      getarticle() {
        this.$store.dispatch('com_article_search', {
          menutype: 3821,
          pageindex: 1,//页数
          pagesize: 12,//条数
        }).then((artical) => {
          this.swiperBannel = (artical.data && artical.data.pagedata) ? artical.data.pagedata : []
        })
      }
    }
  }
</script>
<style lang='less'>
  .swiper-container-img {
    width: 390px;
    height: 136px;
    display: inline-block;
    min-height: 136px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
    cursor: pointer;
  }
  
  .swiper-container-img:hover {
    border: 1px solid rgba(136, 152, 223, 1);
  }
  
  .swiper-container a {
    display: inline-block;
  }
  
  .swiper-container {
    width: 1200px;
    margin: auto;
    height: 152px;
  }
  
  .swiper-container {
    .VueCarousel .VueCarousel-dot {
      margin-top: 0 !important;
      padding: 0 4px !important;
    }
    
    .VueCarousel .VueCarousel-wrapper {
      padding-bottom: 10px;
    }
    
    .VueCarousel .VueCarousel-inner .VueCarousel-slide:first-child {
      text-align: left;
    }
    
    .VueCarousel .VueCarousel-inner .VueCarousel-slide:nth-child(3n+0) {
      text-align: right;
    }
    
    .VueCarousel .VueCarousel-slide {
      text-align: center;
    }
    
    .VueCarousel .VueCarousel-dot-button {
      width: 30px !important;
      height: 2px !important;
      background-color: rgba(255, 255, 255, 0.3) !important;
      border-radius: 20px;
    }
    
    .VueCarousel .VueCarousel-dot-button:focus {
      outline: none;
    }
    
    .VueCarousel .VueCarousel-dot--active .VueCarousel-dot-button {
      background: linear-gradient(to left, #50D4FF, #2895FB) !important;
    }
    
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      width: 390px !important;
      margin-right: 15px;
      align-items: center;
      height: 133px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    }
    
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
      background: url('../../static/images/bannel-left.png') no-repeat center center;
    }
    
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
      background: url('../../static/images/bannel-right.png') no-repeat center center;
      
    }
  }
</style>

