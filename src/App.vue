<template>
    <section id="app">
        <div v-if="$auth.ready() && loaded">
            <page-header></page-header>

            <router-view></router-view>
        </div>

        <div v-if="!$auth.ready() || !loaded">
            <div id="loader"></div>
        </div>

        <mr-hole></mr-hole>
    </section>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import MrHole from '@/components/layout/MrHole'

export default {
    name: 'app',

    data() {
        return {
            context: 'app context',
            loaded: false
        };
    },

    mounted() {
        var _this = this;
        setTimeout(function () {
            _this.loaded = true;
        }, 500);
    },

    created() {
        var _this = this;
        this.$auth.ready(function () {
            console.log('ready ' + this.context);
        });
    },

    methods: {
        logout() {
            this.$auth.logout({
                makeRequest: true,
                success() {
                    console.log('success ' + this.context);
                },
                error() {
                    console.log('error ' + this.context);
                }
            });
        },
    },

    components: {
        PageHeader,
        MrHole,
    }
}
</script>

<style lang="sass">
    // GLOBAL STYLES
    @import "~resources"

    @import "~normalize.css"

    *, *:after, *:before
        box-sizing: border-box;

    a
        text-decoration: none;

    html, body
        background-color: #000;
        font-family: Poppins, sans-serif;

    #loader
        background: center no-repeat url("assets/img/loader.gif")
        width: 100%;
        min-height: 50px;

    .flash, .flash pre
        color: #fff;
        position: fixed;
        width: 100%;
        margin: 0;
        padding: 25px;
        top: 60px;
        left: 0;
        background-color: $purple;
        animation-name: slideup;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
</style>
