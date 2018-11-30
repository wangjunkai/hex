<template>
  <div>
    <div class="term">
      <div>
        <div class="body" v-bar>
          <div>
            <h1>{{service.title}}</h1>
            <div class="area">
              <p v-html="service.remark">
                {{service.remark}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "clause",
    layout: 'm-default',
    data() {
      return {
        service: {},//根据当前语言展示的数据
        serviceDate: [],//存中英文数据

      }
    },

    mounted() {
      let articleid;
      this.getArticleList('654641');
    },
    methods: {
      getArticleList(id) {
        let postData = {
          pageindex: 1,
          pagesize: 10,
          articeid: id
        }
        this.$store.dispatch("com_article_info_get", postData).then(({data}) => {
          if (data) {
            data.title = data.title.split(this.lang + '-')[1];
            this.service = data;
          }
        })
      },
      close() {
        this.$emit("close");
      }
    }
  }
</script>

<style lang="less" scoped>

  .term {
    width: 100%;
    background: white;
    .head {
      overflow: hidden;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      padding: 0 10px 0 20px;
      color: rgba(51, 51, 51, 1);
      border-bottom: 1px solid rgba(240, 239, 247, 1);
      .titles {
        float: left;
      }
      .closes {
        float: right;
        width: 20px;
        height: 20px;
        background: url("../../static/images/an_close.png") no-repeat center center;
        background-size: 80% auto;
        margin-top: 11px;
      }
    }
    .body {
      overflow-y: scroll;
      h1 {
        font-size: 20px;
        text-align: center;
      }
      .area {
        h2 {
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }
        p {
          overflow: hidden;
          margin-top: 10px;
          font-size: 14px;
          line-height: 20px;
          span {
            float: left;
            color: rgba(51, 51, 51, 1);
          }
          span.disc {
            width: 877px;
          }

        }
      }

    }
  }

  .body::-webkit-scrollbar {
    width: 6px; //滚动条的宽度
  }

  .body::-webkit-scrollbar-thumb {
    background: rgba(225, 224, 236, 1);
    border-radius: 3px;
  }


</style>
