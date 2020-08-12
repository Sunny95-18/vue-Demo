import conf from '@/conf/'
const logList = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        demoPages(state,queryParams) {
            state.loading = true;
            const requestData=conf.requestData;
            requestData.data={
                current:queryParams.current-1,
                size:queryParams.size,
                ip:'127.0.0.1',
                type:queryParams.type,
                content:queryParams.content
            
            };
           
            setTimeout(function() {
                axios.post(conf.apiServer + "log/getLogPage", requestData).then(
                    res => {
                        var resData = res.data;
                        console.log("resData:",resData)
                        if(resData.code==200 && resData.data!=null){
                        state.rows = resData.data.data;
                        state.totalCount =resData.data.total;
                        }else{
                            state.rows=[];
                            state.totalCount=0;
                        }

                    }).catch(err => {
                        console.error(err);
                    }).then(() => {
                        state.loading = false;
                    });
            },500);
        }
    }
};

export default logList;
