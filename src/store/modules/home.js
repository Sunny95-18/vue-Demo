import conf from '@/conf/'
const home = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {  
    },
    actions: {
        //获取设备系统信息
        getDeviceInfo({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get(conf.apiServer + "home/getDeviceInfo", { timeout: 5000 }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            })
        },
    
       
       
    }
};

export default home;
