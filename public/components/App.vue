<template>
    <v-app dark>
        <div id="toolbar">
            <my-header></my-header>

        </div>
        <hr>
        <main class="hidden-xs-and-up main-stepper application--dark">
            <v-container dark >
                <stepper></stepper>

            </v-container>

            <v-btn class="button-arrow_down" >
                <v-icon v-on:click.stop="toDown">arrow_downward</v-icon>
            </v-btn>

        </main>
        <main class="application application--dark cards">
            <v-container dark fluid>
                <v-layout row wrap main-items>
                    <v-flex xs12 sm6 md3 order-md4 order-sm2 v-for="item in items" tag="v-card" v-bind:key="item.id">
                        <v-card dark class=" item-card">
                            <v-card-media
                                    class="white--text"
                                    height="200px"
                                    v-bind:src="item.image"
                            >
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
                                <v-dialog v-model="readMore">
                                    <v-btn flat class="orange--text" slot="activator" v-on:click="setDescriptionForPopUp(item.description)">Read more</v-btn>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Read more</span>
                                        </v-card-title>
                                        <v-card-text>
                                            {{description}}
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn class="green--text darken-1" flat="flat" @click.native="readMore = false">Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>

        <v-footer></v-footer>
    </v-app>
</template>

<script>
    import animate from 'animate.css'
    import 'vue-fullpage/vue-fullpage.css'
    import header from './header.vue';
    import footer from './footer.vue'
    import stepper from './Stepper.vue'
    import resize from "vue-resize-directive"
    import VCardMedia from "vuetify/src/components/cards/VCardMedia";
    import icon from "vue-icon";

    export default {
        directives: {
            resize,
            icon,
        },
        components: {
            VCardMedia,
            "my-header": header,
            "my-footer": footer,
            "stepper": stepper,

        },
        data: () => {
            return {
//                items: [
//                    {title: "Dubai", description: "OAE, Dubai", price: 8500 ,image: "https://images.unsplash.com/photo-1461664054097-e319867377a0?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Paris", description: "France, Paris", price: 6350 ,image: "https://images.unsplash.com/photo-1492016025243-5c580de436d8?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "New York", description: "USA, New York", price: 5500 ,image: "https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Las Setas De Sevilla", description: "Spain, Sevilla", price: 5500 ,image: "https://images.unsplash.com/photo-1482236195433-7e0de3abde07?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Metropolitan City of Rome ", description: "Italy, Rome", price: 4590 ,image: "https://images.unsplash.com/photo-1483967401479-d276121525b1?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Barcelona", description: "Spain, Barcelona", price: 5940 ,image: "https://images.unsplash.com/photo-1477039256673-13f6fc80dde7?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Venice", description: "Italy, Venice", price: 4960 ,image: "https://images.unsplash.com/photo-1480550476554-00112fe313c3?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                    {title: "Capri", description: "Italy, Capri", price: 7460 ,image: "https://images.unsplash.com/photo-1447723432521-2fabf0a7d064?dpr=1&auto=format&fit=crop&w=720&h=640&q=80&cs=tinysrgb&crop="},
//                ],
                images: {
                    Paris: `https://images.unsplash.com/photo-1501977953290-80b1e3c3d316`,
                },
                readMore: false,
                description: '',
                offsetTop: 0,
                windowSize: {
                    width: window.innerWidth ,
                    height: window.innerHeight + 100,
                },


            }
        },

        computed: {
            items() {
                return this.$store.getters.items;
            }
        },

        mounted: function () {
            this.$store.dispatch('items');
        },

        methods: {

            updateSize: function () {
                this.windowSize.width = window.innerWidth;
                this.windowSize.height = window.innerHeight;
            },

            getImageSource: function (name) {
                let imgOptions = `?auto=compress?w=${this.windowSize.width}&h=${this.windowSize.height}`;
                let images = [this.images.Paris];

                switch (name) {
                    default:
                        return images[0] + imgOptions;
                        break;
                    case "Paris" :
                        return images[0] + imgOptions;
                    case  "NewYork" :
                        return images[1] + imgOptions;
                }
            },
            toDown: function () {
                this.offsetTop = window.pageYOffset;
            },

            setDescriptionForPopUp(description) {
                this.description = description;
            },

        },

        watch: {
            width: function (value) {

            },
            height: function (value) {

            }
        }

    }
</script>

<style lang="scss">
    .button-arrow_down{
        margin-top: -30%;
    }
    .span-item-title {
        padding-left: 10px;
    }
    .main-stepper {
        margin-top: 8vh;
    }
    .SelectCountry {
        width: 50%;
    }
    .toolbar {
        z-index: 2;
    }
    .item-card {
        margin-top: 10px;
    }
    .card__media__background {
        //margin-top: -65px;
        background-repeat: no-repeat;
        -moz-background-size: 50%;
        -webkit-background-size: 50%;
        -o-background-size: 50%;
        background-size: 50%;
    }
    #background {
        position: absolute;

        //background-image: url("https://images.unsplash.com/photo-1497197246330-b9cafd652212?auto=compress?w=1920&h=1080");

    }

    .container {
        padding: 0;
        //margin-top: -65px;
    }
    .chooseCountry {
        position: absolute;
        margin-top: 15%;
        height: 300px;
        width: 600px;
        border: solid black 1px;
        -webkit-box-shadow: 0 10px 6px -6px #777;
        -moz-box-shadow: 0 10px 6px -6px #777;
        box-shadow: 0 10px 6px -6px #777;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    .main-items {
        background-color: darkgrey;;
    }
</style>
