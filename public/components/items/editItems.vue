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


                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-media>
                            <v-card-title>
                                <div>
                                    <v-subheader>
                                        <h5>{{item.country}}</h5>
                                    </v-subheader>

                                    <v-text-field
                                            name="price"
                                            label="Price"
                                            class="input-group--focused"
                                            prepend-icon="attach_money"
                                            type="number"
                                            v-bind:value="item.price"
                                            v-model="price"
                                            single-line
                                    ></v-text-field>
                                    <v-subheader>
                                        <h6>{{item.description}}</h6>
                                    </v-subheader>


                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-flex xs12>
                                    <v-btn v-if="change" flat class="orange--text" v-on:click="updateItem">Save</v-btn>
                                </v-flex>
                                <v-flex sx12 sm10 offset-sm1 md8 offset-md2>
                                    <v-dialog v-model="modal">
                                        <v-btn flat class="orange--text" slot="activator">Edit description</v-btn>
                                        <v-card >
                                            <v-card-title>
                                                <span class="headline">Edit description</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-text-field
                                                        name="description"
                                                        label="Description"
                                                        class="input-group--focused edit-description"
                                                        v-bind:value="item.description"
                                                        v-model="description"
                                                        textarea
                                                        single-line
                                                ></v-text-field>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn class="blue--text darken-1" flat @click.native="closeModal(0)">Close</v-btn>
                                                <v-btn class="blue--text darken-1" flat @click.native="closeModal(1)">Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-flex>


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
                errors: [],
                price: null,
                modal: false,
                change: false,
                selected: null,
                currentItem: [],
                description: null,
            }
        },

        computed: {
            items() {
                return this.$store.getters.items;
            },

        },

        methods: {

            selectCountry(event) {
                let i = 0;
                const arr = this.items;
                const id = event.currentTarget.id;
                this.selected = id;
                while (i < arr.length) {
                    if (arr[i]._id === id) {
                        this.currentItem[0] = arr[i];
                        this.price = arr[i].price;
                        this.$forceUpdate();
                        return arr[i];
                    }
                    i++;
                }
                this.currentItem[0] = arr[0];
                this.$forceUpdate();
            },

            closeModal(status) {
                this.modal = false;

                if (status === 0)
                    this.description = this.currentItem[0].description;

            },

            async updateItem() {
                this.currentItem[0].price = this.price;
                this.currentItem[0].description = this.description;

                try {
                    const res = await axios.post('/updateItem', this.currentItem[0]);

                    const updated = res.data;

                    if (updated.ok)
                        this.notificator('success', "Updated");

                } catch (e) {
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

                this.errors.push(error);
                this.notificator('error', errorNotification);

                console.log(error);
            },
        },

        watch: {
            description(value) {
                if (this.currentItem[0].description !== value)
                    this.change = true;
                else
                    this.change = false;

                this.$forceUpdate();
            },
            price(value) {
                if (this.currentItem[0].price !== value)
                    this.change = true;
                else
                    this.change = false;
                this.$forceUpdate();
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
    .edit-description {
        width: 100%;
    }
    .input-group--text-field.input-group--textarea:not(.input-group--full-width) textarea {
        padding: 10px;
    }

    .dialog {
        min-width: 70%;
        width: 80%;
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
