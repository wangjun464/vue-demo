import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import index from './pages/index.vue'


export default new VueRouter({
    routes:[{
        name:'index',
        path:'/index',
        component:index
    },{
        path:'/*',
        redirect:'/index'
    }]
});

