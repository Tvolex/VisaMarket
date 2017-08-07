<template>
    <div class="stepper grey darken-3">
        <v-stepper v-model="e1" dark class="mt-3 grey darken-3">
            <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">Виберіть тип візи</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">Виберіть Країну</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Виберіть термін</v-stepper-step>
            </v-stepper-header>
            <v-stepper-content  step="1">
                <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px">
                    <template>
                        <v-card class="secondary elevation-0" fill-height>
                            <v-card-text>
                                <v-container fluid>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <v-subheader class="grey--text text--lighten-1" v-text="'Виберіть тип візи'"></v-subheader>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-select
                                                    v-bind:items="typeItems"
                                                    v-model="typeSelect"
                                                    label="Тип"
                                                    dark
                                                    item-value="text"
                                            ></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-text>{{lang.WhatIsVisa}}</v-card-text>
                        </v-card>
                    </template>
                </v-card>
                <v-btn primary @click.native="e1 = 2">Далі</v-btn>
                <v-btn flat dark>Назад</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
                <v-btn primary @click.native="e1 = 3">Далі</v-btn>
                <v-btn flat dark>Назад</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card class="grey lighten-1 z-depth-1 mb-5" height="200px"></v-card>
                <v-btn primary @click.native="e1 = 1">Далі</v-btn>
                <v-btn flat dark>Назад</v-btn>
            </v-stepper-content>
        </v-stepper>
    </div>
</template>

<script>
    import langENG from "../lang/eng";
    import langUA from "../lang/ua";
    import langCZ from "../lang/cz";
    import langPL from "../lang/pl";

    export default {
        name: 'app',
        data() {
            return {
                e1: 0,
                lang: this.getLang(),
                typeSelect: null,
                typeItems: [
                    {text: "Робоча віза"},
                    {text: "Туристична віза"}
                ],
            }
        },

        methods: {


        }
    }
</script>

<style>
    .stepper {
        margin-top: 200px;
    }
</style>
