import np from 'number-precision'

function install(Vue) {
  Vue.prototype.$np = np
  Vue.$np = np
}

export default install
