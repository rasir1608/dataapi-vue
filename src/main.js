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
Vue.prototype.trimStr = string => string.trim();
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
