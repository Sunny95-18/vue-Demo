import conf from '@/conf/'
const whiteList = {
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
                    if(i%2==0){
                    data.push({
                        id: i,
                        name:  "虚拟机"+i,
                        status: "运行中",
                        IP: "127.0.0.1"
                    });
                }else{
                    data.push({
                        id: i,
                        name: "虚拟机"+i,
                        status: "停止",
                        IP: "127.0.0.1"
                    });
                }
                }
                state.totalCount = totalCount;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default whiteList;
