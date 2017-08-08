<template>
    <div class="stepper grey darken-3">
        <v-stepper v-model="e1" dark class="mt-3 grey darken-3">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">{{lang.ChooseVisaType}}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">{{lang.ChooseCountry}}</v-stepper-step>
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
                    <v-btn primary @click.native="e1 = 2">{{lang.next}}</v-btn>
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
                                                    v-bind:items='visaCoutries'
                                                    v-model="visaCountry"
                                                    label="Country"
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
                <v-btn primary @click.native="e1 = 3">{{lang.next}}</v-btn>
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
                <v-btn primary @click.native="e1 = 1">{{lang.next}}</v-btn>
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
                e1: 0,
                lang: LanguageENG,
                visaType: null,
                visaTypeId: 0,
                visaCountry: null,
                visaCoutries: [{text: "text"}],
                visaTerm: null,

            }
        },

        mounted: function () {
            this.importTextByLanguage();
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

            getCountryByVisaType: async function () {
                let data = {visaTypeId: this.visaTypeId};
                let countries = await axios.get('/getCountriesByVisaType', {params: data});
                this.visaCoutries = countries.data;
            }
        },
        watch: {

            visaType: function (val) {
                console.log(val);
                switch (val) {
                    case "Туристична віза" || "Tourist Visa": this.visaTypeId = 0; break;
                    case "Робоча віза" || "Working Visa": this.visaTypeId = 1; break;
                }
            },

            e1: function (step) {
                if(step === 2) this.getCountryByVisaType();
            }

        }
    }
</script>

<style>
    .stepper {
        margin-top: 200px;
    }
</style>
