<template>
    <div class="stepper grey darken-3">
        <v-stepper v-model="step" dark class="mt-3 grey darken-3">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 1">{{lang.ChooseVisaType}}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">{{lang.ChooseCountry}}</v-stepper-step>
                <v-divider></v-divider>

            </v-stepper-header>
            <v-stepper-content  step="1">
                <v-card class="grey lighten-1 z-depth-1 mb-5" >
                    <template>
                        <v-card class="secondary elevation-0" fill-height>
                            <v-card-text>
                                <v-container fluid>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <v-subheader class="grey--text text--lighten-1" v-bind:v-text="lang.ChooseVisaType">{{lang.ChooseVisaType}}</v-subheader>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-select
                                                    v-bind:items="[
                                                        {text: lang.WorksVisa},
                                                        {text: lang.TouristVisa}
                                                    ]"
                                                    v-model="visaType"
                                                    label="type"
                                                    dark
                                                    item-value="text"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-text class="text-xs-left">{{lang.WhatIsVisa}}</v-card-text>
                        </v-card>
                    </template>
                </v-card>
                <v-card>
                    <v-btn primary @click.native="step = 2">{{lang.next}}</v-btn>
                    <v-btn flat dark disabled>{{lang.back}}</v-btn>
                </v-card>

            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card class="grey lighten-1 z-depth-1 mb-5">
                    <template>
                        <v-card class="secondary elevation-0" fill-height>
                            <v-card-text>
                                <v-container fluid>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <v-subheader class="grey--text text--lighten-1" v-bind:v-text="lang.ChooseCountry">{{lang.ChooseCountry}}</v-subheader>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-select
                                                    v-bind:items="visaItems"
                                                    v-model="visaCountry"
                                                    label="Country"
                                                    dark
                                                    item-text="country"
                                                    item-value="country"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-text class="text-xs-left">{{lang.WhatIsVisa}}</v-card-text>
                        </v-card>
                    </template>
                </v-card>
                <v-btn primary @click.native="renderFilteredItems">{{lang.show}}</v-btn>
                <v-btn flat dark @click.native="back">{{lang.back}}</v-btn>
            </v-stepper-content>
        </v-stepper>
        <v-dialog v-model="dialog" lazy absolute width="50%">

            <v-card>
                <v-card-text class="card-shadow-bottom">
                    <div class="headline text-sm-center">No data</div>
                </v-card-text>

                <v-card-text class="text-sm-left">
                    No data available
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import LanguageENG from "../lang/eng";
    import LanguageUA from "../lang/ua";
    import LanguageCZ from "../lang/cz";
    import LanguagePL from "../lang/pl";
    import axios from 'axios';
    //import LanguageChooser from './LanguageChooser.vue';

    export default {
        name: 'app',

        data() {
            return {
                lang: LanguageENG,
                step: 0,
                dialog: false,
                showItem: [],
                visaItems: [],
                visaTerms: [],
                visaTerm: null,
                visaType: null,
                visaTypeId: null,
                visaCountry: null,
                visaCountries: null,
            }
        },

        mounted: function () {
            this.importTextByLanguage();
        },

        computed: {
            items() {
                this.$nextTick();
                this.$forceUpdate();
                return this.$store.getters.items;
            },


        },

        methods: {
            async renderFilteredItems() {
                const scrollingOptions = {
                    y: true
                }

                const data = {
                    visaTypeId: this.visaTypeId,
                    visaCountry: this.visaCountry,
                    visaTerm: this.visaTerm
                }

                const res = await axios.get('/getItemsByFilter', {params: data});

                const items = res.data;

                if (items.length < 1)
                    this.dialog = true
                else {
                    this.$store.commit("items", {type: "items", value: items});

                    this.$scrollTo("#cards", 500, scrollingOptions);
                }



            },

            back() {
                this.step = 1;
                this.$store.dispatch({type: "items"});
            },


            importTextByLanguage() {
                let l = this.$cookies.get('Language');
                switch (l) {
                    case 'English':
                        this.lang = LanguageENG;
                        break;
                    case 'Українська':
                        this.lang = LanguageUA;
                        break;
                }
            },
        },
        watch: {
            step(step, oldStep) {
                const arr = this.items;
                if (step === 2) {
                    this.visaItems = [];
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].visaTypeId === this.visaTypeId)
                            this.visaItems.push(arr[i]);
                    }
                }
            },

            visaType(val) {
                switch (val) {
                    case this.lang.WorksVisa:
                        this.visaTypeId = 1;
                        break;
                    case this.lang.TouristVisa:
                        this.visaTypeId = 0;
                        break;
                }
            }
        }
    }
</script>

<style>
    .card-shadow-top {
        -webkit-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    0px -4px 3px rgba(50, 50, 50, 0.75);
        box-shadow:         0px -4px 3px rgba(50, 50, 50, 0.75);
    }
    .card-shadow-bottom {
        box-shadow: 0 4px 3px rgba(50, 50, 50, 0.75);
    }
    .stepper {
        margin-top: 200px;
    }
</style>
