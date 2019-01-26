import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../page/home_page'
import ResetPassword from '../page/personal_manage/reset_password'
import Login from '../page/index'
import UserManage from '../page/system_set/user_manage/user_manage'
import PerfectInfo from '../page/personal_manage/perfect_info'
import ApplyProject from '../page/projects_manage/add_project'
import QueryProject from '../page/projects_manage/query_project'
import ApprovalProject from '../page/projects_manage/approval_manage'
import LeaveDetail from '../page/leave_manage/leave_detail'
import ManageLeave from '../page/leave_manage/manage_leave'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/scientific',
  routes: [
    {
      path:'/',
      component: HomePage
    },
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
      component: UserManage
      // children: [
      //   {
      //     path: '/add_user',
      //     component: AddUser,
      //   }
      // ]
    },
    {
      path: '/perfect',
      component: PerfectInfo
    },
    {
      path: '/apply',
      component: ApplyProject
    },
    {
      path: '/query',
      component: QueryProject
    },
    {
      path: '/approval',
      component: ApprovalProject
    },
    {
      path: '/leave_detail',
      component: LeaveDetail
    },
    {
      path: '/manage_leave',
      component: ManageLeave
    }
  ]
})
