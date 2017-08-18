<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="new-item">
                <v-card>
                    <v-card-text>
                        <v-container  >

                            <transition appear tag="div" name="transWelcome" mode="out-in">
                                <form  transition="scale-transition" key="form" >
                                    <v-layout>
                                        <v-flex xs12>
                                            <h4>Publish new item card</h4>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="Country"
                                                    label="Country"
                                                    v-model="Country"
                                                    type="text"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="City"
                                                    label="City"
                                                    v-model="City"
                                                    type="text"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="VisaType"
                                                    label="VisaType"
                                                    v-model="VisaTypeId"
                                                    type="number"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="Price"
                                                    label="Price"
                                                    v-model="Price"
                                                    type="number"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="Description"
                                                    label="Description"
                                                    v-model="Description"
                                                    type="text"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-text-field
                                                    name="Image"
                                                    label="Image"
                                                    v-model="Image"
                                                    type="text"
                                                    required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <v-btn flat v-on:click.native="PublishCard">Publish item card</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form>
                            </transition>


                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {notificator} from '../notificator'
    import axios from 'axios'

    export default {
        name: 'app',
        data() {
            return {
                Country: null,
                City: null,
                VisaTypeId: null,
                Price: null,
                Description: null,
                Image: null,
            }
        },

        computed: {

        },

        methods: {
            PublishCard: async function () {
                const data = {
                    country: this.Country,
                    city: this.City,
                    visaTypeId: this.visaTypeId,
                    price: this.Price,
                    description: this.Description,
                    image: this.Image
                };

                const res = await axios.post('/publish', data);

                const saved = res.data.ok;

                if (saved === 1)
                    this.$toaster.success("Saved");
                else if (saved === 0)
                    this.$toaster.error("This country is already exist");

            }
        },
    }
</script>

<style>


</style>
