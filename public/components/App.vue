<template>
  <v-app>
      <background>

      </background>
      <my-header></my-header>
      <main>
          <v-container fluid>
              <v-container fluid v-bind="{ [`grid-list-${size}`]: true }">
                  <v-flex xs12 sm6 offset-sm3>
                      <div class="chooseCountry">

                      </div>
                  </v-flex>
              </v-container>
          </v-container>
      </main>
      <v-footer></v-footer>
  </v-app>

</template>

<script>
    import header from './header.vue';
    import footer from './footer.vue'
    export default {
        components: {
            "my-header": header,
            "my-footer": footer
        },
        data: () => {
            return {

            }
        },
        mounted: function () {
            //this.$toaster.info(this.msg);
        }
    }
</script>

<style lang="scss">
    .layout {
        position: absolute;

        background-image: url("https://images.unsplash.com/photo-1497197246330-b9cafd652212?auto=compress?w=1920&h=1080");
        height: 1080px;
        width: 1920px;
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
</style>
