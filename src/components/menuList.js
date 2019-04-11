export const MENULIST = [
    {
      menuName: '首页',
      menuUrl: '/home',
      menuIndex: '0'
    },
    {
      menuName: '申报入口',
      menuUrl: '/fractional',
      menuIndex: '1',
      menuSubLink: [
        {
          menuName: '科研项目类',
          menuUrl: '/apply',
          menuIndex: '1-1'
        },
        {
          menuName: '学术论文类',
          menuUrl: '/academic',
          menuIndex: '1-2'
        },
        {
          menuName: '著作类',
          menuUrl: '/work',
          menuIndex: '1-3'
        },
        {
          menuName: '文学作品类',
          menuUrl: '/literary',
          menuIndex: '1-4'
        },
        {
          menuName: '艺体类',
          menuUrl: '/art',
          menuIndex: '1-5'
        },
        {
          menuName: '专利注册类',
          menuUrl: '/patent',
          menuIndex: '1-6'
        },
        {
          menuName: '科研活动类',
          menuUrl: '/activity',
          menuIndex: '1-7'
        },
      ]
    },
    {
      menuName: '科研管理',
      menuUrl: '/project',
      menuIndex: '2',
      menuSubLink: [
        {
          menuName: '科研项目查询',
          menuUrl: '/query',
          menuIndex: '2-1'
        },
        {
          menuName: '科研项目审批',
          menuUrl: '/approval',
          menuIndex: '2-2'
        },
      ]
    },
    {
      menuName: '留言管理',
      menuUrl: '/leave',
      menuIndex: '3',
      menuSubLink: [
        // {
        //   menuName: '最新留言',
        //   menuUrl: '/leave_detail',
        //   menuIndex: '3-1'
        // },
        {
          menuName: '留言列表',
          menuUrl: '/manage_leave',
          menuIndex: '3-2'
        }
      ]
    },
    {
      menuName: '个人中心',
      menuUrl: '/info_manage',
      menuIndex: '4',
      menuSubLink: [
        {
          menuName: '个人信息',
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