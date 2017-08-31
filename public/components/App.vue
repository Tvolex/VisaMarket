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


        </main>
        <main class="dark application--dark">
            <v-btn @click.native="refreshItems">Refresh</v-btn>
        </main>
        <main class="application application--dark cards" id="cards">
            <v-container dark fluid>
                <v-layout row wrap main-items>
                    <v-dialog v-model="readMore">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Read more</span>
                            </v-card-title>
                            <v-card-text>
                                {{description}}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn class="green--text darken-1" flat @click.native="readMore = false">Close</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-flex xs12 sm6 order-sm3 md3 order-md4   v-for="item in items" tag="v-card" v-bind:key="item._id">
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
                                <v-btn flat class="orange--text"  v-bind:id="item._id" @click.native.stop="showReadMore($event); ">Read more</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 offset-sm3 md6 offset-md3 lg6 offset-lg3 v-if="noItems">
                        <v-card>
                            <v-card-text class="text-lg-center">
                                No data available
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <main class="no-data-available" >

        </main>

        <v-footer></v-footer>
    </v-app>
</template>

<script>
    import animate from 'animate.css'
    //import 'vue-fullpage/vue-fullpage.css'
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
                readMore: false,
                noItems: false,
                description: '',
            }
        },

        computed: {
            items() {
                const items = this.$store.getters.items;

                this.noItems = items.length < 1;

                return items;
            }
        },

        mounted: function () {
            this.$store.dispatch('items');
        },

        methods: {

            refreshItems() {
                this.$store.dispatch({type: "items"});
            },

            findItemById(id) {
                const arr = this.items;

                for (let i = 0; i < arr.length; i++ ) {
                    if (arr[i]._id === id) {
                        return arr[i].description;
                    }
                }
            },

            showReadMore(el) {
                const id = el.currentTarget.id;

                console.log(id)
                this.description = this.findItemById(id);
                this.readMore = true;
            }

        },

        watch: {
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

    .cards {
        padding: 10px;
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
        background-color: #303030;;
    }
</style>
