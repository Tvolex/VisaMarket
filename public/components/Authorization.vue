<template>
    <v-app dark>
        <template>

            <div>
                <div id="toolbar">
                    <my-header></my-header>
                </div>
            </div>

            <v-container fluid>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3 class="Authorization">
                        <v-card>
                            <v-card-text>
                                <v-container>

                                    <transition appear tag="div" name="transWelcome" mode="out-in">
                                        <form v-if="!login" transition="scale-transition" key="form" >
                                            <v-layout>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            name="email"
                                                            label="Email"
                                                            v-model="email"
                                                            type="email"
                                                            v-bind:rules="emailrules"
                                                            required>
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            name="password"
                                                            label="Password"
                                                            v-model="password"
                                                            type="password"
                                                            v-bind:rules="rules"
                                                            required>
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout>
                                                <v-flex xs12>
                                                    <v-btn flat v-on:click.native="SignIn">Sign in</v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </form>
                                        <div class="welcome" v-else-if="login" transition="scale-transition" name="welcome" key="welcome">
                                            <p>Welcome</p>
                                            <router-link to="/dashboard">Dashboard</router-link>
                                        </div>
                                    </transition>


                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

        </template>
    </v-app>

</template>

<script>
    import header from './header.vue'
    import axios from 'axios';


    export default {
        components: {
            "my-header": header,
        },
        name: 'Authorization',
        data() {
            return {
                title: "Authorization",
                msg: "Authorization on Visa Market",
                email: null,
                password: null,
                login: false,
                path: '/',
                errors: [],
                rules: [],
                emailrules: [],
            }
        },

        mounted: function () {
            this.checkLogin();
        },

        methods: {

            checkLogin: async function() {
                let login = await axios.post('/checkLogin');

                if(!login.data)
                    this.$toaster.error("asdasdasd");
                else if ( login.data )
                    this.$router.push('/dashboard');

            },

            SignIn: async function () {
                let data = {email: this.email, password: this.password};

                try {
                    let signin = await axios.post('/login', data);

                    this.login  = signin.data;

                } catch(e) {
                    this.errorHandler(e);
                }
            },

            notificator: function (type, message) {
                switch (type) {
                    case 'info': this.$toaster.info(message);
                        break;
                    case 'success': this.$toaster.success(message);
                        break;
                    case 'warning': this.$toaster.warning(message);
                        break;
                    case 'error': this.$toaster.error(message);
                        break;
                }

            },

            errorHandler: function (error) {
                let errorNotification = error.response.status + ' : ' + error.response.statusText;

                if (error.response.status === 401) {
                    this.rules.push("Username or Password is incorrect.");
                    this.emailrules.push(" ");
                }

                this.errors.push(error);
                this.notificator('error', errorNotification);

                console.log(error);
            },
        }
    }
</script>

<style lang="scss">
    transWelcome {
        transition: all 0.5s;
    }
    .transWelcome-enter{
        transition: all 0.5s;
        margin-left: 100%;
        opacity: 0;
    }
    .transWelcome-leave-to{
        transition: all 0.3s;
        margin-left: -5%;
        opacity: 0;
    }
    .transWelcome-enter-to {
        transition: all 0.5s;
        opacity: 1;
    }
    .Authorization {
        margin-top: 25vh;
    }

</style>
