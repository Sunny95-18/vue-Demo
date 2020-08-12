import conf from '@/conf/'
const serviceStatus = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        serviceShow(state,queryParams) {
            state.loading = true;
            setTimeout(function() {
                var data = [];
                    data.push({type:"加密服务",value:"已启动"});
                    data.push({type:"当前并发数",value:0});
                    data.push({type:"内存使用率",value:"25%"});
                state.totalCount = data.length;
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default serviceStatus;
