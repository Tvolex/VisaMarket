//require modules
import "babel-core/register"
import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import notify from 'v-toaster'
import Vuetify from 'vuetify'
import VueCookies from 'vue-cookies'
import { store } from './store/index'
import 'v-toaster/dist/v-toaster.css'

// require components
import Index from '../public/components/App.vue'
import Authorization from './components/Authorization.vue'
import Dashboard from './components/Dashboard.vue'

const routes = [
    { path: '/', component: Index},
    { path: '/signin', component: Authorization},
    { path: '/dashboard', component: Dashboard},
];


//Setup Vue
Vue.use(VueRouter);
Vue.use(notify, {timeout: 5000});
Vue.use(Vuetify);
Vue.use(VueCookies);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

// Register components
new Vue({
    el: '#app',
    router: router,
    store: store,
    //render: h => h(Index)


});
