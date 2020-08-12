import conf from '@/conf/'
const device = {
    state: {
        loading: false,
        rows: []
    },
    mutations: {
        loadDeviceData(state,queryParams) {
            state.loading = true;
            
            setTimeout(function() {
                var data = [];
                    data.push({key:"生产厂商",value:"BLXIC"});
                    data.push({key:"设备型号",value:"BLX-ENC-DEV"});
                    data.push({key:"产品号",value:"BLX-ENC-DEV"});
                    data.push({key:"设备序列号",value:"2019032012870090"});
                    data.push({key:"设备版本",value:"1.0"});
                
                state.rows = data;
                state.loading = false;
            },500);
        }
    }
};

export default device;
