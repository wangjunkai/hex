import np from 'number-precision'

function global_num_split(val) {
  val = parseFloat(val).toFixed(9)
  const a = val.toString().split('.')
  if (a.length > 1) {
    if (a[1].length > 8) {
      a[1] = a[1].substring(0, 8)
      return parseFloat(a.join('.'))
    }
  }
  return parseFloat(val)
}


export default {
  //汇率转换
  //BTC的量(btcNumber)转换为其他币种的量
  //此方法限定为 BTC 转换成其他 币种的(比如 ONT fromName) 数量
  //return 数量(fromNumber)
  get_exchange_rate: (state) => (fromName, btcNumber) => {
    btcNumber = Number(btcNumber)
    if (state.exchangeRate.length <= 0) {
      return 0
    }
    let cny = ['hcny', 'cny', 'cnyt']
    let btc, rate
    try {
      btc = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == 'btc'
      })

      if (!btc) {
        return 0
      }

      //如果是 人民币和hcny，直接返回1：1的人民币汇率
      if (cny.indexOf(fromName) >= 0) {
        const price = btc.price * btcNumber
        return global_num_split(price)
      }

      rate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == fromName.toLowerCase()
      })
      if (!rate) {
        return 0
      }
    } catch (e) {
      return 0
    }


    return global_num_split(np.strip(btc.price * btcNumber / rate.price))
  },
  //其他币种的量转换成BTC的量
  get_btc_exchange_rate: (state) => (name, quota) => {
    name && (name = name.toLowerCase())
    quota = Number(quota)
    let btc = 'btc'
    if (name == btc) {
      return global_num_split(quota)
    }
    if (!quota) {
      return 0
    }
    let rate, btcrate
    try {
      rate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == name
      })

      if (!rate) {
        return 0
      }
      btcrate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == btc
      })
    } catch (e) {
      return 0
    }

    return global_num_split(np.strip(rate.price * quota / btcrate.price))
  },
  //获取(货币) 转换 为(产品的数量) ：BTC(toName) toNumber -> ONT(from) number
  //此方法只需要知道 货币的名称和数量 ，以及 要兑换的产品 对当前货币的价格
  // 比如 要知道 BTC 兑换为 ONT 有多少量
  // 传入1ONT = 0.0004BTC(fromPrice) 这个价格，在传入 BTC 这个货币有多少数量
  // return 数量
  get_to_from_exchange_rate: (state) => (toNumber, fromPrice) => {
    toNumber = Number(toNumber)
    fromPrice = Number(fromPrice)
    if (!toNumber || !fromPrice) {
      return 0
    }
    return global_num_split(np.strip(toNumber / fromPrice))
  },
  get_from_to_exchange_rate: (state) => (fromNumber, toPrice) => {
    fromNumber = Number(fromNumber)
    toPrice = Number(toPrice)
    if (!fromNumber || !toPrice) {
      return 0
    }
    return global_num_split(np.strip(fromNumber * toPrice))
  },

  //获取用户客户端指定币种的汇率转换
  get_client_exchange_rate: (state) => (name, quota, toclient) => {
    quota = Number(quota)
    name && (name = name.toLowerCase())
    if (!quota || !name) {
      return Number(0).toFixed(2)
    }
    let rate, clientName, client

    let cny = ['hcny', 'cny', 'cnyt']

    try {
      rate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == name
      })

      if (!rate) {
        return Number(0).toFixed(2)
      }


      //如果是 人民币和hcny，直接返回1：1的人民币汇率
      if (toclient) {
        clientName = toclient.toLowerCase()
      } else {
        clientName = state.hex_client_exchange.active.toLowerCase()
      }
      if (cny.indexOf(clientName) >= 0) {
        const _new = global_num_split(np.strip(rate.price * quota))
        let fix = 2
        if (_new < 0.1) {
          fix = 4
        } else if (_new < 0.01) {
          fix = 6
        }
        return _new.toFixed(fix)
      }

      client = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == clientName
      })
    } catch (e) {
      return Number(0).toFixed(2)
    }

    const _new = np.times(np.divide(rate.price, client.price), quota)
    let fix = 2
    if (_new < 0.1) {
      fix = 4
    } else if (_new < 0.01) {
      fix = 6
    }
    return global_num_split(_new).toFixed(fix)
  },
  /*获取指定两个币种的转换汇率*/
  get_exchange_rate_by_name: (state) => (fromName, toName) => {
    if (!fromName || !toName) {
      return 0
    }

    let fromRate, toRate
    try {
      fromRate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == fromName.toLowerCase()
      })
      if (toName) {
        toName = toName.toLowerCase()
      }
      if (!fromRate) {
        return 0
      }
      let cny = ['hcny', 'cny', 'cnyt']

      if (cny.indexOf(toName) >= 0) {
        return global_num_split(fromRate.price)
      }
      toRate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == toName
      })
    } catch (e) {
      return 0
    }

    if (!toRate) {
      return 0
    }
    return global_num_split(fromRate.price / toRate.price)
  },
  get_exchange_torate_price: (state) => (fromname, toname) => {

  },
  get_exchange_torate: (state) => (fromname, fromnum, toname) => {
    if (!fromnum) {
      return 0
    }
    let fromRate, toRate
    try {
      fromRate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == fromname.toLowerCase()
      })
      toRate = state.exchangeRate.find((item) => {
        return item.currceyname.toLowerCase() == toname.toLowerCase()
      })
    } catch (e) {
      return 0
    }

    if (!fromRate || !toRate) {
      return 0
    }
    return global_num_split((fromRate.price * fromnum) / toRate.price)

  },
  //获取当前客户端汇率名称
  get_client_exchange_rate_name: (state) => {
    const exchange = state.hex_client_exchange[state.hex_client_exchange.active]
    return {
      name: exchange.name.toUpperCase(),
      mark: exchange.mark
    }
  }
}
