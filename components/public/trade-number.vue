<style lang='less' scoped>
  input {
    background: transparent;
    color: #ffffff;
  }
  
  .input-number {
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
  }
  
  .input_tip {
    padding: 0 10px;
    font-size: 14px;
    flex: auto;
  }
  
  .input_tip input {
    color: #21283E;
    width: 100%;
    height: 100%;
  }
  
  .button_tip {
    overflow: hidden;
  }
  
  .button_tip .tip {
    height: 100%;
    display: inline-block;
    padding-right: 10px;
    color: #344B6C;
    border-right: 1px solid #dddddd;
    float: left;
  }
  
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .decrement-button,
  .increment-button {
    display: inline-block;
    width: 40px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position: center;
    float: left;
  }
  
  .increment-button {
    background-image: url("../../static/images/trade/add.svg");
  }
  
  .increment-button:before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 16px;
    background-color: #dddddd;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  
  .decrement-button {
    background-size: 16px 2px;
    background-image: url("../../static/images/trade/decrease.svg");
  }
</style>
<template>
  <div class="input-number">
    <div class="input_tip">
      <input
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="num"
        @focus="showFocus"
        @blur="hideFocus"
        @input="updateInput"
        ref="input"
      />
    </div>
    <div class="button_tip">
      <span class="tip">{{tip}}</span>
      <span class="decrement-button"
            @mouseup="setdecrement(false)"
            @mousedown="setdecrement(true)"
            @click="decrement"></span>
      <span class="increment-button"
            @mouseup="setincrement(false)"
            @mousedown="setincrement(true)"
            @click="increment"></span>
    
    </div>
  </div>
</template>
<script>
  import np from 'number-precision'
  
  export default {
    name: "verifycode",
    props: {
      lose: {
        type: String,
        default: ''
      },
      tip: {
        required: true
      },
      fix: {
        type: Number,
        default: 0
      },
      disabled: Boolean,
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: 0
      },
      num: {
        required: true
      }
    },
    watch: {
      num(val) {
        this.currentValue = val
      }
    },
    computed: {
      step() {
        const numary = this.num.toString().split(".")
        const count = numary.length > 1 ? numary[1].length : 0
        const fix = parseFloat(0).toFixed(count)
        return fix.replace(/.$/, "1")
      },
      getCurrentValue: function () {
        const val = this.currentValue
        if (!Number(val)) {
          return 0
        }
        return val
      }
    },
    data() {
      return {
        currentValue: this.num,
        decrementDisabled: false,
        incrementDisabled: false,
        inputDisabled: false,
        incrementtime: '',
        decrementtime: '',
        time1: '',
        time2: ''
      }
    },
    mounted() {
      document.addEventListener('click', () => {
        clearTimeout(this.time1)
        clearTimeout(this.time2)
        clearInterval(this.incrementtime)
        clearInterval(this.decrementtime)
      })
    },
    methods: {
      updateInput(e) {
        let num = e.target.value
        if (this.lose) {
          this._updateValue(num)
          return
        }
        if (num === '' || isNaN(Number(num))) {
          e.target.value = ''
          this.$emit('update:num', '')
          return
        }
        let newnumAry = num.toString().split('.')
        if (num === '0') {
          this.$emit('update:num', num)
          return
        } else {
          if (Number(num) === 0) {
            //小数点后4位
            if (newnumAry.length >= 2) {
              newnumAry[1] = newnumAry[1].substring(0, 4)
              num = newnumAry.join('.')
            } else {
              //多个0归0
              num = '0'
            }
            e.target.value = num
            this.$emit('update:num', num)
            return
          }
        }
        /*计算保留几位小数*/
        let fix
        
        if (this.fix) {
          fix = this.fix
        } else {
          const newnum = parseFloat(num)
          const newval = 1 / newnum
          if (newval >= 500) {
            fix = 8
          } else if (newval >= 100) {
            fix = 6
          } else if (newval >= 0) {
            fix = 4
          }
        }
        
        if (!fix) {
          const dec = this.global_get_count_decimals(num)
          //小数6位
          if (dec > 6) {
            fix = 6
          }
        }
        
        /*默认保留6位*/
        if (!fix) {
          fix = 8
        }
        let newnumAryStr
        /*如果是小数保留小数后几位*/
        if (newnumAry.length === 2) {
          newnumAry[1] = newnumAry[1].substring(0, fix)
          newnumAryStr = newnumAry.join('.')
        } else {
          //整数
          newnumAryStr = num.substring(0, 14)
        }
        if (e.target.value !== newnumAryStr) {
          e.target.value = newnumAryStr
        }
        this._updateValue(newnumAryStr)
      },
      showFocus() {
        this.$emit('number:focus')
      },
      hideFocus() {
        this.$emit('number:blur')
      },
      setincrement(val) {
        if (val) {
          this.time1 = setTimeout(() => {
            this.incrementtime = setInterval(() => {
              this.increment()
            }, 100)
          }, 150)
        } else {
          clearTimeout(this.time1)
          clearInterval(this.incrementtime)
        }
      },
      setdecrement(val) {
        if (val) {
          this.time2 = setTimeout(() => {
            this.decrementtime = setInterval(() => {
              this.decrement()
            }, 100)
          }, 150)
        } else {
          clearTimeout(this.time2)
          clearInterval(this.decrementtime)
        }
      },
      increment() {
        let newVal = np.plus(this.getCurrentValue * 1, 1 * this.step)
        const stepary = this.step.toString().split('.')
        newVal = this.global_get_langnum(newVal)
        
        if (stepary.length > 1) {
          newVal = (1 * newVal).toFixed(stepary[1].length)
        }
        this._updateValue(newVal)
      },
      decrement() {
        let newVal = np.plus(this.getCurrentValue * 1, -1 * this.step)
        const stepary = this.step.toString().split('.')
        newVal = this.global_get_langnum(newVal)
        if (stepary.length > 1) {
          newVal = (1 * newVal).toFixed(stepary[1].length)
        }
        this._updateValue(newVal)
      },
      _updateValue(newVal, e) {
        if (parseFloat(newVal) <= this.min) {
          newVal = this.min
        }
        if (parseFloat(newVal) >= this.max) {
          newVal = this.max
        }
        this.currentValue = newVal
        let current
        if (this.lose) {
          current = this.currentValue
          if (this.$refs['input'].value != current) {
            this.$refs['input'].value = current
          }
        } else {
          current = this.currentValue >= 0 ? this.currentValue : 0
        }
        this.$emit('update:num', current)
      }
    }
  };
</script>


