
import * as API from '../api/index';

const state = {
    pageAll: [],
}
//mutations是用来修改state中的数据的
const mutations = {
    //state是上面初始定义的state对象，comment载荷数据
    //获取全部数据
    getPageDetailList(state,comments) {
        state.pageAll=comments
    }
}
const actions = {
    //方法中参数使用的是解构赋值的方式存入,第一是commit负载方法，第二参数是负载数据
    getPageDetailList({commit},{comment}) {
        const url = '/interface-util/interface/detail/getPageDetailList'
        API.GET(url,comment).then(res =>{
            let comments = res.data;
            commit('getPageDetailList',comments)
        })
    }
}
export default {
    state, mutations, actions
}
