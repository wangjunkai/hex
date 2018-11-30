<template>
  <div class="activity-list">
    <ul>
      <li v-for=" item in 10" :key="item">
        <div class="product-picture">
          <img src="" alt="">
        </div>
        <div class="product-description">
          <p class="headline">【限时瓜分限时瓜分】活动期间注册并完成实名认证的用户，可参与瓜分30.000HX(满3000人激活奖金池)</p>
          <p class="newUser">新用户：活动期间注册并完成实名认证的用户，可参与瓜分30.000HX(满3000人激活奖金池)</p>
          <p class="oldUser">老用户：可邀请信用户参与瓜分30.0000BIX，同时获得20%反佣奖励</p>
          <div class="label">
            <button>BIX奖励</button>
            <button>邀请注册</button>
            <button>实名认证</button>
          </div>
          <p class="activity-time">
            <span>活动时间：</span>2018年10月26日-2018年10月30日
          </p>
        </div>
      </li>
    </ul>
    <div class="paging-source">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: "activity-list"
  }
</script>

<style scoped lang="less">
  @import "../../static/styles/color";

  .activity-list {
    ul {
      li {
        display: flex;
        flex-direction: row;
        padding: 20px 0;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        .product-picture {
          width: 320px;
          height: 180px;
          background: #bdbbbb;
          margin-right: 20px;
        }
        .product-description {
          font-size: 14px;
          color: #999;
          .headline {
            font-size: 20px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 28px;
          }
          .newUser {
            margin-top: 15px;
          }
          .label {
            margin-top: 20px;
            button {
              font-size: 12px;
              padding: 4px 10px;
              color: white;
              margin-right: 10px;
              border-radius: 2px;
              background: @cl_link;
            }
          }
          .activity-time {
            margin-top: 18px;
            color: @cl_link;
            span {
              color: @cl_999;
            }
          }
        }
      }
    }
  }
</style>
