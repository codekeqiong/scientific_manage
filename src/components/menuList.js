export const MENULIST = [
    {
      menuName: '首页',
      menuUrl: '/',

      
      menuIndex: '0'
    },
    {
      menuName: '科研项目管理',
      menuUrl: '/project',
      menuIndex: '1',
      menuSubLink: [
        {
          menuName: '科研项目申报',
          menuUrl: '/apply',
          menuIndex: '1-1'
        },
        {
          menuName: '科研项目查询',
          menuUrl: '/query',
          menuIndex: '1-2'
        },
        {
          menuName: '科研项目审批',
          menuUrl: '/approval',
          menuIndex: '1-3'
        },
      ]
    },
    {
      menuName: '科研分数统计',
      menuUrl: '/fractional',
      menuIndex: '2'
    },
    {
      menuName: '留言管理',
      menuUrl: '/leave',
      menuIndex: '3',
      menuSubLink: [
        {
          menuName: '最新留言',
          menuUrl: '/leave_detail',
          menuIndex: '3-1'
        },
        {
          menuName: '留言列表',
          menuUrl: '/manage_leave',
          menuIndex: '3-2'
        }
      ]
    },
    {
      menuName: '个人信息管理',
      menuUrl: '/info_manage',
      menuIndex: '4',
      menuSubLink: [
        {
          menuName: '完善个人信息',
          menuUrl: '/perfect',
          menuIndex: '4-1'
        },
        {
          menuName: '修改密码',
          menuUrl: '/change_psw',
          menuIndex: '4-2'
        }
      ]
    },
    {
      menuName: '系统设置',
      menuUrl: '/system_set',
      menuIndex: '5',
      menuSubLink: [
        // {
        //   menuName: '角色权限设置',
        //   menuUrl: '/role_set',
        //   menuIndex: '5-1'
        // },
        {
          menuName: '用户管理',
          menuUrl: '/user_manage',
          menuIndex: '5-2'
        }
      ]
    },
    // {
    //   menuName: '退出登录',
    //   menuUrl: '/login_out',
    //   menuIndex: '6'
    // }
]