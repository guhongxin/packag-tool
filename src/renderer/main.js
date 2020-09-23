import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import './assets/style/index.scss'

import {
  Form,
  FormItem,
  Button,
  Input,
  Checkbox,
  Dialog,
  Progress,
  Table,
  TableColumn,
  Loading,
  Steps,
  Step
} from 'element-ui'

import './permission.js'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Progress)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
