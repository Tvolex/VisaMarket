<template>
    <v-app>
        <main class="edit-cards">
            <v-container fluid>
                <v-layout>
                    <v-flex xs12 sm5 md4 offset-md1 lg4 offset-lg1 xl4 offset-xl1>
                        <v-card class="item-table" name="listOfCountries" v-for="item in items"
                                v-bind:key="item._id"
                                v-bind:id="item._id"
                                v-on:click="selectCountry($event)">
                            <h6>
                                {{item.country}}
                            </h6>

                        </v-card>
                    </v-flex>
                    <v-flex   xs12 sm5 md6 offset-md1 lg5 xl5 v-for="item in showItem" tag="v-card" v-bind:key="item._id">
                        <v-card class="item-card" >
                            <v-card-media
                                    class="white--text"
                                    height="200px"
                                    v-bind:src="item.image">
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline span-item-title">{{item.country}}</span>
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
    import axios from 'axios'

    export default {
        name: 'app',

        data() {
            return {
                selected: null,
                showItem: [],
            }
        },

        computed: {
            items() {
                return this.$store.getters.items;
            },
        },

        mounted() {
            this.getItems();
        },

        methods: {

            findInArray() {

            },

            async getItems() {
//                let res = await axios.get('/getItems');
//
//                this.items =  res.data;
            },

            selectCountry(event) {
                this.selected = event.currentTarget.id;

                this.showSelected(this.items, this.selected, this.$forceUpdate());
            },

            showSelected(arr, id, cb) {
                let i = 0;

                while (i < arr.length) {
                    if (arr[i]._id === id)
                        return this.showItem[0] = arr[i];
                    i++;
                }

                this.showItem[0] = arr[0];
            },

        },
    }
</script>

<style>
    h6 {
        margin-bottom: 0px;
    }
    .item-table {
        cursor: pointer;
        padding: 10px;
        margin-top: 10px;

    }

    .item-enter-active, .item-leave-active {
        transition: opacity .5s;
        opacity: 1;
        margin-top: 0;
    }
    .item-enter, .item-leave-to  {
        opacity: 0;
        margin-top: 10%;
    }
</style>
