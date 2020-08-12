//import Main from '@/views/main/Main.vue';
const Main = resolve => require(['@/views/main/Main.vue'], resolve)

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/main/login.vue')
};
//作为vm模块的权限
export const vmListRouter = {

    path: '/vmList',
    name: 'vmList',
    title: '虚拟机集群',
    icon:'md-desktop',
    // component: () => import('@/views/main/vmList.vue')
    // component: () => import('@/views/vm/vmList1.vue')
    component: () => import('@/views/vm1/vmList2.vue'),
    children: [
        {path: 'vmIndex', title: '虚拟机列表', meta: { id: -1 }, name: 'vm_list', component: () => import('@/views/vm1/index.vue')},
        { path: 'vmOne', title: '虚拟机0', meta: { id: 0 }, name: 'vm_list1', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmTwo', title: '虚拟机1', meta: { id: 1 }, name: 'vm_list2', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmThree', title: '虚拟机2', meta: { id: 2 }, name: 'vm_list3', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmFour', title: '虚拟机3', meta: { id: 3 }, name: 'vm_list4', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmFive', title: '虚拟机4', meta: { id: 4 }, name: 'vm_list5', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmSex', title: '虚拟机5', meta: { id: 5 }, name: 'vm_list6', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmSeven', title: '虚拟机6', meta: { id: 6 }, name: 'vm_list7', component: () => import('@/views/vm1/vmInfo.vue'), },
        { path: 'vmEight', title: '虚拟机7', meta: { id: 7 }, name: 'vm_list8', component: () => import('@/views/vm1/vmInfo.vue'), },
    ]
};
//当只是super_admin时才拥有的权限
export const userRouter={
    path: '/system-user',
    name: 'systemUser',
    title: '用户管理',
    component: () => import('@/views/vm1/vmList2.vue'),
    children: [
        {path: 'sysUser', title: '系统用户列表', icon: 'md-contacts', name: 'sys_user_list', component: () => import('@/views/vm1/sysUser.vue')},
    ]
}
export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/vmList/vmIndex',
    component: Main,
    children: [
        {
            path: 'home', title: '首页', icon: 'md-home', name: 'home_index', component: () => import('@/views/home/home.vue'),
            meta: {
                navShow: true
            }
        },
        {
            path: 'ownspace', title: '个人中心', name: 'ownspace_index',
            meta: {
                navShow: true
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/guide',
        icon: 'md-body',
        name: 'index',
        title: '安装向导',
        component: Main,
        meta: {
            access: ["0"],
            role: ['admin']
        },
        children: [
            {
                path: 'index', title: '安装向导', icon: 'md-body', name: 'guide', component: () => import('@/views/guide/index.vue'),
                meta: {
                    role: ['admin']
                },
            }
        ]
    },
    {
        path: '/admin-login',
        icon: 'md-body',
        name: 'admin-login',
        title: '用户登录',
        component: Main,
        meta: {
            access: ["0"],
            role: ['admin']
        },
        children: [
            {
                path: 'index', title: '用户登录', icon: 'md-body', name: 'adminLogin', component: () => import('@/views/adminLogin/index.vue'),
                meta: {
                    role: ['admin']
                },
            }
        ]
    },
    {
        path: '/system-management',
        icon: 'md-cog',
        title: '系统管理',
        name: 'system-management',
        component: Main,
        meta: {
            access: ["1"],
            role: ['super_editor']
        },
        children: [
            {
                path: 'basic', title: '设备基本信息', icon: 'md-chatboxes', name: 'basic-information', component: () => import('@/views/system-management/basic'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'maintain', title: '设备维护信息', icon: 'md-chatboxes', name: 'maintain-information', component: () => import('@/views/system-management/maintain'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'selfInspection', title: '设备自检', icon: 'logo-python', name: 'self-inspection', component: () => import('@/views/system-management/selfInspection'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'viewLog', title: '查看日志', icon: 'logo-python', name: 'view-log', component: () => import('@/views/system-management/viewLog'),
                meta: {
                    role: ['super_editor']
                }
            }
        ]
    },
    {
        path: '/authority-management',
        icon: 'ios-contact',
        title: '权限管理',
        name: 'authority-management',
        component: Main,
        meta: {
            access: ["RsaKey"],
            role: ['super_editor']
        },
        children: [
            {
                path: 'usermanagement', title: '用户管理', icon: 'ios-contacts', name: 'userManagement', component: () => import('@/views/authority-management/userManagement'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'updateKey', title: '修改用户口令', icon: 'logo-python', name: 'update-uKey', component: () => import('@/views/authority-management/updateKey'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'permissionList', title: '查看权限设置表', icon: 'logo-python', name: 'permission-list', component: () => import('@/views/authority-management/permissionList'),
                meta: {
                    role: ['super_editor']
                }
            },

        ]
    },
    {
        path: '/key-management',
        icon: 'md-briefcase',
        title: '密钥管理',
        name: 'key-management',
        component: Main,
        meta: {
            access: ["RsaKey"],
            role: ['super_editor']
        },
        children: [
            {
                path: 'RsaKey', title: 'RSA密钥管理', icon: 'md-chatboxes', name: 'rsa-key', component: () => import('@/views/key-management/rsaKey'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'EccKey', title: 'ECC密钥管理', icon: 'logo-python', name: 'ecc-key', component: () => import('@/views/key-management/eccKey'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'symmetricKey', title: '对称密钥管理', icon: 'logo-python', name: 'symmetric-key', component: () => import('@/views/key-management/symmetricKey'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'destroyKey', title: '销毁密钥', icon: 'logo-python', name: 'destroy-key', component: () => import('@/views/key-management/destroyKey'),
                meta: {
                    role: ['super_editor']
                }
            }

        ]
    },
    {
        path: '/service-management',
        icon: 'md-browsers',
        title: '服务管理',
        name: 'service-management',
        component: Main,
        meta: {
            access: ["1"],
            role: ['super_editor']
        },
        children: [

            {
                path: 'serviceStatus', title: '服务状态', icon: 'logo-python', name: 'service-status', component: () => import('@/views/service-management/serviceStatus'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'runStopService', title: '启动/停止服务', icon: 'logo-python', name: 'run-stop-service', component: () => import('@/views/service-management/runStopService'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'whiteList', title: '白名单管理', icon: 'md-chatboxes', name: 'white-list', component: () => import('@/views/service-management/whiteList'),
                meta: {
                    role: ['super_editor']
                }
            }

        ]
    },
    {
        path: '/backup-recovery',
        icon: 'md-albums',
        title: '备份恢复',
        name: 'backup-recovery',
        component: Main,
        meta: {
            access: ["backup"],
            role: ['super_editor']
        },
        children: [
            {
                path: 'backup', title: '备份密钥信息', icon: 'md-chatboxes', name: 'backup-key', component: () => import('@/views/backup-recovery/backup'),
                meta: {
                    role: ['super_editor']
                }
            },
            {
                path: 'recovery', title: '恢复密码信息', icon: 'logo-python', name: 'recovery-key', component: () => import('@/views/backup-recovery/recovery'),
                meta: {
                    role: ['super_editor']
                }
            }

        ]
    }
];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    vmListRouter,
    userRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404,

];
