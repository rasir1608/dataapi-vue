import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routes from './rglobal';

Vue.use(Router);
const vueRouter = new Router({
    routes,
    mode: 'history',
});
vueRouter.afterEach((to) => {
    const meta = to.meta;
    document.title = '数据市场';
    if (meta && meta.title) {
      document.title += `—${to.meta.title}`;
    } 
    if (meta.routerIndex) store.commit('SET_ROUTER_INDEX', meta.routerIndex);
});

export default vueRouter;
