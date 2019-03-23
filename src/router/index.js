import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/index'
import HomePage from '../page/home_page'
import ResetPassword from '../page/personal_manage/reset_password'
import UserManage from '../page/system_set/user_manage/user_manage'
import PerfectInfo from '../page/personal_manage/perfect_info'
import ApplyProject from '../page/projects_manage/add_project'
import QueryProject from '../page/projects_manage/query_project'
import ApprovalProject from '../page/projects_manage/approval_manage'
import Fractional from '../page/fraction_statistics/fractional'
import LeaveDetail from '../page/leave_manage/leave_detail'
import ManageLeave from '../page/leave_manage/manage_leave'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/scientific',
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path:'/home',
      component: HomePage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/change_psw',
      component: ResetPassword,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user_manage',
      component: UserManage,
      meta: {
        keepAlive: true
      }
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
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/apply',
      component: ApplyProject,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/query',
      component: QueryProject,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/approval',
      component: ApprovalProject,
      meta: {
        keepAlive: true
      }
    },
    {    
      path: '/fractional',
      component: Fractional,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/leave_detail',
      component: LeaveDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/manage_leave',
      component: ManageLeave,
      meta: {
        keepAlive: true
      }
    }
  ]
})
