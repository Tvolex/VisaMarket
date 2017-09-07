<script>
    import {notificator} from '../notificator'
    import axios from 'axios'

    export default {
        name: 'app',
        data() {
            return {
                Country: null,
                City: null,
                visaTypeItems: [
                    {text: "Works Visa"},
                    {text: "Tourist Visa"}
                ],
                visaType: "Works Visa",
                visaTypeId: null,
                Price: null,
                Term: null,
                Description: null,
                Image: null,
            }
        },


        computed: {

        },

        methods: {
            clear() {
                this.$refs.newItemForm.reset();

            },

            PublishCard: async function () {

                const data = {
                    country: this.Country,
                    city: this.City,
                    visaTypeId: this.visaTypeId,
                    price: this.Price,
                    term: this.Term,
                    description: this.Description,
                    image: this.Image
                };

                try {
                    const res = await axios.post('/publish', data);

                    const saved = res.data.ok;

                    if (saved === 1)
                        this.$toaster.success("Saved");

                } catch(e) {
                    this.errorHandler(e);
                }
            },

            errorHandler(error) {
                if (error.response.status === 400)
                    this.$toaster.warning("This country is already exist");
                else {
                    this.$toaster.error(error.response.status + ' : ' + error.response.statusText);
                }
            }
        },

        watch: {
            visaType: function (val) {
                switch (val.text) {
                    case "Tourist Visa": this.visaTypeId = 0; break;
                    case "Works Visa": this.visaTypeId = 1; break;
                }
            },
        }
    }
</script>


<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="new-item">
                <v-card>
                    <v-card-text>
                        <v-container  >
                            <transition tag="div" name="transWelcome" mode="out-in">
                                <form  transition="scale-transition" ref="newItemForm" key="form" >
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
                                    <v-layout row wrap>

                                        <v-flex xs12>
                                            <v-select
                                                    v-bind:items="visaTypeItems"
                                                    v-model="visaType"
                                                    label="Select visa type"
                                                    single-line

                                                    bottom
                                            ></v-select>
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
                                                    name="Term"
                                                    label="Term"
                                                    v-model="Term"
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
                                        <v-flex xs-12 sm6 offset-sm3>
                                            <img v-bind:src="Image" width="200">
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-btn primary v-on:click.native="PublishCard">Publish item card</v-btn>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-btn flat v-on:click.native="clear">Clear</v-btn>
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



<style>
    [data-tooltip] {
        display:inline-block;
        position:relative;
        cursor: pointer;
    }
    [data-tooltip]:before,
    [data-tooltip]:after {
        visibility: hidden;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
        opacity: 0;
        pointer-events: none;
    }

    [data-tooltip]:before {
        background: #006104;
        background: hsla(110,100%,17%,.9);
        bottom: 100%;
        margin-bottom: 6px;
        color: #f6f6f6;
        content: attr(data-tooltip);
        font-size: 14px;
        width: 320px;
        left: 0;
        padding: 7px 10px;
        position: absolute;
        text-shadow: 0 1px 1px hsla(0,0%,0%,1);
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -o-border-radius: 5px;
        border-radius: 5px;
    }
    [data-tooltip]:after {
        border-top: 6px solid #006104;
        border-top: 6px solid hsla(110,100%,17%,.9);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        bottom: 100%;
        content: "";
        height: 0;
        width: 0;
        left: 25px;
        position: absolute;
    }
    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
        visibility: visible;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
        opacity: 1;
        transition: all 0.4s ease-in-out;
    }
    .application, .application>main>.container {
        min-height: 130vh;
    }
</style>
