<template>
    <v-list dense>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon class="grey--text text--darken-1" >settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1" id="0" @click="setPage">Dashboard</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon class="grey--text text--darken-1">edit</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1" id="1" @click="setPage">Edit items</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon class="grey--text text--darken-1">add</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1" id="2" @click="setPage">Add new card</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
            <v-list-tile-action>
                <v-icon class="grey--text text--darken-1">person</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1" id="3" @click="setPage">Add new manager</v-list-tile-title>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "SideBarNavigation",

        data() {
            return {
                currentPage: 0,
            }
        },

        computed: {

        },

        methods: {
            setPage: function (event) {
                const id = event.currentTarget.id;

                this.currentPage = parseInt(id);

                console.log(id);
            }
        },

        watch: {
            currentPage: function (id) {
                this.$store.commit("page", {type: "page", value: id});
            }
        }
    }
</script>

