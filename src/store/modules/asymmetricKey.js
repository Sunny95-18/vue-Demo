//非对称密钥 store

import conf from '@/conf/'
const asymmetricKey = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        demoPages(state,queryParams) {
            state.loading = true;
            
            setTimeout(function() {
                var totalCount = parseInt((Math.random() * 10000) % 10);
                var data = [];
                for(var i = 0 ; i < totalCount; i++) {
                    data.push({
                        id: i+1,
                        type:"签名密钥",
                        length: 1024
                    });
                    data.push({
                        id: i+1,
                        type:"加密密钥",
                        length: 1024
                    });
                
                }
                state.totalCount = totalCount;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default asymmetricKey;
