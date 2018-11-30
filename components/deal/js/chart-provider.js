export default {
  history: {},
  timer: {},
  pollingtimer: {},
  subs: [],
  init() {
    this.history = {}
    this.timer = {}
    this.subs = []
  },
  formatBar: function (data, this_vue, symbolInfo, overrides, newmoney) {
    const sub = this.subs.find(e => e.symbolInfo === symbolInfo.name)
    if (!sub || !sub.lastBar) {
      return false
    }

    const lastBar = sub.lastBar
    let resolution = sub.resolution
    if (resolution.includes('1D')) {
      // 1 day in minutes === 1440
      resolution = 1440
    } else if (resolution.includes('1W')) {
      // 1 week in minutes === 10080
      resolution = 10080
    }

    const coeff = resolution * 60
    const lastBarSec = lastBar.time / 1000

    if (!Array.isArray(data)) {
      data = [data]
    }
    data.sort((a, b) => {
      return a.t - b.t
    })
    const bars = data.map(el => {
      const rounded = Math.floor(el.t / coeff) * coeff

      let _lastbar = {}
      if (rounded > lastBarSec) {
        _lastbar = {
          low: lastBar.close,
          high: lastBar.close,
          open: lastBar.close,
          close: el.c,
          volume: el.v
        }

        // create a new candle, use last close as open **PERSONAL CHOICE**
        _lastbar.time = this_vue.global_get_local_time(el.t).valueOf() //TradingView requires bar time in ms
      } else {
        _lastbar = lastBar
        if (el.c < lastBar.low) {
          _lastbar.low = el.c
        } else if (el.c > lastBar.high) {
          _lastbar.high = el.c
        }
        if (!newmoney && (resolution.toString() == '1' || overrides)) {
          _lastbar.volume = el.v
        }
        _lastbar.close = el.c
      }
      return _lastbar
    })

    let issub = true

    //是否订阅

    bars.forEach((item) => {
      const _last = item
      if (_last.time < lastBar.time) {
        return true
      }
      //更新最新一条k线
      setTimeout(() => {
        sub.listener(_last)
      }, 6)

      sub.lastBar = _last
      this.history[symbolInfo.name].lastBar = _last
    })

    return issub
  },
  gettimer(interval) {
    interval = interval.toString()
    switch (interval) {
      case '1':
        return 2000
        break;
      case '5':
        return 5000
        break;
      case '15':
        return 5000
        break;
      case '30':
        return 5000
        break;
      case '60':
        return 5000
        break;
      case 'D':
        return 5000
        break;
    }
  },
  getLastBarsOther: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    const _self = this
    const getKline = function () {
      this_vue.$store.dispatch(this_vue.$socket.url.quotation_kline_get, {
        "type": this_vue.resolutionInterval,
        "size": 1,
        "symble": this_vue.symbleParameString,
      })
        .then(({data}) => {
          if (data) {
            const t = _self.timer[symbolInfo.name + '_' + this_vue.resolutionInterval]
            let sub = _self.subs.find(e => e.symbolInfo === symbolInfo.name)
            if (!sub) {
              return
            }
            if (t != -1) {
              sub = _self.formatBar.call(_self, data, this_vue, symbolInfo, true)
            }

            for (const _t in _self.timer) {
              clearTimeout(_self.timer[_t])
              _self.timer[_t] = -1
            }

            if (sub && t != -1) {
              _self.timer[symbolInfo.name + '_' + this_vue.resolutionInterval] = setTimeout(getKline, 15000)
            }

          }
        })
    }
    /*订阅最新价*/
    this_vue.$pubsub.subscribe(this_vue.$pubsub.changeNewMoney, (sub, res) => {
      if (res && (res.symble == this_vue.symbleParameString)) {
        const data = {
          t: res.ts,
          c: res.price,
          v: res.amount
        }
        _self.formatBar.call(_self, data, this_vue, symbolInfo, false, true)
      }
    })
    getKline()
  },
  getLastBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    //k线图
    const _self = this
    const getKline = function () {
      this_vue.$store.dispatch(this_vue.$socket.url.quotation_kline_get, {
        "type": this_vue.resolutionInterval,
        "size": 1,
        "symble": this_vue.symbleParameString,
      })
        .then(({data}) => {
          if (data) {
            const issub = _self.formatBar.call(_self, data, this_vue, symbolInfo)

            for (const _t in _self.pollingtimer) {
              clearTimeout(_self.pollingtimer[_t])
              _self.pollingtimer[_t] = -1
            }

            if (issub) {
              _self.pollingtimer[symbolInfo.name] = setTimeout(getKline, _self.gettimer(resolution))
            }
          }
        })
    }

    this_vue.$socket.invoke({
      sub: this_vue.sub,
      type: this_vue.$socket.type.quotation_kline_get
    })

    if (!this_vue.$socket.is()) {
      getKline()
    }

    this_vue.$socket.receive(this_vue.$socket.type.quotation_kline_get, (res) => {
      if (res && res.topic == this_vue.sub) {
        const data = res.data
        /*k线是否订阅*/
        const issub = _self.formatBar.call(_self, data, this_vue, symbolInfo)
        if (!issub) {
          this_vue.$socket.uninvoke(this_vue.$socket.type.quotation_kline_get)
        }
      }
    })
  },
  getBars: function (this_vue, symbolInfo, resolution, from, to, first, limit) {
    //k线图
    let etime = to
    if (this.history[symbolInfo.name] && this.history[symbolInfo.name].firstBar) {
      etime = this.history[symbolInfo.name].firstBar.time / 1000
    }
    const klineParam = {
      //'btime': from,
      'etime': etime,
      "type": this_vue.resolutionInterval,
      //"size": 100,
      "symble": this_vue.symbleParameString,
    }

    const _self = this
    const getKline = function () {
      return this_vue.$store.dispatch('quotation_kline_get', klineParam)
        .then(({data}) => {
          if (data) {
            data.sort((a, b) => {
              return a.t - b.t
            })
            const bars = this_vue.bars = data.map(el => {
              return {
                time: this_vue.global_get_local_time(el.t).valueOf(), //TradingView requires bar time in ms
                low: el.l,
                high: el.h,
                open: el.o,
                close: el.c,
                volume: el.v
              }
            })

            _self.history[symbolInfo.name] = {
              lastBar: bars[bars.length - 1],
              firstBar: bars[0]
            }

            return bars
          } else {
            return []
          }
        })
    }
    return getKline()
  },
}
