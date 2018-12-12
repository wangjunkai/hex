<template>
  <div class="financial-content">
    <div class="financial">
      <!--banner-->
      <div class="banner-group clearfix">
        <div class="banner-swiper1">
          <no-ssr>
            <carousel :perPage="1"
                      :speed="500"
                      :autoplay="true"
                      :autoplayTimeout="6500">
              <slide v-for="bannel in swiperBannel" :key="bannel.id">
                <a v-if="bannel.articlehref" :href="bannel.articlehref" target="_blank">
                  <img class="banner-swiper1_img" :src="bannel.imgurl" alt="">
                </a>
                <img class="banner-swiper1_img" v-else :src="bannel.imgurl" alt="">
              </slide>
            </carousel>
          </no-ssr>
        </div>
        <div class="banner-swiper2">
          <div v-if="recommendBannel"
               class="banner-swiper2-content"
               @click="goRush(recommendBannel.id)">
            <p class="recommend">{{$t('manage.Popular')}}</p>
            <p class="title" v-if="recommendBannel.pronames">
              {{lang=='en_us'?recommendBannel.pronames.en_us:recommendBannel.pronames.zh_cn}}</p>
            <p class="title" v-else>{{recommendBannel.name}}</p>
            <p class="date">{{$t('manage.LimitTime')}} {{recommendBannel.cycle}} {{$t('manage.Day')}}</p>
            <p class="rate">{{(recommendBannel.yearlyrate*100).toFixed(2)}}%</p>
            <p class="rate_tip">{{$t('manage.Estimate')}}</p>
            <financial-button :product="recommendBannel"></financial-button>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-swiper3">
      <no-ssr>
        <carousel :perPage="3"
                  :paginationEnabled="false">
          <slide v-for="item in listBanner" :key="item.id">
            <div class="banner-swiper3-content" @click="goRush(item.id)">
              <p class="title" v-if="item.pronames">{{lang=='en_us'?item.pronames.en_us:item.pronames.zh_cn}}</p>
              <p class="title" v-else>{{item.name}}</p>
              <p class="clearfix">
                <span class="rate left">{{(item.yearlyrate*100).toFixed(2)}}%</span>
                <financial-button class="right" :product="item"></financial-button>
              </p>
              <p class="rate_tip">{{$t('manage.Estimate')}}</p>
            </div>
          </slide>
        </carousel>
      </no-ssr>
    </div>
    <div class="financial financial-block-main" v-hex-loading="areaListLoading">
      <!--content-->
      <template v-for="(group,groupindex) in areaList">
        <div class="financial-block-title clearfix"
             :key="`title${groupindex}`">
          <div class="title left" v-if="group.areatype==0">
            <img class="title_icon" :src="group.products[0].currencyicon" alt="">
            <span class="title_tip">{{group.currencyname.toUpperCase()}} {{$t('manage.Area')}}</span>
          </div>
          <div class="title left" v-else-if="group.areatype==1">
            <img class="title_icon" src="../../static/images/financial/hezuo.svg" alt="">
            <span class="title_tip">{{$t('manage.Cooperation')}}</span>
          </div>
          <div class="title left" v-else-if="group.areatype==2">
            <img class="title_icon" src="../../static/images/financial/wangqi.svg" alt="">
            <span class="title_tip">{{$t('manage.products')}}</span>
          </div>
          <span class="more right" @click="goLookMore(group)">{{$t('manage.ViewAll')}} 》</span>
        </div>
        <div class="financial-block clearfix"
             :key="`block${groupindex}`">
          <product v-for="(item,index) in group.products"
                   :product="item"
                   style="cursor: pointer"
                   :key="index"></product>
        </div>
      </template>
    
    </div>
  </div>
</template>
<style lang='less'>
  .financial-content {
    .banner-swiper1 {
      .VueCarousel-pagination {
        position: absolute;
        bottom: 20px;
      }
      .VueCarousel-dot {
        padding: 5px !important;
      }
      .VueCarousel-dot--active .VueCarousel-dot-button {
        background-color: rgb(255, 255, 255) !important;
      }
      .VueCarousel-dot-button {
        width: 40px !important;
        height: 2px !important;
        border-radius: 0 !important;
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
    }
    .banner-swiper3 {
      .VueCarousel-inner {
        padding-left: 4px;
      }
    }
  }
</style>
<style lang='less' scoped>
  @import "../../static/styles/color";
  
  .financial-content {
    padding-top: 20px;
    padding-bottom: 30px;
    background-color: #ffffff;
    background-image: url("../../static/images/financial/bg.png");
    background-repeat: no-repeat;
    
    .financial {
      width: 1200px;
      min-width: 1200px;
      margin: auto;
    }
    .financial-block-main {
      position: relative;
      min-height: 500px;
    }
    .banner-group {
      margin: 0 0 10px 0;
    }
    .banner-swiper1 {
      display: inline-block;
      width: 798px;
      height: 360px;
      float: left;
      .banner-swiper1_img {
        height: 360px;
      }
    }
    .banner-swiper2 {
      display: inline-block;
      height: 360px;
      width: 395px;
      overflow: hidden;
      float: right;
      .banner-swiper2-content:hover {
        transform: scale(0.95);
      }
      .banner-swiper2-content {
        cursor: pointer;
        display: inline-block;
        height: 360px;
        width: 395px;
        text-align: center;
        color: #FFFFFF;
        background: linear-gradient(315deg, rgba(163, 71, 245, 1) 0%, rgba(55, 139, 255, 1) 100%);
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        .recommend {
          font-size: 24px;
          line-height: 24px;
          font-weight: 600;
          margin: 40px 0 30px 0;
        }
        .recommend:before,
        .recommend:after {
          content: '';
          display: inline-block;
          width: 76px;
          opacity: 0.4012;
          border-top: 1px solid #ffffff;
          vertical-align: middle;
          margin: 0 15px;
        }
        .title {
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .date {
          font-size: 14px;
          margin-bottom: 20px;
        }
        .rate {
          font-family: HexNumber;
          font-size: 66px;
          line-height: 68px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .rate_tip {
          font-size: 14px;
          margin-bottom: 30px;
        }
        .rush {
          width: 208px;
          height: 44px;
          line-height: 44px;
          border-radius: 2px;
          border: 1px solid #ffffff;
          background: transparent;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .banner-swiper3 {
      width: 1210px;
      min-width: 1210px;
      margin: auto;
      min-height: 205px;
      .VueCarousel-slide {
        height: 205px;
      }
      .banner-swiper3-content:hover {
        transform: scale(0.95);
      }
      .banner-swiper3-content {
        display: inline-block;
        cursor: pointer;
        width: 395px;
        height: 190px;
        background-color: rgba(255, 255, 255, 1);
        background-image: url("../../static/images/financial/banner-2-bg.svg");
        background-repeat: no-repeat;
        background-position: top right;
        box-shadow: 0 5px 10px 0 rgba(255, 130, 0, 0.15);
        padding: 0 22px;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        .title {
          margin-top: 30px;
          margin-bottom: 30px;
          font-size: 20px;
          color: @cl_333;
          font-weight: 600;
        }
        .rate {
          font-family: HexNumber;
          font-size: 45px;
          line-height: 45px;
          font-weight: 600;
          color: @cl_financial;
        }
        .rush {
          width: 175px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #ffffff;
          background: @cl_financial;
          border-radius: 2px;
          text-align: center;
          margin-top: 4px;
        }
        .no_rush {
          background: #F8F8F8;
          color: #999999;
        }
        .rate_tip {
          color: #999999;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
    .financial-block-title {
      margin: 40px 0;
      line-height: 40px;
      .title {
        font-size: 0;
      }
      .title_icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 15px;
        vertical-align: middle;
      }
      .title_tip {
        color: #292E39;
        font-size: 26px;
        font-weight: 600;
        vertical-align: middle;
      }
      .more {
        font-size: 16px;
        color: @cl_link;
        cursor: pointer;
      }
    }
    
    .financial-block {
      position: relative;
      width: 1240px;
      left: -40px;
      .financial-product {
        float: left;
        margin-left: 40px;
      }
    }
  }
</style>
<script>
  import carousel from '@/plugins/carousel/Carousel'
  import slide from '@/plugins/carousel/Slide'
  import product from '@/components/financial/block'
  import finbutton from '@/components/financial/financial-button'
  
  export default {
    name: "Home",
    components: {
      carousel, slide, product,
      'financial-button': finbutton
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val
        this.getArticle()
      }
    },
    async asyncData({store, params, redirect}) {
      const {data} = await store.dispatch('finance_product_search', {
        status: null,
        currencyid: null,
        type: null,
        cyclestart: null,
        cycleend: null,
        bannerindex: 1,
        bannerrows: 4
      })
      let pagedata = (data && data.pagedata.length > 0) ? data.pagedata : []
      return {
        recommendBannel: pagedata.shift(),
        listBanner: pagedata
      }
    },
    data() {
      return {
        swiperBannel: [],
        recommendBannel: null,
        listBanner: [],
        areaList: [],
        areaListLoading: true,
        lang: this.$store.state.hex_lang.locale
      };
    },
    methods: {
      getArticle() {
        this.$store.dispatch('com_article_search', {
          menutype: 3981,
          pageindex: 1,//页数
          pagesize: 12,//条数
        }).then((artical) => {
          this.swiperBannel = (artical.data && artical.data.pagedata) ? artical.data.pagedata : []
        })
      },
      getProductSearch() {
        this.$store.dispatch('finance_product_search', {
          status: null,
          currencyid: null,
          type: null,
          cyclestart: null,
          cycleend: null,
          bannerindex: 1,
          bannerrows: 4
        })
          .then(({data}) => {
            if (data && data.pagedata.length > 0) {
              this.recommendBannel = data.pagedata.shift()
              this.listBanner = data.pagedata
            }
          })
      },
      getAreaList() {
        this.areaListLoading = true
        
        this.$store.dispatch('finance_areas_getlist')
          .then(({data}) => {
            if (data) {
              this.areaList = data.sort((itema, itemb) => {
                return itema.displayorder - itemb.displayorder
              })
            }
            this.areaListLoading = false
          })
      },
      goRush(id) {
        this.$router.push({path: '/financial/' + id})
      },
      goLookMore(item) {
        let query = {}
        if (item.areatype == 0) {
          query.currencyid = item.currencyid
        } else if (item.areatype == 1) {
        } else if (item.areatype == 2) {
          query.status = 2
        }
        this.$router.push({
          name: 'financial-list',
          query
        })
      }
    },
    mounted() {
      this.getArticle()
      this.getAreaList()
    },
    created() {
    },
  };

</script>
