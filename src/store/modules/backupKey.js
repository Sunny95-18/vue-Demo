import conf from '@/conf/'
const backupKey = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        showLoginStatus(state,queryParams) {
            state.loading = true;
            
            setTimeout(function() {
                var data = [];
            
                    data.push({type:"当前权限状态",value:"超级管理员权限"});
                    data.push({type:"管理员数目",value:"1"});
                    data.push({type:"已登录管理员",value:"1号"});
                    data.push({type:"操作员登录状态",value:"未添加"});
        
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default backupKey;
