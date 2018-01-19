<template>
    <main id="app">
        <page-header v-if="$auth.ready() && loaded"></page-header>

        <div class="splitscreen-Container">
            <template v-if="$auth.ready() && loaded">
                <div class="splitscreen-Chomments" v-bind:class="{
                    'splitscreen-Hidden': $mq.mobile && activeTab != 'chomments',
                    'visible': ! $mq.mobile && chommentsVisible,
                    'splitscreen-Column': ! $mq.mobile,
                    'splitscreen-View': $mq.mobile,
                }">
                    <chomments></chomments>
                </div>
                <div class="splitscreen-Main" ref="middleColumn" v-on:scroll="middleColumnScroll" v-bind:class="{
                    'splitscreen-Hidden': $mq.mobile && activeTab != 'main',
                    'splitscreen-Column': ! $mq.mobile,
                    'splitscreen-View': $mq.mobile,
                }">
                    <router-view></router-view>
                </div>

            </template>

            <template v-if="$mq.mobile">
                <footer id="bottom">
                    <nav class="tabs">
                        <a class="icon" href="#" @click.prevent="activeTab = 'chomments'">
                          <img class ="stream" src="../src/assets/img/toggle-chomments.svg">
                        </a>
                        <a class="icon" href="#" @click.prevent="activeTab = 'main'">
                          <img class ="stream" src="../src/assets/img/toggle-stream.svg">
                        </a>
                    </nav>
                </footer>
            </template>

            <template v-if="! $auth.ready() || ! loaded">
                <div id="loader"></div>
            </template>
        </div>

        <div class="scrollToTop" v-bind:class="{
            'show': showScrollToTopArrow
        }" v-on:mouseover="throbOn" v-on:mouseout="throbOff">
            <a href="#" @click.prevent="jumpToTop" class="graphic"></a>
        </div>

        <mr-hole v-if="! $mq.mobile"></mr-hole>
    </main>
</template>

<script>
import { EventBus } from '@/event-bus.js';
import PageHeader from '@/components/layout/PageHeader'
import MrHole from '@/components/layout/MrHole'
import Chomments from '@/components/layout/Chomments'

export default {
    name: 'app',

    data() {
        return {
            context: 'app context',
            loaded: false,
            activeTab: 'main',
            chommentsVisible: true,
            showScrollToTopArrow: false,
            timeline: null,
        };
    },

    watch: {
        activeTab: function(now) {
            EventBus.$emit('chomments.reset');
        },
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

        middleColumnScroll() {
            const threshold = 400;
            this.showScrollToTopArrow = this.$refs.middleColumn.scrollTop > threshold;
        },

        throbOn() {
            this.timeline.add({
                'targets': this.$el.querySelector(".scrollToTop .graphic"),
                'background-position-y': '30%',
                'duration': 400,
                'easing': 'easeOutCirc',
            }).add({
                'targets': this.$el.querySelector(".scrollToTop .graphic"),
                'background-position-y': '45%',
                'duration': 400,
                'easing': 'easeOutCirc',
            });
        },

        throbOff() {
            this.timeline.pause();

            this.$anime({
                'targets': this.$el.querySelector(".scrollToTop .graphic"),
                'background-position-y': '45%',
                'duration': 400,
                'easing': 'easeOutCirc',
            });
        },

        jumpToTop() {
            this.throbOff();

            this.$anime({
                targets: this.$refs.middleColumn,
                scrollTop: 0,
                duration: 500,
                easing: 'easeOutExpo'
            });
        },
    },

    mounted() {
        var _this = this;
        setTimeout(function () {
            _this.loaded = true;
        }, 500);

        this.timeline = this.$anime.timeline({
            loop: true
        });

        EventBus.$on('scrollToTop', () => {
            this.jumpToTop();
        });

        EventBus.$on('chomments.toggle', () => {
            this.chommentsVisible = ! this.chommentsVisible;
        });
    },

    created() {
        var _this = this;
        this.$auth.ready(function () {
            console.log('ready ' + this.context);
        });
    },

    components: {
        PageHeader,
        MrHole,
        Chomments,
    }
}
</script>

<style lang="scss" scoped>
@import "~resources";

#app {
    width: 100%;
    height: 100%;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}

.scrollToTop {
    position: fixed;
    top: calc(60px + 20px);
    right: 20px;
    width: 35px;
    height: 35px;

    .graphic {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100px;
        background: 50% 45% no-repeat $purple url('./assets/img/scroll-to-top-arrow.svg');

        transition: transform 200ms ease;
        &:active {
            transform: scale(.9);
        }
    }

    transition: transform 200ms ease;
    transform: scale(0);
    &.show {
        transform: scale(1);
    }
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

    .splitscreen-View {
        overflow: auto;
        height: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;

        flex: 1;

        &.splitscreen-Hidden {
            display: none;
        }
    }

    .splitscreen-Column {
        overflow: auto;
        height: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;

        &.splitscreen-Chomments {
            width: 380px;
            margin-left: -380px;
            will-change: margin;
            transition: margin 0.3s ease;

            &.visible {
                margin-left: 0;
            }
        }

        &.splitscreen-Main {
            flex: 1;
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }
}

#bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 1%,rgba(0,0,0,0.8) 80%);
    height: 150px;

    .tabs {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .icon {
            margin-top: 110px;
            .stream {
              width: 34px;
            }
        }
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
