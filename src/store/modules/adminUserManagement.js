import conf from '@/conf/'
const adminUserManagement = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        queryManager(state, queryParams) {
            state.loading = true;

            setTimeout(function () {
                axios.post(conf.apiServer + "auth/getPrivilege").then(
                    res => {
                        var resData = res.data;
                        if (resData.code == 200 && resData.data != null) {
                            state.row = [];
                            state.rows.push(resData.data);
                            state.totalCount = 1;
                        } else {
                            state.rows = [];
                            state.totalCount = 0;
                        }

                    }).catch(err => {
                        console.error(err);
                    }).then(() => {
                        state.loading = false;
                    });
            }, 500);
        },
        loadLoginData(state, queryParams) {
            state.loading = true;
            setTimeout(function () {
                var totalCount = 3;
                var data = [];
                for (var i = 1; i <= totalCount; i++) {
                    data.push({
                        id: i,
                        status: 1
                    });

                }
                state.totalCount = totalCount;
                state.rows = data;
                state.loading = false;
            }, 500);
        }
    },
    actions: {
          //管理员或操作员登录
          managerLogout({ commit }, pin) {
            const requestData = conf.requestData;
            requestData.data = pin;
            return new Promise((resolve, reject) => {
                axios.post(conf.apiServer + "auth/managerLogin", requestData, { timeout: 5000 }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            })
        },
        //注销管理员或操作员
        managerLogout({ commit }, userId) {
            const requestData = conf.requestData;
            requestData.data = userId;
            return new Promise((resolve, reject) => {
                axios.post(conf.apiServer + "auth/managerLogout", requestData, { timeout: 5000 }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            })
        },
    }
};

export default adminUserManagement;
