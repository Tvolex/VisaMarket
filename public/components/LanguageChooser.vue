<template>

</template>

<script>
    import LanguageENG from "../lang/eng";
    import LanguageUA from "../lang/ua";
    import LanguageCZ from "../lang/cz";
    import LanguagePL from "../lang/pl";

    export default {
        name: 'app',
        data() {
            return {

            }
        },

        mounted: function () {
            this.setLanguage(this.$cookies.get('Language') || 'English');
        },

        methods: {
            setLanguage: function (lang) {
                switch (lang) {
                    case "English": this.Language = LanguageENG; break;
                    case "Українська": this.Language = LanguageUA; break;
                    case "Czeska": this.Language = LanguageCZ; break;
                    case "Polska": this.Language = LanguagePL; break;
                }

            }
        }
    }
</script>

<style>


</style>
