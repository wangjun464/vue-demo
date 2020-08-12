import Vue from 'vue';

import App from './App.vue';

//引入路由配置文件
import router from './router.js';

//引入公共指令
import './directives/index';

//引入公共组件
import './components/index';

//引入公共样式
import '@yelloxing/normalize.css';


new Vue({
    el: document.getElementById('root'),
    router,
    render: createElement => createElement(App)
});