import Vue from 'vue'
import Router from 'vue-router'
import ResetPassword from '../page/personal_manage/reset_password'
import Login from '../page/index'
import UserManage from '../page/system_set/user_manage/user_manage'
import PerfectInfo from '../page/personal_manage/perfect_info'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vue',
  routes: [
    {
      path: '/change_psw',
      component: ResetPassword
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user_manage',
      component: UserManage,
      // children: [
      //   {
      //     path: '/add_user',
      //     component: AddUser,
      //   }
      // ]
    },
    {
      path: '/perfect',
      component: PerfectInfo,
    }
  ]
})
