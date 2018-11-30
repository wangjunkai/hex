<template>
  <div class="depth-chart" ref="depth-chart">
    <!--:mousemove="mouseMove"-->
    <canvas id="depth"
            ref="canvas"
            @mousemove="mouseMove"></canvas>
    <canvas id="tip"
            class="tip"
            ref="canvastip"
            width=120 height=40></canvas>
    <canvas id="tiparc"
            class="tiparc"
            ref="canvastiparc"
            width=20 height=20></canvas>
  </div>
</template>
<script>
  const _daybg = {
    text: '#9094A4',
    line: '#DDDDE4',
    sell: '#F4B5A0',
    buy: '#81DEBD'
  }
  const _nightbg = {
    text: '#CED3DD',
    line: '#292E39',
    sell: '#5B2A1A',
    buy: '#005B3A'
  }
  export default {
    name: 'articles',
    components: {
      'hex-number': Number,
    },
    props: ['symbleParameString', 'isActive'],
    data() {
      return {
        res: [],
        gap: 0, //X轴偏移量
        xPadding: 60,
        yPadding: 30,
        canvas: '',
        canvastip: '',
        canvastiparc: '',
        dots: [],
        timer: '',
        depth: {
          sell: [],
          buy: []
        },
        bg: this.initbg(this.day())
      }
    },
    watch: {
      '$store.state.hex_client_background.active': function (val) {
        this.bg = this.initbg(val == 'day')
        const depth = document.getElementById('depth')
        if (depth) {
          const context = depth.getContext('2d');
          context.clearRect(0, 0, depth.width, depth.height);
          this.drawDepthChart()
        }
      }
    },
    computed: {
      width: function () {
        return this.canvas.width - this.xPadding;
      },
      height: function () {
        return this.canvas.height - this.yPadding;
      },
      getSort: function () {
        const {sell, buy} = this.depth
        /*买倒叙*/
        buy.sort(function (itema, itemb) {
          return itemb.p - itema.p
        })
        for (let i in buy) {
          let total = 0;
          let price = 0;
          for (let n = 0; n <= i; n++) {
            total += buy[n]['a'];
            price += buy[n]['p']
          }
          buy[i]['allprice'] = price;
          buy[i]['alltotal'] = total;
        }
        /*卖倒叙*/
        sell.sort(function (itema, itemb) {
          return itemb.p - itema.p
        })
        for (let i in sell) {
          let total = 0;
          let price = 0
          for (let n = i; n < sell.length; n++) {
            total += sell[n]['a'];
            price += sell[n]['p']
          }
          sell[i]['allprice'] = price
          sell[i]['alltotal'] = total;
        }
        return {sell, buy}
      }
    },
    mounted() {
      this.dcs = this.global_get_decimal(this.symbleParameString)
      this.canvas = this.$refs['canvas']
      this.canvastip = this.$refs['canvastip']
      this.canvastiparc = this.$refs['canvastiparc']
      
      document.querySelector('#depth').addEventListener('mouseleave', (e) => {
        if (e.relatedTarget && (e.relatedTarget.id != 'tip' && e.relatedTarget.id != 'tiparc')) {
          this.timer = setTimeout(() => {
            this.canvastip.style.display = 'none'
            this.canvastiparc.style.display = 'none'
          }, 300)
        }
      })
    },
    subscribe() {
      return {
        //订阅更新深度数据 消息
        changeDepthChart(val) {
          if (val && (val.buy.length > 0 || val.sell.length > 0)) {
            this.depth = val
            const depth = document.getElementById('depth')
            const {offsetHeight, offsetWidth} = this.canvas.parentElement
            this.canvas.width = offsetWidth
            this.canvas.height = offsetHeight
            if (depth) {
              const context = depth.getContext('2d');
              context.clearRect(0, 0, depth.width, depth.height);
              this.drawDepthChart()
            }
          }
        }
      }
    },
    created() {
    },
    methods: {
      day() {
        return this.$store.state.hex_client_background.active === 'day'
      },
      initbg(day) {
        return {
          buy: day ? _daybg.buy : _nightbg.buy,
          sell: day ? _daybg.sell : _nightbg.sell,
          line: day ? _daybg.line : _nightbg.line,
          text: day ? _daybg.text : _nightbg.text
        }
      },
      setFullScreen(bol) {
        const d = document.querySelector('.hex-chart')
        this.canvas.width = d.offsetWidth - 15;
        this.canvas.height = d.offsetHeight - 30;
        this.drawDepthChart()
      },
      mouseMove(e) {
        this.handleMouseMove(e)
      },
      handleMouseMove(e) {
        let dots = this.dots
        
        const mouseX = Number(e.offsetX);
        const tipCanvas = this.canvastip
        const tiparcCanvas = this.canvastiparc
        const tipCtx = tipCanvas.getContext('2d')
        const tiparcCtx = tiparcCanvas.getContext('2d')
        let hit = false;
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const dx = mouseX - dot.x;
          if (Math.abs(dx) < 5) {
            tipCanvas.style.display = 'inline-block'
            tiparcCanvas.style.display = 'inline-block'
            
            tiparcCtx.beginPath();
            tiparcCtx.arc(10, 10, 5, 0, Math.PI * 2, true);
            tiparcCtx.fillStyle = "#6f8ff1";
            tiparcCtx.closePath();
            tiparcCtx.fill();
            
            if ((this.width - dot.x) < tipCanvas.offsetWidth) {
              tipCanvas.style.left = dot.x - 10 - tipCanvas.offsetWidth + "px";
            } else {
              tipCanvas.style.left = dot.x + 10 + "px";
            }
            if (dot.y < tipCanvas.offsetHeight) {
              tipCanvas.style.top = dot.y + 10 + "px";
            } else {
              tipCanvas.style.top = (dot.y - 63 - 10) + "px";
            }
            
            tiparcCanvas.style.left = dot.x - tiparcCanvas.offsetHeight / 2 + 'px'
            tiparcCanvas.style.top = dot.y - tiparcCanvas.offsetHeight / 2 + 'px'
            
            tipCtx.clearRect(0, 0, tipCanvas.offsetWidth, tipCanvas.offsetHeight);
            tipCtx.font = "12px Open Sans";
            tipCtx.fillStyle = this.bg.text;
            tipCtx.fillText('Price   ' + dot.p, 5, 15);
            tipCtx.fillText('Sum    ' + dot.total.toFixed(4), 5, 35);
            hit = true;
          }
        }
        if (!hit) {
          if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
          }
          this.timer = setTimeout(() => {
            tipCanvas.style.display = "none";
            tiparcCanvas.style.display = 'none'
          }, 300)
        }
      },
      drawDepthChart() {
        const _self = this
        const {sell, buy} = this.getSort
        this.dots = []
        const xPadding = 60;
        const yPadding = 30;
        const canvas = document.getElementById('depth');
        const width = canvas.width - xPadding;
        const height = canvas.height - yPadding;
        
        //计算交易量的最大值，作为纵坐标的最大刻度值
        //买卖各占一半宽度
        const _halfwidth = width / 2
        const _buylength = buy.length
        const _selllength = sell.length
        let maxAmount
        if (_buylength > 0 && _selllength > 0) {
          maxAmount = Math.max(sell[0]['alltotal'], buy[buy.length - 1]['alltotal']);
        } else if (_buylength > 0) {
          maxAmount = buy[buy.length - 1]['alltotal']
        } else if (_selllength > 0) {
          maxAmount = sell[0]['alltotal']
        }
        
        const context = canvas.getContext('2d');
        
        //绘制x y轴
        context.fillStyle = this.bg.line;
        context.fillRect(0, height, width + 5, 1);
        context.fillRect(width, height, 1, -(height + 5));
        
        //开始一个连续绘制路径
        context.beginPath();
        context.fillStyle = this.bg.sell;
        context.moveTo(_halfwidth, height);
        
        /*从左向右绘制卖单*/
        const _selldots = []
        if (_selllength > 0) {
          sell.reverse().forEach((item, index) => {
            const _x = _halfwidth / _selllength * index
            const x = _x + _halfwidth;
            const y = height - item['alltotal'] / maxAmount * height;
            const obj = {
              type: 'sell',
              x: x,
              y: y,
              p: item['p'],
              total: item['alltotal']
            }
            _selldots.push(obj)
            this.dots.push(obj);
            context.lineTo(x, y);
            if (index == _selllength - 1) {
              context.lineTo(width, y)
              context.lineTo(width, height);
              context.fill();
            }
          })
        }
        
        context.beginPath();
        context.fillStyle = this.bg.buy; //设置买入区域填充颜色
        context.moveTo(_halfwidth, height);
        
        //从右向左绘制买单
        const _buyprice = []
        let _buydots = []
        if (_buylength > 0) {
          const singlew = _halfwidth / _buylength
          buy.forEach((item, index) => {
            const x = _halfwidth - (singlew * index);
            const y = height - item['alltotal'] / maxAmount * height;
            const obj = {
              type: 'buy',
              x: x,
              y: y,
              p: item['p'],
              total: item['alltotal']
            }
            _buydots.push(obj)
            this.dots.push(obj);
            context.lineTo(x, y);
            if (index == _buylength - 1) {
              context.lineTo(0, y);
              context.lineTo(0, height);
              context.fill();
            }
          })
        }
        
        //Y轴5等份
        context.fillStyle = this.bg.text;
        const amountseg = maxAmount / 6;
        context.fillText(0, width + 10, height + 3);
        for (let i = 1; i < 6; i++) {
          const x = width + 10;
          const y = height - amountseg * i / maxAmount * height;
          
          context.fillRect(width, y, 5, 1);
          context.fillText(amountseg * i > 1000 ? ((amountseg * i / 1000).toFixed(2) + 'K') : (amountseg * i).toFixed(2), x, y + 3);
        }
        //X轴刻度 卖
        if (_selllength > 0) {
          for (let i = 1; i <= _selllength; i++) {
            if (_selllength > 8) {
              if (i % parseInt(_selllength / 4)) {
                continue;
              }
            } else {
              if (!(i % 2)) continue;
            }
            if (i == 1) {
              continue
            }
            const x = _halfwidth + _selldots[i - 1].x - _selldots[0].x;
            const y = height + 20;
            
            context.fillRect(x, height, 1, 5)
            context.fillText(this.global_get_tofixed(_selldots[i - 1].p, this.dcs.p), x - 20, y)
          }
        }
        //买
        if (_buylength) {
          for (let i = 1; i <= _buylength; i++) {
            if (_buylength > 8) {
              if (i % parseInt(_buylength / 4)) {
                continue;
              }
            } else {
              if (!(i % 2)) continue;
            }
            if (i == 1) {
              continue
            }
            const x = _buydots[i - 1].x;
            const y = height + 20;
            
            context.fillRect(x, height, 1, 5)
            context.fillText(this.global_get_tofixed(_buydots[i - 1].p, this.dcs.p), x - 20, y)
          }
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .depth-chart {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  
  .depth-chart .tip {
    position: absolute;
    color: #000;
    padding: 10px;
    display: none;
    transition: all 0.03s ease-in-out;
    background: #333946;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }
  
  .depth-chart .tiparc {
    display: none;
    background: rgba(111, 143, 241, 0.5);
    border-radius: 100%;
    transition: all 0.03s ease-in-out;
    position: absolute;
  }
  
  .depth-chart canvas {
    position: absolute;
  }
  
  .depth-chart #x {
    top: 300px;
    left: 0;
  }
  
  .depth-chart #y {
    top: 0;
    left: 600px;
  }
</style>
