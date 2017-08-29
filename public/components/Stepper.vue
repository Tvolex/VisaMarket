<template>
    <div class="stepper grey darken-3">
        <v-stepper v-model="step" dark class="mt-3 grey darken-3">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 1">{{lang.ChooseVisaType}}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">{{lang.ChooseCountry}}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">{{lang.ChooseTerm}}</v-stepper-step>
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
                    <v-btn flat dark>{{lang.back}}</v-btn>
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
                <v-btn primary @click.native="step = 3">{{lang.next}}</v-btn>
                <v-btn flat dark>{{lang.back}}</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card class="grey lighten-1 z-depth-1 mb-5">
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
                <v-btn primary @click.native="step = 1">{{lang.next}}</v-btn>
                <v-btn flat dark>{{lang.back}}</v-btn>
            </v-stepper-content>
        </v-stepper>
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
                visaItems: [],
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
            }
        },

        methods: {

            importTextByLanguage: function () {
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
            step(step) {
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
                    case "Works Visa" || "Робоча віза":
                        this.visaTypeId = 1;
                        break;
                    case "Tourist Visa" || "Туристична віза":
                        this.visaTypeId = 0;
                        break;
                }
            }
        }
    }
</script>

<style>
    .stepper {
        margin-top: 200px;
    }
</style>
