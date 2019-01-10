import Vue from 'vue'
import Router from 'vue-router'
import ResetPassword from '../page/personal_manage/reset_password'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/change_psw',
      component: ResetPassword
    }
  ]
})
