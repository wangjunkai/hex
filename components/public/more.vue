<template>
  <div >
    <div class="person-home-block-deal_more" v-if="state"></div>
    <div class="person-home-block-deal_more no-more" v-else-if="list.length<=0">{{$t("home.moreNoData")}}</div>
    <!--<div class="person-home-block-deal_more " v-else-if="!tradingRecordMore">{{$t("home.moreNoMore")}}</div>-->
    <div class="person-home-block-deal_more"
         @click="getMore"
         v-else-if="this.index">{{$t("home.moreGetMore")}}
    </div>
  </div>
</template>
<script>

  export default {
    name: "more",
    computed: {
      tradingRecordMore: function () {
        if (!(this.index && this.max)) return false
        return this.list.length >= (this.index * this.max)
      }
    },
    props: {
      index: '',
      max: '',
      state: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    watch: {},
    data() {
      return {
      }
    },
    methods: {
      getMore() {
        this.$emit('more:get')
      }
    }
  };
</script>
<style lang='less' scoped>
  @import "../../static/styles/color.less";

  .person-home-block-deal_more {
    color: @cl_999;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .person-home-block-deal_more.no-more{
    line-height: 300px;
  }
</style>

