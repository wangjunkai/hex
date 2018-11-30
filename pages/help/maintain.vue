<template>
  <div>
    <div class="maintain">
      <img src="~/static/images/maintain.svg" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: "maintain"
  }
</script>

<style scoped lang="less">
  .maintain {
    background:white;
    min-height: 800px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: auto;
      width: 360px;
      height: 360px;
      transform: translate(-50%, -50%);
    }
  }
</style>
