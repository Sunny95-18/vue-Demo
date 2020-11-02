import conf from '@/conf/'
const adminManagement = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        querAdminList(state,queryParams) {
            state.loading = true;
            setTimeout(function() {
               
                var data = [];
                data.push({id:1,name:"CN=系统管理员,C=CN",adminType:1,status:0});
                data.push({id:2,name:"CN=系统管理员,C=CN",adminType:1,status:0});
                data.push({id:3,name:"CN=系统管理员,C=CN",adminType:1,status:1});
                data.push({id:4,name:"CN=审计员,C=CN",adminType:2,status:0});
                data.push({id:5,name:"CN=系统管理员,C=CN",adminType:1,status:1});
                
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            },500);
        },
        updateAdminStatus(state,sendData){
            state.loading = true;
            setTimeout(function() {
               this.rows[sendData.id-1].status=sendData.status;
                state.totalCount = this.totalCount;
                state.rows = this.rows;
                state.loading = false;
            },500);
        }
        
    }

}


export default adminManagement;