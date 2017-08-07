<template>
    <div dark style="max-height: 1px">
        <v-navigation-drawer temporary v-model="sideNav">
            <v-list>
                <v-list-tile  style="margin-left: -100px">
                    <v-icon>home</v-icon>
                    <v-list-tile-content class="text-lg-left">
                        Visa Market
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
        </v-navigation-drawer>
        <v-toolbar style="background-color: rgba(0,0,0,0.6)" class="white--text">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-toolbar-side-icon
                    v-on:click="sideNav = !sideNav"
                    class="hidden-sm-and-up "></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-items dark class="hidden-sm-and-down text-xs-center">

                <v-flex xs6 class="selectLanguage">
                    <v-select
                            v-bind:items="langs"
                            v-model="lang"
                            label="Choose language"
                            dark
                            item-value="text"
                    ></v-select>
                </v-flex>

                <v-btn class="white--text" flat>Choose visa type</v-btn>
                <router-link tag="v-btn" class="btn btn--flat white--text" v-bind:to="path">{{PathName}}</router-link>

            </v-toolbar-items>
        </v-toolbar>
    </div>

</template>
<script>
    import 'vuetify/dist/vuetify.min.css'
    export default {
        name: 'app',

        data() {
            return {
                lang: this.getLang() || 'eng',
                langs: [
                    'English',
                    'Українська',
                    'Czeska',
                    'Polska',
                ],
                sideNav: false,
                title: 'Visa Market',
                path: '/',
                PathName: '/',
            }
        },

        mounted: function () {
            console.log("now: " + window.location.pathname);

            if ( window.location.pathname === "/signin" ) {
                this.path = '/';
                this.PathName = "Home";
            } else if ( window.location.pathname === '/' ) {
                this.path = "/signin";
                this.PathName = "Sign In";
            }
        },

        methods: {
            SignIn: function () {
                event.preventDefault();
            },

            getLang: function () {
                return this.$cookies.get('language');

            },

            setLang: function (l) {
                let langs = ['eng', 'ua', 'pl', 'cz'];
                this.lang = this.$cookies.set('language', l || langs[0]);
            },
        },

        filters: {

        },

        watch: {
            leng: function (val) {
                this.setLang(val);
                this.lang = this.getLang();
            }
        }
    }
</script>

<style>
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
