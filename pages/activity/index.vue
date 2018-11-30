<template>
  <div class="activity">
    <div class="activity-bannel">
      活动bannel
    </div>
    <div class="activity-body">
      <div class="activity-countent">
        <div class="activity-tab">
          <span :class="{activity:activiteState==1}" @click="change(1)"> 进行中 </span>
          <span :class="{activity:activiteState==2}" @click="change(2)"> 即将开始 </span>
         <nuxt-link  class="fr more" to="/activity/activity-all" tag="span">查看全部活动</nuxt-link>
        </div>
        <activity-list></activity-list>
      </div>
    </div>
  </div>
</template>

<script>
  import activityList from '@/components/activity/activity-list'

  export default {
    name: "index",
    components: {
      activityList
    },
    data() {
      return {
        activiteState: 1
      }
    },
    methods: {
      change(val) {
        this.activiteState = val;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../static/styles/color';

  .activity-bannel {
    min-height: 130px;
  }

  .activity-body {
    background: white;
  }

  .activity-countent {
    width: 1200px;
    margin: auto;
    .activity-tab {
      padding-top:45px;
      overflow: hidden;
      margin-bottom: 8px;
      span {
        font-size: 24px;
        line-height: 48px;
        color:rgba(33,40,62,1);
        padding: 0 10px;
      }
      span:first-child {
        margin-right: 40px;
      }
      span.more {
        cursor: pointer;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
      }
      span.activity {
        color: @cl_link;
        border-bottom: 2px solid @cl_link;
      }
    }

  }
</style>
