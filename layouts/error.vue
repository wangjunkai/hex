<template>
  <div class='error'>
    <div class='error-page'>
      <div class="maintain">
        <img src="~/static/images/maintain.png" alt="">
        <p class="text">{{text}}</p>
      </div>
    
    </div>
  </div>
</template>
<script>
  export default {
    name: 'error',
    data() {
      return {
        text: ''
      }
    },
    created() {
      if(process.client){
        if(sessionStorage.getItem('isMaintain')){
          if (this.$store.state.hex_lang.locale == 'zh_cn'){
            this.text = JSON.parse(sessionStorage.getItem('isMaintain')).zh_cn
          }else{
            this.text = JSON.parse(sessionStorage.getItem('isMaintain')).en_us
          }
        }
      }
    }
  }

</script>
<style lang='less' scoped>
  .error {
    background: white;
    .error-page {
      min-height: 800px;
      position: relative;
      .maintain {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        text-align: center;
        width: 450px;
        height: 500px;
        img {
          width: 450px;
          height: auto
        }
        .text {
          font-size: 16px;
          color: #6f8ff1;
        }
      }
      
    }
  }

</style>
