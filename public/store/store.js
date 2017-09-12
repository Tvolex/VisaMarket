import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies';
import LanguageENG from "../lang/eng";
import LanguageUA from "../lang/ua";
import LanguageCZ from "../lang/cz";
import LanguagePL from "../lang/pl";

Vue.use(Vuex);
Vue.use(VueCookies);

export const store = new Vuex.Store({

    state: {
        page: 0,
        items: [],
        visiting: 0,
        login: false,
        drawer: false,
        countries: [],
        language: LanguageENG,
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

        language(state) {
            return state.language;
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

        language(state, {type, value}) {
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

        async items( {dispatch, commit}){
            dispatch({type: "language"});

            const res = await axios.get('/getItems');

            const items = res.data;

            commit('items', {type: 'items', value: items});
        },

        async visited ({state, commit}) {
            const res = await axios.post('/visit');

            const visiting = res.data;

            commit('visiting', {type: 'visiting', value: visiting});
        },

        language ({dispatch, commit}) {
            const l = VueCookies.get('Language') || LanguageENG.NameOfLanguage;

            switch (l) {
                case 'English':
                    commit('language', {type: 'language', value: LanguageENG});
                    break;
                case 'Українська':
                    commit('language', {type: 'language', value: LanguageUA});
                    break;
            }
        }
    },



});