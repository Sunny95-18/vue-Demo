import Vuex from 'vuex'

import app from './modules/app'
import common from './modules/common'

import logList from './modules/logList'
import whiteList from './modules/whiteList'
import asymmetricKey from'./modules/asymmetricKey'
import symmetricKey from './modules/symmetricKey'
import permission from './modules/permission'
import user from './modules/user'
import adminUserManagement from './modules/adminUserManagement'
import userPermissionList from './modules/userPermissionList'
import serviceStatus from './modules/serviceStatus'
import backupKey from './modules/backupKey'
import guide from './modules/guide'
import device from './modules/device'
import getters from './getters'
//
import adminManagement from './modules/adminManagement'
import keyManagement from './modules/keyManagement'
import trustMechanism from './modules/trustMechanism'
import crlManagement from './modules/crlManagement'
import sginAdnEncryCert from './modules/sginAdnEncryCert'
import home from './modules/home'

// 服务配置
import {setApiServer} from "@/conf/"
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
    },
    mutations: {
        init(state) {
            // 配置初始化
            this.commit("confInit");
            // app初始化
            this.commit("appInit");
            // 通用初始化
            this.commit("commonInit");
        },
        // 从本地读取配置，处理刷新问题
        confInit(state) {

            // 如果已经登陆过token添加到axios通用header
            let token = Cookies.get("Authorization");
            if(token) {
                axios.defaults.headers.common['Authorization'] = token;
            }

            // 已经选择的节点服务
            // let server = Cookies.get("server");
            // if(server) {
            //     setApiServer(server);
            // }
            
        },
        clear(state) {
            // 清理数据
            // ie浏览器下面内存无法释放问题
            
        }
    },
    modules: {
        app,
        common,
        logList,
        whiteList,
        asymmetricKey,
        symmetricKey,
        permission,
        user,
        adminUserManagement,
        userPermissionList,
        serviceStatus,
        backupKey,
        guide,
        device,
        //
        adminManagement,
        keyManagement,
        trustMechanism,
        crlManagement,
        sginAdnEncryCert,
        home
    },
    getters
}); 
store.commit("init");

export default store;
