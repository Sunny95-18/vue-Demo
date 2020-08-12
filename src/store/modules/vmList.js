import conf from '@/conf/'
import { vmListRouter,userRouter } from '@/router/router.js'
const vmList = {
    state: {
        loading: false,
        totalCount: 0,
        rows: [],
        runningCount: 0,
        stopCount: 0,
        menuList: [],
        allVmList: [
            { path: 'vmOne', title: '虚拟机0', meta: { id: 0 },name: 'vm_list1', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmTwo', title: '虚拟机1', meta: { id: 1 },name: 'vm_list2', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmThree', title: '虚拟机2', meta: { id: 2 },name: 'vm_list3', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmFour', title: '虚拟机3',meta: { id: 3 }, name: 'vm_list4', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmFive', title: '虚拟机4', meta: { id: 4 },name: 'vm_list5', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmSex', title: '虚拟机5', meta: { id: 5 },name: 'vm_list6', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmSeven', title: '虚拟机6', meta: { id: 6 },name: 'vm_list7', component: () => import('@/views/vm1/vmInfo.vue'), },
            { path: 'vmEight', title: '虚拟机7',meta: { id: 7 }, name: 'vm_list8', component: () => import('@/views/vm1/vmInfo.vue'), },
        ],
        vmName: null,
    },
    getters: {
        vmMenus: (state, getters, rootState) => {
            return state.menuList;
        },
    },
    mutations: {
        showSysUserRole(state){
              let sysRole=[];
              sysRole.push(userRouter);
              state.menuList=sysRole;
        },
        removeSysUserRole(state){
            state.menuList=[];
      },
        getVMInfoName(state, id) {
            if (id != null && id >= 0 && id <= 8) {
                state.rows.forEach(row => {
                    if (row.id == id) { state.vmName = row.name 
                    }
                })   
            }
        },
        hardware(state, queryParms) {
            state.loading = true;
            let data = [];
            setTimeout(function () {
                data.push({ type: "内存", value: "4.00 GiB" });
                data.push({ type: "处理器", value: "4(1 sockets, 4 cores" });
                data.push({ type: "硬盘", value: "size=15G" });
                data.push({ type: "网络设备(net0)", value: "127.0.0.1" });
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            }, 500);
        },
        option(state, queryParms) {
            state.loading = true;
            let data = [];
            setTimeout(function () {
                data.push({ type: "名称", value: "linux" });
                // data.push({type: "开机自启动",value:  "否"});
                data.push({ type: "ip地址", value: "192.168.88.123" });
                data.push({ type: "子网掩码", value: "255.255.255.0" });
                data.push({ type: "网关", value: "192.168.88.1" });
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            }, 500);
        },
        loadVmList(state, username) {
            state.loading = true;
            const requestData = conf.requestData;
            requestData.data = username;
            if(username=="super_admin"){
                let sysRole=[];
                sysRole.push(userRouter);
                state.menuList=sysRole;
            }
            state.rows = [];
            setTimeout(function () {
                axios.post(conf.apiServer + "vm/list", requestData, { timeout: 5000 }).then(
                    res => {
                        var resData = res.data;
                        state.rows = resData.data;
                        state.totalCount = resData.data.length;
                        let vmMenus = state.menuList;
                        let children = [];
                        children.push(vmListRouter.children[0]);
                        vmListRouter.children = children;
                        if (state.totalCount == 8) {
                            vmListRouter.children.push(state.allVmList)

                        } else {
                            state.rows.forEach(row => {
                                let menu = state.allVmList[row.id];
                                menu.title = row.name;
                                vmListRouter.children.push(menu)
                            });
                        }
                      
                        vmMenus.push(vmListRouter);
                        state.menuList=vmMenus;
                    }).catch(err => {
                        console.error(err);
                    }).then(() => {
                        state.loading = false;
                    });
            }, 500);
        }

    },
    actions: {
        // getVmListByUserToken({ state, commit }, username) {
        //     return new Promise((resolve, reject) => {
        //         const requestData = conf.requestData;
        //         requestData.data = username;
        //         axios.post(conf.apiServer + "vm/list", requestData, { timeout: 5000 }).then(res => {
        //             resolve(res);
        //         })
        //             .catch(err => {
        //                 console.log(err.response)
        //                 reject(err);
        //             });
        //     })
        // }

    }
};

export default vmList;
