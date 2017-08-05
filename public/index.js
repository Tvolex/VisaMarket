//require modules
import "babel-core/register"
import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import notify from 'v-toaster'
import Vuetify from 'vuetify'
import 'v-toaster/dist/v-toaster.css'

// require components
import Index from '../public/components/App.vue'
import Authorization from './components/Authorization.vue'

const routes = [
    { path: '/', component: Index},
    { path: '/signin', component: Authorization}
];

//Setup Vue
Vue.use(VueRouter);
Vue.use(notify, {timeout: 5000});
Vue.use(Vuetify);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

// Register components
new Vue({
    el: '#app',
    router: router,
    //render: h => h(Index)
});
