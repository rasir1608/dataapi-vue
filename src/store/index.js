import Vue from 'vue';
import Vuex from 'vuex';
// import global from './global';

const files = require.context('.', false, /\.js$/);
const modules = {};
files.keys().forEach((key) => {
  if (!/\.\/index\.js$/.test(key)) modules[key.replace(/(\.\/)|(\.js$)/g, '')] = files(key).default;
});
Vue.use(Vuex);
export default new Vuex.Store({
    modules,
});
