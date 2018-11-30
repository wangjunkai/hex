<template>
  <div class="all-activity">
    <div class="all-countent">
      <div class="all-head">
        <p class="crumbs">
          <span>活动中心</span>
          >
          <span>全部活动</span>
        </p>
        <p class="all-headline">
          全部活动
        </p>
        <div class="all-filter">
          <div class="all-activity-time ">
            <p>活动时间</p>
            <el-select v-model="month" placeholder="请选择">
              <el-option
                v-for="item in time"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="all-activity-type ">
            <p>活动类型</p>
            <el-select v-model="activityType" placeholder="请选择">
              <el-option
                v-for="item in time"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="all-activity-search ">
            <p>活动关键词</p>
            <input type="text" placeholder="支持标签、关键词等搜索">
          </div>
        </div>
      </div>
      <activity-list></activity-list>
    </div>

  </div>
</template>

<script>
  import activityList from '@/components/activity/activity-list'

  export default {
    name: "activity-all",
    components: {
      activityList,
    },
    data() {
      return {
        time: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '最近一个月'
        }, {
          value: '选项3',
          label: '最近三个月'
        }, {
          value: '选项4',
          label: '最近六个月'
        }, {
          value: '选项5',
          label: '最近一年'
        }],
        month: '全部',
        activityType: '全部'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/styles/color";

  .all-activity {
    background: white;
    .all-countent {
      width: 1200px;
      margin: auto;
    }
    .all-head {
      .crumbs {
        font-size: 12px;
        padding-top: 30px;
        span {
          color: @cl_link
        }
      }
      .all-headline {
        font-size: 32px;
        color: @cl_333;
        margin-top: 41px;
      }
    }
    .all-filter {
      margin: 40px 0 50px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(225, 224, 236, 1);
      .all-activity-time, .all-activity-type, .all-activity-search {
        width: 295px;
        display: inline-block;
        margin-right: 150px;
        p {
          color: @cl_link;
          font-size: 14px;
          line-height: 14px;
          margin-bottom: 10px;
        }
        .el-select {
          width: 300px !important;
        }
      }
      .all-activity-search {
        margin-right: 0;
        input {
          width: 295px;
          height: 40px;
          border: 1px solid rgba(225, 224, 236, 1);
          border-radius: 4px;
          padding: 0 15px;
        }
      }
    }
  }
</style>
