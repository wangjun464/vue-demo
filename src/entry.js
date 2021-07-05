import Vue from 'vue';

import App from './App.vue';

import './style/normal.css';

//引入路由配置文件
import router from './router.js';

new Vue({
    el: document.getElementById('root'),
    router,
    render: createElement => createElement(App)
});