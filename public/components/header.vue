<template>
    <v-app dark style="max-height: 1px">
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
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn class="white--text" flat>Choose country</v-btn>
                <v-btn class="white--text" flat>Choose visa type</v-btn>
                <router-link tag="v-btn" class="btn btn--flat white--text" v-bind:to="path">{{PathName}}</router-link>

            </v-toolbar-items>
        </v-toolbar>
    </v-app>

</template>
<script>
    import 'vuetify/dist/vuetify.min.css'
    export default {
        name: 'app',

        data() {
            return {
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
            }
        },

        filters: {

        },
    }
</script>

<style>
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
