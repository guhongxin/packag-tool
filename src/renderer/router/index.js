import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'login',
      component: require('@/views/login/index').default
    }, {
      path: '/',
      component: require('@/views/layout/layout').default,
      children: [{
        path: '/home',
        name: 'home',
        component: require('@/views/home/index').default
      }]
    }
  ]
})
