<template>
    <div id="toolbar">
        <v-toolbar>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat>Choose country</v-btn>
                <v-btn flat>Choose visa type</v-btn>
                <router-link tag="v-btn" class="btn btn--flat" v-bind:to="path">{{PathName}}</router-link>

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
                title: 'Visa Market',
                path: '/',
                PathName: '/',
            }
        },

        mounted: function () {
            console.log("now: " + window.location.pathname);

            if ( window.location.pathname === '/signin' ) {
                this.path = '/';
                this.PathName = 'Home';
            } else if ( window.location.pathname === '/' ) {
                this.path = '/signin';
                this.PathName = 'Sign In';
            }
        },

        methods: {
            SignIn: function () {
                event.preventDefault();
            }
        },

        filters: {

        }
    }
</script>

<style>


</style>
