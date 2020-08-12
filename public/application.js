const serverInfo = {

    /**
     * 后台服务地址
     */
    server: "http://192.168.1.23:8080/"
}

/**
 * 配置对象
 */
window.AppServerInfo = function() {
    return {
        // 暴露配置只读
        getServerInfo: function(key) {
            return serverInfo[key];
        }
    }
}
    
