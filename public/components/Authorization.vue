<template>
    <div>
        <div id="toolbar">
            <my-header></my-header>
        </div>
        <div>
            <title>{{title}}</title>
            <v-layout row-sm column child-flex-sm>
                <v-card dark class="primary ma-1">
                    <v-card-text>
                        {{msg}}
                    </v-card-text>
                </v-card>

            </v-layout>
        </div>
    </div>

</template>

<script>
    import header from './header.vue'

    export default {
        components: {
            "my-header": header,
        },
        name: 'Authorization',
        data() {
            return {
                title: "Authorization",
                msg: "Authorization on Visa Market"
            }
        }
    }
</script>

<style lang="scss">


</style>
