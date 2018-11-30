<template>
  <div class="financial-list">
    <div class="financial-list-content">
      <financial-map></financial-map>
      <p class="content_title">{{$t('manage.AllProduct')}}</p>
      <div class="content_search">
        <p class="search_item" v-for="(option,optionvalue) in searchOption" :key="optionvalue">
          <span class="title">{{option.text}}</span>
          <span class="item ts--color"
                v-for="item in option.value"
                @click="setSearch(optionvalue,item.key)"
                :class="{'active':searchActive[optionvalue]==item.key}"
                :key="item.key">
            {{item.value}}
          </span>
        </p>
      </div>
      <div class="content_block clearfix" v-hex-loading="searchLoading">
        <div class="clearfix">
          <financial-product class="block_item"
                             v-for="item in listProduct"
                             :product="item"
                             :key="item.id"></financial-product>
        </div>
        <div v-if="listProduct.length<=0&&total==0" :style="{'padding-top':'150px'}">
          <img class="content_block_nomore" src="~/static/images/user/anonymous.svg" alt="">
        </div>
        <div class="block_page" v-if="total>0">
          <el-pagination
            background
            @current-change="pageChange"
            :page-size="20"
            popper-class="paging"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import map from '@/components/financial/map-list'
  import product from '@/components/financial/block'
  
  export default {
    name: "list",
    components: {
      'financial-map': map,
      'financial-product': product
    },
    async asyncData({store, params, redirect}) {
      const daily = await store.dispatch('com_currency_getpagelist', {isfinancing: true})
      const pagedata = (daily.data && daily.data.pagedata) ? daily.data.pagedata : [];
      const newData = [];
      pagedata.forEach((item) => {
        newData.push({
          key: item.id,
          value: item.fullname
        })
      })
      return {
        searchcurrencyid: newData
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function () {
        window.location.reload();
      }
    },
    data() {
      return {
        searchOption: {
          date: {
            text: this.$t('manage.Productterm'),
            value: [
              {key: '', value: this.$t('manage.All')},
              {key: '0,30', value: '0~30' + this.$t('manage.Day')},
              {key: '31,60', value: '31~60' + this.$t('manage.Day')},
              {key: '61,180', value: '61~180' + this.$t('manage.Day')},
              {key: '180', value: '180' + this.$t('manage.Moredays')}
            ]
          },
          status: {
            text: this.$t('manage.ProductStatus'),
            value: [
              {key: null, value: this.$t('manage.All')},
              {key: 1, value: this.$t('manage.processing')},
              {key: 0, value: this.$t('manage.Aboutstart')},
              {key: 2, value: this.$t('manage.Over')}
            ]
          },
          currencyid: {
            text: this.$t('manage.Assettype'),
            value: [{key: null, value: this.$t('manage.All')}]
          },
          type: {
            text: this.$t('manage.Producttype'),
            value: [
              {key: null, value: this.$t('manage.All')},
              {key: 0, value: this.$t('manage.Platformfinancing')},
              {key: 1, value: this.$t('manage.Cooperative')}
            ]
          }
        },
        searchActive: {
          date: '', status: null, currencyid: null, type: null
        },
        currencyList: [],
        pageindex: 1,
        pagesize: 20,
        listProduct: [],
        searchLoading: false,
        search_t: null,
        total: -1,
      }
    },
    created() {
      this.searchOption.currencyid.value = this.searchOption.currencyid.value.concat(this.searchcurrencyid)
      
      const query = this.$route.query
      if (query) {
        for (let i in query) {
          if (i in this.searchActive) {
            this.searchActive[i] = query[i]
          }
        }
      }
    },
    methods: {
      setSearch(o, i) {
        this.searchActive[o] = i
        this.search()
      },
      pageChange(val) {
        if (this.searchLoading) {
          return
        }
        this.pageindex = val
        this.search()
      },
      search() {
        this.searchLoading = true
        const _t = new Date().getTime()
        this.search_t = _t
        const searchoption = Object.assign({}, this.searchActive)
        const date = searchoption.date.split(',')
        
        
        searchoption['cyclestart'] = date[0] ? date[0] : null
        searchoption['cycleend'] = date[1] ? date[1] : null
        delete searchoption.date
        searchoption.pageindex = this.pageindex
        searchoption.pagesize = this.pagesize
        
        const _fun = (() => {
          this.$store.dispatch('finance_product_search', searchoption)
            .then(({data}) => {
              if (_t == this.search_t) {
                
                if (data && data.pagedata.length > 0) {
                  this.listProduct = data.pagedata
                  this.total = data.totalitemcount
                } else {
                  this.listProduct = []
                  this.total = 0
                }
                this.searchLoading = false
              }
            })
            .catch(() => {
              this.searchLoading = false
            })
        })()
      }
    },
    mounted() {
      this.search()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../static/styles/color";
  @import "../../static/styles/transition";
  
  .financial-list {
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #ffffff;
    .content_block_nomore {
      display: block;
      height: 72px;
      margin: auto;
      width: 130px;
    }
    .block_page {
      padding: 10px 0;
      text-align: center;
      margin-top: 20px;
      margin-left: 40px;
    }
    .financial-list-content {
      width: 1200px;
      min-width: 1200px;
      margin: auto;
    }
    .content_title {
      font-size: 32px;
      line-height: 32px;
      font-weight: 600;
      color: #292E39;
      margin: 40px 0 20px 0;
    }
    .content_search {
      padding: 40px;
      font-size: 14px;
      color: #666666;
      background-color: #F8F8F8;
      .search_item:not(:last-child) {
        margin-bottom: 20px;
      }
      .search_item {
        .title {
          color: #B3BBD3;
          display: inline-block;
          width: 115px;
          text-align: left;
          font-weight: 600;
        }
        .item {
          margin-right: 30px;
          color: #666666;
          cursor: pointer;
        }
        .item:hover, .item.active {
          color: @cl_financial;
        }
      }
    }
    .content_block {
      position: relative;
      min-height: 400px;
      width: 1240px;
      left: -40px;
      .block_item {
        float: left;
        margin-top: 40px;
        margin-left: 40px;
        flex-basis: 270px;
      }
      
    }
  }
</style>
