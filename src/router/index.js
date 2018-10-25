import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

import page from '../views/pagemanage'
import Interfacemanage from '../views/Interfacemanage'
import Addconnector from '../views/Addconnector'
Vue.use(Router)

const router = new Router({
  // mode:'history',//不使用hash链接 URL中不显示#
  routes: [

    {
      path: '/',
      component: Home,
      redirect: '/interface',
      children: [
        {path:'/interface',component: Interfacemanage},
        {path:'/page',component: page},
        {path:'/Addconnector',component: Addconnector},
      ]
    }

  ]
})
router.beforeEach((to, from, next) => {
  sessionStorage.setItem('url',to.fullPath);
  next()
})
export default router
