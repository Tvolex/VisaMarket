import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        login: false,
        drawer: false,
    },

    getters: {
        login(state) {
            return state.login;
        },

        drawer(state) {
            return state.drawer;
        }
    },

    mutations: {
        login(state, {type, value}) {
            state[type] = value;
        },

        drawer(state, {type, value}) {
            state[type] = value;
        }
    },

    actions: {
        someFunction( {state, dispatch, commit}, query ){
            ///
        },

        async checkLogin ({state, commit}) {
            let res = await axios.post('/login');

            const login = res.data;

            login ? this.$toaster.info("Welcome") : this.$toaster.info("Not authorized");

            commit('login', {type: 'login', value: login});
        },
    },



});