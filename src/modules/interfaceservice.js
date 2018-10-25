
import * as API from '../api/index'

const state = {
  interfaceDetailRet: [],
}
const mutations = {
  getInterfaceDetailByQC(state, comments) {
    state.interfaceDetailRet = comments
  }
}
const actions = {
  getInterfaceDetailByQC({ commit },{comment}) {
     API.POST('/interface-util/interface/detail/getInterfaceDetailByQC',comment).then(function (ret) {
       if (ret.code == 0) {
         let comments = ret.data;
         commit('getInterfaceDetailByQC', comments)
       }
     })
  }

}

export default {
  state, mutations, actions
}
