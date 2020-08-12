import conf from '@/conf/'

export const setToken = (token) => {
    Cookies.set(conf.tokenKey, token/*, { expires: conf.tokenExpires || 1 }*/)
    // sessionStorage.setItem(conf,tokenKey,token);
}

export const getToken = () => {
    return Cookies.get(conf.tokenKey);
    // return sessionStorage.getItem(conf.tokenKey);
}

export const removeToken = () => {
    return Cookies.remove(conf.tokenKey);
    // return sessionStorage.removeItem(conf.tokenKey);
}