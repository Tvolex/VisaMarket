<template>
    <div dark style="max-height: 1px">
        <v-navigation-drawer temporary v-model="sideNav">
            <v-list>
                <v-list-tile >
                    <v-icon>home</v-icon>
                    <v-list-tile-content class="text-lg-left">
                        <router-link tag="v-btn" class="btn btn--flat" to="/">{{title}}</router-link>
                    </v-list-tile-content>
                </v-list-tile>
                <hr>
                <v-list-tile  style="width: 100%">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="text-md-left" >
                        Вибрати країну
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile  style="width: 100%">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="text-md-left" >
                        Вибрати тип
                    </v-list-tile-content>
                </v-list-tile>

                <router-link tag="v-list-tile" style="width: 100%"  v-bind:to="path">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="text-md-left" >
                        {{PathName}}
                    </v-list-tile-content>
                </router-link>
            </v-list>

            <sideNavDashboard v-if="currentPath === '/dashboard'"></sideNavDashboard>

        </v-navigation-drawer>
        <v-toolbar style="background-color: rgba(0,0,0,0.6)" class="white--text">
            <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
            <router-link tag="v-btn" class="btn btn--flat white--text" to="/">{{title}}</router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items dark class="hidden-xs-only">

                <v-flex v-if="path==='/signin'" xs6 class="selectLanguage">
                    <v-select
                            v-bind:items="langs"
                            v-model="lang"
                            label="Choose language"
                            dark
                            item-value="text"
                            class="li-items"
                    ></v-select>
                </v-flex>

                <router-link tag="v-btn" class="btn btn--flat white--text" v-bind:to="path"  >{{PathName}}</router-link>
                <v-btn class="white--text" flat v-if="login" @click.native="exit">Exit</v-btn>

            </v-toolbar-items>
        </v-toolbar>
    </div>

</template>
<script>
    import 'vuetify/dist/vuetify.min.css'
    import sideNavDashboard from './admin/SideNavDashboard.vue'
    import axios from 'axios';
    export default {
        name: 'app',
        components: {
            "sideNavDashboard": sideNavDashboard,
        },
        data() {
            return {
                lang: this.$cookies.get('Language') || "English",
                langs: [
                    "English",
                    "Українська",
                ],
                sideNav: false,
                title: 'Visa Market',
                currentPath: window.location.pathname ,
                path: '/',
                PathName: '/',
            }
        },

        computed: {
            drawer() {
                return this.$store.getters.drawer;
            },

            login() {
                return this.$store.getters.login;
            }
        },

        mounted: function () {
            console.log("now: " + window.location.pathname);
            if ( window.location.pathname === '/' ) {
                this.path = "/signin";
                this.PathName = "Sign In";
            } else {
                this.path = '/';
                this.PathName = "Home";
            }
        },

        methods: {

            setDrawer: function (value) {
                this.$store.commit('drawer', {type: 'drawer', value: value});
            },

            exit: async function () {
                const res = await axios.post('/exit');

                const exit = !res.data;

                this.setLogin(exit);
            },

            setLogin: function (value) {
                this.$store.commit('login', {type: 'login', value: value});
            },

            SignIn: function () {
                addEventListener(document, "touchstart", function(e) {
                    console.log(e.defaultPrevented);  // will be false
                    e.preventDefault();   // does nothing since the listener is passive
                    console.log(e.defaultPrevented);  // still false
                },);
            },
            reload: function() {
                addEventListener(document, "touchstart", function(e) {
                    console.log(e.defaultPrevented);  // will be false
                    e.preventDefault();   // does nothing since the listener is passive
                    console.log(e.defaultPrevented);  // still false
                },);
                this.$router.go(this.$router.currentRoute);
            }

        },

        filters: {

        },

        watch: {
            lang: function (val) {
                console.log(val);
                this.$cookies.set('Language', val);
                this.$router.go(this.$router.currentRoute)
            },

            sideNav: function (drawer) {
                this.setDrawer(drawer);
            },

            drawer: function (sideNav) {
                this.sideNav = sideNav;
            }


        }
    }
</script>

<style>
    li {
        display: block;
    }
    .selectLanguage {
        width: 160px;
    }
    .card-drop-down {
        margin-top: 0px;
    }
    .application, .application>main>.container {
        height: 10vh;
    }
    .headerSpacer {
        width: 100%;
        height: 10px;
        background-color: transparent;
    }
    #toolbar {
        z-index: 3;

    }
    .toolbar__content {
        height: 65px;
    }
</style>
