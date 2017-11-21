<template>
    <main id="app">
        <page-header v-if="$auth.ready() && loaded"></page-header>

        <div class="splitscreen-Container">
            <template v-if="$auth.ready() && loaded">
                <chomments></chomments>
                <div class="splitscreen-Column splitscreen-Middle" ref="middleColumn">
                    <router-view></router-view>
                </div>
            </template>

            <template v-if="! $auth.ready() || ! loaded">
                <div id="loader"></div>
            </template>
        </div>

        <mr-hole></mr-hole>
    </main>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import MrHole from '@/components/layout/MrHole'
import Chomments from '@/components/layout/Chomments'

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
        Chomments,
    }
}
</script>

<style lang="scss" scoped>
#app {
    width: 100%;
    height: 100%;
}

.splitscreen-Top {
    display: flex;
    height: 60px;
}

.splitscreen-Container {
    display: flex;
    overflow: hidden;
    height: calc(100vh - 60px);
    position: relative;
    width: 100%;
    backface-visibility: hidden;
    will-change: overflow;
}

.splitscreen-Column {
    overflow: auto;
    height: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;

    &.splitscreen-Middle {
        flex: 1;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>

<style lang="sass">
    // GLOBAL STYLES
    @import "~resources"

    @import "~normalize.css"

    *, *:after, *:before
        box-sizing: border-box;

    a
        text-decoration: none;

    html, body
        height: 100%;
        background-color: #000;
        font-family: Poppins, sans-serif;

    #loader
        background: center no-repeat url("assets/img/loader.gif")
        width: 100%;
        min-height: 50px;
        max-height: 100%;

    .form
        &.centered
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100%;

            .center
                max-width: 50%;
                padding-bottom: 20vh

        .title
            color: white;
            margin-bottom: 25px;
            font-size: 50px;
            font-weight: bold;

        .error
            padding: 10px 0 0 0;
            color: $grey-cool;

        .input
            width: 300px;
            display: block;
            height: 50px;
            padding: 0;
            font-size: 25px;
            border: 0;
            border-bottom: 2px solid $grey-cool;
            background-color: transparent;
            transition: all 0.2s ease;

            &::placeholder
                color: $grey-cool;

            color: #fff;
            &:focus
                color: #fff;
                border-color: #fff;
                outline: none;

        .button
            width: 300px;
            height: 50px;
            margin-top: 25px;
            padding: 0;
            border: 0;
            background: center no-repeat transparent url("./assets/img/form-button.svg");
            background-size: 300px 50px;
            color: $purple;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.2s ease;

            &:active
                transform: scale(0.95) translate(0, 2px);
                outline: none;

            &:focus
                outline: none;

    .flash, .flash pre
        color: #fff;
        position: fixed;
        width: 100%;
        margin: 0;
        padding: 25px;
        top: 60px;
        left: 0;
        z-index: $z-layer-Flash;
        background-color: $purple;
</style>