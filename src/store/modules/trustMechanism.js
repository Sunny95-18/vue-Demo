import conf from '@/conf/'
const trustMechanism = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        queryCert(state,queryParams){
            state.loading = true;
            setTimeout(function() {
                var data = [];
                data.push({id:1,name:"CN=root_rsa,C=CN",theme:"CN=root_rsa,C=CN"});
                data.push({id:2,name:"CN=root_SM2,C=CN",theme:"CN=root_SM2,C=CN"});
                
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default trustMechanism;