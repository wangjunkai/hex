import stream from './chart-stream.js'
import historyProvider from './chart-provider.js'

const resolutions = ["1", "5", "10", "15", "30", "60", "120", "240", "360", "720", "1D", "1W", "1M"]

export default {
  //创建feed
  createFeed: function (this_vue) {
    historyProvider.init()
    return {
      onReady: cb => {
        setTimeout(() => cb({
          supported_resolutions: resolutions
        }), 0)
      },
      searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      },
      resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        const symbol_stub = {
          name: this_vue.from + ":" + this_vue.to,
          ticker: this_vue.from + ":" + this_vue.to,
          type: 'crypto',
          session: '24x7',
          regular_session: '24x7',
          minmov: 1,
          pricescale: 100000000,
          has_intraday: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          volume_precision: 8,
          data_status: 'streaming',
          intraday_multipliers: resolutions,
          timezone: this_vue.timezone
        }

        if (this_vue.to.toUpperCase().match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
          symbol_stub.pricescale = 100
        }
        setTimeout(() => {
          onSymbolResolvedCallback(symbol_stub)
        }, 0)
      },
      getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
        /*                        console.log('from----------', this_vue.global_get_local_time(from).format('YYYY-MM-DD HH:mm:ss'),from)
                                console.log('to----------', this_vue.global_get_local_time(to).format('YYYY-MM-DD HH:mm:ss'),to)*/
        historyProvider.getBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
          .then(bars => {
            if (bars.length) {
              setTimeout(() => {
                onHistoryCallback(bars)
                /*一分钟，5分钟 订阅最后一条*/
                if (firstDataRequest && ['1', '5'].indexOf(resolution) >= 0) {
                  //监听最后一条数据socket
                  historyProvider.getLastBars(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
                  /*获取最后一条数据接口*/
                  historyProvider.getLastBarsOther(this_vue, symbolInfo, resolution, from, to, firstDataRequest)
                }
              }, 6)
            } else {
              setTimeout(() => {
                onHistoryCallback(bars, {noData: true})
              }, 6)
            }
          }).catch(err => {
          onErrorCallback(err)
        })
      },
      subscribeBars: (symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback) => {
        stream.subscribeBars(symbolInfo, resolution, onTick, subscriberUID, onResetCacheNeededCallback)
      },
      unsubscribeBars: subscriberUID => {
        stream.unsubscribeBars(subscriberUID)
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
      },
      getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
        //optional
      },
      getServerTime: cb => {

      }
    }
  }
}
