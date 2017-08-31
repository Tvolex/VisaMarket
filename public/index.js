//require modules
import "babel-core/register"
import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import notify from 'v-toaster'
import Vuetify from 'vuetify'
import scrollTo from 'vue-scrollto'
import VueCookies from 'vue-cookies'
import { store } from './store/store'
import 'v-toaster/dist/v-toaster.css'

// require components
import Index from '../public/components/App.vue'
import Authorization from './components/admin/Authorization.vue'
import Dashboard from './components/items/Dashboard.vue'

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
Vue.use(scrollTo);

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
