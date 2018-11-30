import Vue from 'vue'
import Vuex from 'vuex'
import createState from './state'
import getters from './getter'
import * as mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = () => {
  const state = createState()
  const vuexStore = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
  return vuexStore
}

export default store
