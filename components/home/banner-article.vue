<template>
  <div class="banner-article">
    <div class="w1200 article-block" style="overflow: hidden;height: 40px;text-align: left" v-if="list.length>0">
      <ul
        @mouseenter="setanimation(false)"
        @mouseleave="setanimation(true)"
        :style="{transform:`translateY(-${translatepx}px)`}">
        <li v-for=" a in list" :key="a.id" @click="todetail(a,'notice')">
          <a v-if="a.articlehref" :href="a.articlehref" target="_blank">{{a.title}}</a>
          <span v-else>{{a.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "banner-article",
    data() {
      return {
        lang: this.$store.state.hex_lang.locale,
        list: [],
        notice: [],
        orderModel: {
          menutype: 3581,
          pageindex: 1,//页数
          pagesize: 20,//条数
        },
        translatepx: '',
        trantimer: ''
      }
    },
    // 3581:官方公告 3911：新币上线  3912：最新公告
    watch: {
      '$store.state.hex_lang.locale': function (val) {
        this.lang = val;
        this.getList();
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      todetail(data, title) {
        if (!data.articlehref) {
          this.$router.push({
            name: 'help-help-detail', query:
              {
                id: data.id,
                title: title,
                type: data.menutype
              }
          })
        }
      },
      pushData(data) {
        if (data && data.pagedata.length > 0) {
          data.pagedata.forEach((item) => {
            if (item.title.indexOf(this.lang + "-") != -1) {
              item.title = item.title.split('' + this.lang + '-' + '')[1];
              item.mintime = new Date(this.global_get_local_time(item.updatetime)).getTime();
              this.notice.push(item);
            }
          })
        }
      },
      getList() {
        clearInterval(this.trantimer)
        this.orderModel.menutype = 3912;
        this.$store.dispatch('com_article_search', this.orderModel).then(({data}) => {
          this.pushData(data);
          this.orderModel.menutype = 3581;
          return this.$store.dispatch('com_article_search', this.orderModel)
        }).then(({data}) => {
          this.pushData(data);
          this.orderModel.menutype = 3911;
          return this.$store.dispatch('com_article_search', this.orderModel)
        }).then(({data}) => {
          this.pushData(data);
          this.notice.sort(this.sorts());
          this.list = this.notice;
          
          this.$nextTick(() => {
            this.setanimation(true)
          })
          
        })
      },
      sorts() {
        return function (a, b) {
          return a.mintime > b.mintime ? -1 : 1;
        }
      },
      setanimation(bol) {
        if (!bol) {
          clearInterval(this.trantimer)
        } else {
          if (this.list.length > 0) {
            const lenthceil = Math.ceil(this.list.length / 3)
            let _ceil = 1
            
            if (this.trantimer) {
              clearInterval(this.trantimer)
              this.trantimer = null
            }
            this.trantimer = setInterval(() => {
              _ceil++
              if (_ceil > lenthceil) {
                _ceil = 1
              }
              this.translatepx = (_ceil - 1) * 40
            }, 3500)
          }
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.trantimer)
    }
  }
</script>

<style scoped lang="less">
  .banner-article {
    width: 100%;
    border-bottom: 1px solid rgba(34, 38, 48, 1);
    .article-block:before {
      content: '';
      display: inline-block;
      width: 13px;
      height: 12px;
      background: url("../../static/images/bannel-inform.svg") no-repeat;
      background-size: cover;
      top: 16px;
      position: absolute;
    }
    ul {
      height: 40px;
      margin-left: 20px;
      position: relative;
      transition: transform 0.5s;
      li {
        font-size: 14px;
        position: relative;
        height: 40px;
        cursor: pointer;
        float: left;
        width: 33.333%;
        span, a {
          position: absolute;
          top: 50%;
          margin-top: -7px;
          display: block;
          width: 95%;
          left: 0;
          color: rgba(168, 176, 192, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:hover, a:hover {
          color: white;
        }
      }
      li:last-child span, li:last-child a {
        border: none;
      }
    }
  }

</style>
