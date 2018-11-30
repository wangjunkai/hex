<template>
  <div class="input-number">
    <span class="increment-button"
          @mouseup="setincrement(false)"
          @mousedown="setincrement(true)"
          @click="increment"></span>
    <span class="decrement-button"
          @mouseup="setdecrement(false)"
          @mousedown="setdecrement(true)"
          @click="decrement"></span>
    <input
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :value="num"
      @keydown.up.prevent="increment"
      @keydown.down.prevent="decrement"
      @mousewheel.prevent
      @focus="showFocus"
      @blur="hideFocus"
      @input="updateInput"
    />
  </div>
</template>
<script>
  import np from 'number-precision'
  
  export default {
    name: "verifycode",
    props: {
      fix: {
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
        if (num === '' || isNaN(Number(num))) {
          e.target.value = ''
          this.$emit('update:num', '')
          return
        }
        let newnumAry = num.toString().split('.')
        if (num === '0') {
          this.$emit('update:num', num)
          return
        }
        /*计算保留几位小数*/
        let fix = -1
        
        if (typeof this.fix == 'number') {
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
        
        /*默认保留6位*/
        if (fix < 0) {
          fix = 8
        }
        let newnumAryStr
        /*如果是小数保留小数后几位*/
        if (newnumAry.length === 2) {
          const _n = newnumAry[1].substring(0, fix)
          newnumAry[1] = _n
          newnumAryStr = newnumAry.join('.')
        } else {
          //整数
          newnumAryStr = num.substring(0, 14)
        }
        const _newnum = newnumAryStr.split('.')
        //去除0开头的整数
        if (_newnum[0].length > 1) {
          _newnum[0] = _newnum[0].replace(/^[0|\.]+/ig, '')
        }
        
        newnumAryStr = _newnum.join('.')
        
        if (e.target.value !== newnumAryStr) {
          e.target.value = newnumAryStr
        }
        this._updateValue(newnumAryStr)
      },
      showFocus() {
        this.$emit('number:focus')
      },
      hideFocus(e) {
        const num = e.target.value
        e.target.value = ''
        e.target.value = num.replace(/[\.]$/ig, '')
        this.updateInput(e)
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
      _updateValue(newVal) {
        this.currentValue = newVal
        this.$emit('update:num', this.currentValue >= 0 ? this.currentValue : 0)
      }
    }
  };
</script>
<style lang='less' scoped>
  input {
    background: transparent;
    color: inherit;
  }
  
  .input-number {
    position: relative;
  }
  
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .decrement-button,
  .increment-button {
    position: absolute;
    z-index: 1;
    right: 45px;
    cursor: pointer;
    display: inline-block;
    height: 50%;
    text-align: center;
    width: 20px;
  }
  
  .increment-button {
    top: 0;
  }
  
  .decrement-button {
    bottom: 0;
  }
  
  .increment-button:hover:after {
    border-color: transparent transparent #6F8FF1 transparent;
  }
  
  .decrement-button:hover:after {
    border-color: #6F8FF1 transparent transparent transparent;
  }
  
  .increment-button:after,
  .decrement-button:after {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  .increment-button:after {
    content: '';
    position: relative;
    top: -8px;
    border-width: 0 4px 6px 4px;
    border-color: transparent transparent #5E6573 transparent;
  }
  
  .decrement-button:after {
    content: '';
    border-width: 6px 4px 0 4px;
    border-color: #5E6573 transparent transparent transparent;
    top: -13px;
    position: relative;
  }
</style>

