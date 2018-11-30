<template>
  <div class="invitation-rule">
    <div v-html="rule.remark">
      {{rule.remark}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity-rules",
    props: ['articeid'],
    data() {
      return {
        rule: [],
        ruleList: [],
        lang: this.$store.state.hex_lang.locale,
        orderModel: {
          pageindex: 1,//页数
          pagesize: 100,//条数
        },
      }
    },
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.filterRule();
      }
    },
    mounted() {
      // this.getRule();
      this.filterRule();
    },
    methods: {
      // getRule() {//z文章列表
      //   this.$store.dispatch("com_article_search", this.orderModel).then(({data}) => {
      //     if (data && data.pagedata.length > 0) {
      //       this.ruleList = data.pagedata;
      //       this.filterRule();
      //     }
      //   })
      // },
      filterRule() {//详情表
        // let ruleid;
        // this.ruleList.map((item) => {
        //   if (item.title.indexOf(this.lang + "-") != -1) {
        //     ruleid = item.id;
        //   }
        // });
        // if (!ruleid) return;
        // let ruleid = this.lang == 'en_us' ? 685772 : 685768;
        let ruleid = this.lang == 'en_us' ? this.articeid.en_us : this.articeid.zh_cn;
        this.$store.dispatch('com_article_info_get', {articeid: ruleid}).then(({data}) => {
          if (data) {
            data.remark = data.remark.replace('<link rel="stylesheet" href="https://images.ihuoqiu.com/css/ihuoqiu/huoqiu.css?v=123">','')
            this.rule = data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .invitation-rule {
    background: white;
    font-size: 14px;
    color: #344B6C;
    line-height: 1.7rem;
  }
  invitation-h2-title {
    font-weight: bold;
  }
  .article {
    padding-bottom: 0 !important;
  }

</style>
