import conf from '@/conf/'
const adminUserManagement = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        adminList(state,queryParams) {
            state.loading = true;
            setTimeout(function() {
                var totalCount = 3;
                var data = [];
                for(var i = 1 ; i <= totalCount; i++) {
                    data.push({
                        status: "超级管理员权限",
                        number:  3,
                        users: i+"号",
                        optStatus: "未登录"
                    });
            
                }
                state.totalCount = totalCount;
                state.rows = data;
                state.loading = false;
            },500);
        },
        loadLoginData(state,queryParams){
            state.loading = true;
            setTimeout(function() {
                var totalCount = 3;
                var data = [];
                for(var i = 1 ; i <= totalCount; i++) {
                    data.push({
                          id:i,
                          status:1
                    });
            
                }
                state.totalCount = totalCount;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default adminUserManagement;
