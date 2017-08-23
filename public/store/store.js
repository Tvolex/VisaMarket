import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        admin: {email: null},
        login: false,
        drawer: false,
        items: [],
        page: 0,
        countries: [],

    },

    getters: {
        admin(state) {
            return state.admin;
        },

        login(state) {
            return state.login;
        },

        drawer(state) {
            return state.drawer;
        },

        items(state) {
            return state.items;
        },

        page(state) {
            return state.page;
        },


    },

    mutations: {
        admin(state, {type, value}) {
            state[type].email = value;
        },

        login(state, {type, value}) {
            state[type] = value;
        },

        drawer(state, {type, value}) {
            state[type] = value;
        },

        items(state, {type, value}) {
            state[type] = value;
        },

        page(state, {type, value}) {
            state[type] = value;
        },


    },

    actions: {
        async login ({state, commit, dispatch}) {
            const res = await axios.post('/login');

            const login = res.data.login;

            commit('admin', {type: 'admin', value: res.data.email});
            commit('login', {type: 'login', value: login});
        },

        async items( {state, commit}){
            const res = await axios.get('/getItems');

            const items = res.data;

            commit('items', {type: 'items', value: items});
        },
    },



});