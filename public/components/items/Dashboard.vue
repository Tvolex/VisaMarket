<template>
    <v-app>
        <my-header></my-header>

        <main>
            <edit-items v-if="page === 1"></edit-items>
            <new-item v-if="page === 2"></new-item>
            <new-manager v-if="page === 3"></new-manager>
        </main>




    </v-app>
</template>

<script>
    import header from '../header.vue'
    import editItems from './editItems.vue'
    import addItems from './addItems.vue'
    import addManager from './addManager.vue'


    export default {
        name: 'admin-panel',

        components: {
            "edit-items": editItems,
            "new-item": addItems,
            "new-manager": addManager,
            "my-header": header,
        },

        data() {
            return {
                search: '',
                selected: [],
                currentPage: 0,
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
        }


    }
</script>

<style>
    main, .edit-item, .new-item, .new-manager {
        margin-top: 10vh;
    }

</style>
