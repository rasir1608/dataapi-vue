import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';

axios.defaults.timeout = 60000;
// http request 拦截器
axios.baseUrl = {};
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
let count = 0;
axios.interceptors.request.use(
    (config) => {
        if (!config.notLoading) {
          count++;
          store.commit('SET_LOADING', true);
        }
        return config;
    }
    ,
    err => Promise.reject(err));

// 401 302 code!=0 拦截处理;
axios.interceptors.response.use(
    (res) => {
        count--;
        if (count === 0) store.commit('SET_LOADING', false);
        if (res.data.state === 302) {
            Message.error(res.data.errMsg || '请先登录');
            window.location.href = '#/login';
        } else if (res.data.state === 401) {
            Message.error(res.data.errMsg || '没有访问权限');
            window.location.href = '#/401';
        } else if (res.data.state === 404) {
            Message.error(res.data.errMsg || '没有找到网页');
            window.location.href = '#/404';
        } else if (res.data.state === 500) {
            Message.error(res.data.errMsg || '服务器异常！');
        }
        return res.data;
    },
    (error) => {
        count--;
        if (count === 0) store.commit('SET_LOADING', false);
        return Promise.reject(error.toString());
    });
export default axios;
