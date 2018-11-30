<template>
  <div class='error'>
    <div class='error-page'>
      <img src="~/static/images/maintain.svg" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'error'
  }

</script>
<style lang='less' scoped>
  .error {
    background: white;
    .error-page {
      min-height: 800px;
      position: relative;
      img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 360px;
        height: auto
      }
    }
  }

</style>
