import conf from '@/conf/'
const keyManagement = {
    state: {
        loading: false,
        totalCount: 0,
        rows: []
    },
    mutations: {
        queryKeyList(state,type){
            state.loading = true;
            const requestData = conf.requestData;
            requestData.data =type;
            setTimeout(function() {
                axios.post(conf.apiServer + "key/getKeyList", requestData).then(
                    res => {
                        var resData = res.data;
                        if (resData.code == 200 && resData.data != null) {
                            state.rows = resData.data.data;
                            state.totalCount = resData.data.total;
                        } else {
                            state.rows = [];
                            state.totalCount = 0;
                        }

                    }).catch(err => {
                        console.error(err);
                    }).then(() => {
                        state.loading = false;
                    });
            },500);
        }
    },
    actions:{
        KeyGeneration({ commit }, createKey) {
            console.log("keyIndex:",createKey.index)
            const data=new FormData();
            data.append("keyType",createKey.type);
            data.append("keyIndex",createKey.index)
            data.append("keyLength",createKey.length)
            return new Promise((resolve, reject) => {
                axios.post(conf.apiServer + "key/KeyGeneration", data, {
                    timeout: 5000,
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            });

        },
        deleteKey({ commit }, id) {
            const requestData = conf.requestData;
            requestData.data =id;
            return new Promise((resolve, reject) => {
                axios.post(conf.apiServer + "key/deleteKey", requestData, {
                    timeout: 5000,
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            });

        },
        init({ commit }) {
            return new Promise((resolve, reject) => {
                axios.post(conf.apiServer + "key/init", {
                    timeout: 5000,
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err.response)
                    reject(err);
                });
            });

        }
    }
};

export default keyManagement;