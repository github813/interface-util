import Vue from 'vue'
import Vuex from 'vuex'
import pagemanage from '../modules/pagemanage'
import interfaceservice from '../modules/interfaceservice'
import ElementUI from 'element-ui'
import '../element-variables.scss'

Vue.use(ElementUI)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pagemanage,interfaceservice
  }
})
