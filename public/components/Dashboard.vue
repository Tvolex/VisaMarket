<template>
    <v-app>
        <my-header></my-header>

        <main >
            <v-container fluid class="dashboard">
                <v-layout row wrap>
                    <h4 v-if="page === 0">Dashboard</h4>
                    <editItems v-else-if="page === 1" class="edit-items"></editItems>
                    <h4 v-else-if="page === 2">Dashboard</h4>
                    <h4 v-else-if="page === 3">Dashboard</h4>
                </v-layout>
            </v-container>



        </main>




    </v-app>
</template>

<script>
    import header from './header.vue'
    import editItems from './editItems.vue'


    export default {
        name: 'admin-panel',

        components: {
            "editItems": editItems,
            "my-header": header,
        },

        data() {
            return {
                search: '',
                selected: [],
                sideNav: this.drawer,
            }
        },

        computed: {
            login() {
                return  this.$store.getters.login;
            },

            page() {
                return this.$store.getters.page;
            }
        },

        methods: {

            exit: function () {
                this.$router.push('/');
            },

            setDrawer: function (value) {
                this.$store.commit('drawer', {type: 'drawer', value: value});
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

                this.errors.push(error);
                this.notificator('error', errorNotification);

                console.log(error);
            },
        },

        watch: {
            login(login) {
                if(!login)
                    this.exit();
            },

            sideNav(drawer) {
                this.setDrawer(drawer);
            }
        }


    }
</script>

<style>
    .dashboard, .edit-item, .new-item, .new-manager {
        margin-top: 10vh;
    }

</style>
