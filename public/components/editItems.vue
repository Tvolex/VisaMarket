<template>
    <v-app>
        <main class="edit-cards">
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12 sm6 offset-sm3 v-for="item in items" tag="v-card" v-bind:key="item.id">
                        <v-card class=" item-card">
                            <v-card-media
                                    class="white--text"
                                    height="200px"
                                    v-bind:src="item.image"
                            >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline span-item-title">{{item.title}}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-media>
                            <v-card-title>
                                <div>
                                    <span class="grey--text">${{item.price}}</span><br>
                                    <span>{{item.description}}</span><br>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat class="orange--text">Buy</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn flat class="orange--text">Read more</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    export default {
        name: 'app',

        data() {
            return {

            }
        },

        computed: {
            items() {
                return this.$store.getters.items;
            }
        },
    }
</script>

<style>


</style>
