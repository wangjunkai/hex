import * as socket from '@aspnet/signalr'
import pako from 'pako'
import PubSub from 'pubsub-js'

const _prohost = 'https://push.hex.com/hexhub'
const _devhost = 'http://10.33.0.110:9087/hexhub'
const _host = _prohost

const _sub = 'sub'
const _unsub = 'unsub'
const _receive = 'receive'
const _connect = 'connect'
const _reinvoke = 'reinvoke'
const _count = 'count'
const _debug = 'debug'
const _init = 'init'

/*获取最新成交列表 knockdown.vue*/
const qtdg = 'quotation_trading_details_get'
/*获取深度列表 entrust.vue*/
const qmdg = 'quotation_marketing_depth_get'
/*获取单个交易对行情信息  new-money.vue*/
const qdg = 'quotation_daily_get'
/*根据币种获取所有交易对行情信息列表 coin-list.vue*/
const qdgall = 'quotation_daily_getall'
/*获取K线信息 chart.vue*/
const qkg = 'quotation_kline_get'

/*首页获取24小时行情*/
const qdgf = 'quotation_daily_getall_figure'

const ussg = 'user_self_selection_getlist'
const tos = 'trading_order_search'


/*解压base64 gzip*/
function _inflate(data) {
  let result = ''
  try {
    data = atob(data);
    data = data.split('').map(function (e) {
      return e.charCodeAt(0);
    });
    const _result = pako.inflate(data)
    result = String.fromCharCode.apply(null, new Uint16Array(_result))
  } catch (e) {
    result = ''
  }
  return result
}

function _socket() {
  this.single = false
  this.retry = 0
  this.console = false
  this.connection = null
  this.listened = []
  this.invokelist = {}
  this.pollinglist = {}
  this.pollingtimer = {}
  this.reinvokelist = []
  this.receivelist = {}
  this.host = _host
  this.isConnected = false
  this.pubsub = PubSub
  this.tryIsConnected = true

  /*轮询的时间间隔*/
  this.timer = {
    [qkg]: 2000,
    [qmdg]: 2000,
    [qtdg]: 2000,
    [qdg]: 2000,
    [qdgall]: 2000,
    [qdgf]: 2000,
    [tos]: 3000
  }
  this.url = {
    [qkg]: qkg,
    [qmdg]: qmdg,
    [qtdg]: qtdg,
    [qdg]: qdg,
    [qdgall]: qdgall,
    [qdgf]: qdgf,
    [tos]: tos
  }
  /*socket 参数type*/
  this.type = {
    [qkg]: 'kline',
    [qmdg]: 'marketdepth',
    [qtdg]: 'tradedetail',
    [qdg]: 'marketdetail',
    [qdgall]: 'markettickers'
  }
}

_socket.prototype = {
  connect(newconnect) {
    const self = this

    if (!self.is()) {
      return
    }

    if (this.isConnected) {
      return
    }

    function _create() {
      const hubBuilder = new socket.HubConnectionBuilder()
        .withUrl(self.host, {
          transport: socket.HttpTransportType.WebSockets,
          skipNegotiation: true
        })
        .build();

      hubBuilder.keepAliveIntervalInMilliseconds = 10 * 1000; // 10 seconds
      return hubBuilder
    }

    if (newconnect || !self.connection) {
      self.connection = _create()
    }

    /*注册事件*/
    self.initon()

    /*建立连接*/
    self.start()

  },
  start(restart) {
    const self = this
    self.isConnected = false
    if (restart) {
      self.retry++
      if (self.retry > 10) {
        self.tryIsConnected = false
        PubSub.publish(_connect, false)

        /*触发轮询*/
        self._polling()
        return
      }
    }

    self.connection.start()
      .then((a) => {
        self.retry = 0
        self.isConnected = true
        if (!restart) {
          PubSub.publish(_connect, true);
        }
        if (restart) {
          this.reinvokelist.forEach((item) => {
            item && item()
          })
          for (const _invoke in self.invokelist) {
            self.invoke(self.invokelist[_invoke])
          }
        }
      })
      .catch((e) => {
        self.start(true)
      })

  },
  initon() {
    const self = this
    /*断开连接*/
    self.connection.onclose((error) => {
      self.isConnected = false
      self.start(true)
    })

    /*连接成功*/
    self.connection.on(_unsub, (data) => {
      if (self.console) {
        console.log('--------', data);
      }
    })

    /*接受订阅消息*/
    self.connection.on(_receive, (data) => {
      try {
        const result = JSON.parse(_inflate(data))
        if (result) {
          const fun = self.receivelist[result.type.toLowerCase()]
          fun && fun(result)
        }
        if (self.console) {
          console.log('socket:', result)
        }
      } catch (err) {
        console.log(err);
      }
    })

    /*订阅成功的消息*/
    self.connection.on(_sub, (data) => {
      try {
        const result = JSON.parse(_inflate(data))
        if (self.console) {
          console.log('--------', result)
        }
      } catch (err) {
        console.log(err);
      }
    })
  },
  is() {
    return !!window.WebSocket
  },
  listen(method, fun) {
    if (this.listened.some(v => v === method)) return
    this.listened.push(method)
  },
  /*接收*/
  receive(type, fun) {
    const self = this
    if (!self.is()) {
      return
    }
    this.receivelist[type] = fun
  },
  /*订阅*/
  invoke(param) {
    const self = this
    if (!self.is()) {
      this._polling(param)
    }

    self.invokelist[param.type] = param
    if (!self.is() && self.single) {
      return
    } else if (!self.is() && !self.single) {
      self.single = true
      PubSub.publish(_connect, false)
      return
    }

    /*保存订阅*/
    return new Promise((resolve, reject) => {
      if (self.isConnected) {
        self.connection.invoke(_sub, param)
        self.connection.invoke(_debug)
      } else {
        PubSub.subscribe(_connect, (sub, data) => {
          if (!data) {
            self._uninvoke(param)
          } else {
            self.connection.invoke(_sub, param)
            self.connection.invoke(_debug)
          }
        })
      }
    })
  },
  /*添加重新订阅的列表*/
  reinvoke(type, fun) {
    this.reinvokelist.push(fun)
  },
  /*触发轮询*/
  _polling(item) {
    for (const _item in this.pollinglist) {
      if (item && this.type[_item] == item.type) {
        this.pollinglist[_item].callback()
        break
      } else if (!item) {
        this.pollinglist[_item].callback()
      }
    }
  },
  /*触发轮询*/
  polling(item) {
    if (item.url) {
      this.pollinglist[item.url] = item
    }
    if (!this.tryIsConnected && !this.isConnected) {
      item.callback()
    }
  },
  /*删除订阅轮询*/
  _unpolling(item) {
    if (item.url in this.pollinglist) {
      this.cleartimer(item.url)
      delete this.pollinglist[item.url]
    }
  },
  /*取消订阅socket*/
  uninvoke(list) {
    if (!Array.isArray(list)) {
      list = [list]
    }
    list.forEach((item) => {
      if (item in this.invokelist) {
        this._uninvoke(this.invokelist[item])
      }
      for (const _item in this.pollinglist) {
        if (this.type[_item] == item.type) {
          this._unpolling(this.pollinglist[_item])
          break
        }
      }

    })
  },
  /*取消订阅socket*/
  _uninvoke(param) {
    const self = this
    if (!self.is()) {
      return
    }
    if (self.isConnected) {
      /*删除订阅*/
      if (param.type in self.invokelist) {
        delete self.invokelist[param.type]
        delete self.receivelist[param.type]
      }
      param.unsub = param.sub
      delete param.sub
      self.connection.invoke(_unsub, param)
      self.connection.invoke(_debug)
    }
  },
  /*清除订阅计时器*/
  cleartimer(list) {
    if (!Array.isArray(list)) {
      list = [list]
    }
    list.forEach((ti) => {
      for (let item in this.pollingtimer[ti]) {
        clearTimeout(this.pollingtimer[ti][item])
        this.pollingtimer[ti][item] = -1
      }
    })
  }
}

function install(Vue, connection) {
  const socket = new _socket(connection)
  Vue.mixin({
    mounted() {
      /*监听*/
      if (this.$options.sockets) {
        const methods = this.$options.sockets.call(this)
        for (const _method in methods) {
          if (_method == 'polling') {
            methods[_method].callback.bind(this)
            socket.polling(methods[_method])
          } else {
            if (typeof methods[_method] == 'function') {
              socket[_method](methods['type'], data => {
                methods[_method].call(this, data)
              })
            }
          }
        }
      }
    }
  })
  Vue.prototype.$socket = socket
  Vue.$socket = socket
  /*链接socket*/
  if (process.client) {
    socket.connect()
  }
}

export default install
