import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        page: 0,
        items: [],
        lang: null,
        visiting: 0,
        login: false,
        drawer: false,
        countries: [],
        admin: {email: null},

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

        visiting(state) {
            return state.visiting;
        },

        lang(state) {
            return state.lang;
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

        visiting(state, {type, value}) {
            state[type] = value;
        },

    },

    actions: {
        async login ({commit}) {
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

        async visited ({state, commit}) {
            const res = await axios.post('/visit', 1);

            const visiting = res.data;

            commit('visiting', {type: 'visiting', value: visiting});
        }
    },



});