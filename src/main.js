// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style.scss';
import '@/assets/resize.scss';
import ElementUI from 'element-ui';
import moment from 'moment';
import App from './App';
import router from './router';
import store from './store';
import axios from './http';

Vue.config.errorHandler = function (err, vm) {
    // handle error
    console.log('error', err, vm);
};
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.prototype.moment = moment;
Vue.filter('formatDate', (time, format) => {
  if (!time) return '';
  if (!(time instanceof Date)) time = new Date(Number(time));
  format = format || 'YYYY-MM-DD hh:mm:ss';
  return moment(time).format(format);
});
Vue.filter('powerMap', (power) => {
  if (!/^[0-5]$/.test(power)) return '';
  return ['驳回', '申请中', '已通过', '', '', '管理员'][Number(power)];
});

Vue.prototype.trimStr = string => string.trim();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
console.log('version:1.0.0');
