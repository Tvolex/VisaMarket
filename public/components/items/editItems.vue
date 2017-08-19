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
                    <v-flex   xs12 sm5 md6 offset-md1 lg5 xl5 v-for="item in currentItem" tag="v-card" v-bind:key="item._id">
                        <v-card class="item-card" >
                            <v-card-media
                                    class="white--text"
                                    height="200px"
                                    v-bind:src="item.image">
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline span-item-title" v-model="country">{{item.country}}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-media>
                            <v-card-title>
                                <div>
                                    <v-text-field
                                            name="input-2-3"
                                            label="Price"
                                            class="input-group--focused"
                                            prepend-icon="attach_money"
                                            v-bind:value="item.price"
                                            v-model="price"
                                            single-line
                                    ></v-text-field>
                                    <span>{{item.description}}</span><br>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn v-if="change" flat class="orange--text">Save</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn flat class="orange--text">Edit description</v-btn>
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
                currentItem: [],
                change: false,
                country: 'Edit country',
                price: 'Edit price',
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
                let i = 0;
                const arr = this.items;
                const id = event.currentTarget.id;

                this.selected = id;

                while (i < arr.length) {

                    if (arr[i]._id === id) {
                        this.currentItem[0] = arr[i];
                        this.country = arr[i].country;
                        this.price = arr[i].price;
                        this.$forceUpdate();
                        return arr[i];
                    }

                    i++;
                }

                this.currentItem[0] = arr[0];
                this.$forceUpdate();
            },





        },

        watch: {
            country(value) {
                if (this.currentItem[0].country !== value) {
                    this.change = true;
                }
            },

            price(value) {
                if (this.currentItem[0].price !== value) {
                    this.change = true;
                }
            }
        }
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
