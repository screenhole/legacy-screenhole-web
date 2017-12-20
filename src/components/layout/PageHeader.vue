<template>
    <header class="splitscreen-Top" v-bind:class="{'mobile': $mq.mobile}">
        <div class="left" v-bind:class="{'mobile': $mq.mobile}">

          <router-link class="logo" to="/" exact>
            <img src="../../assets/img/logo.svg" alt="SCREENHOLE!">
          </router-link>

          <div class="buttcoin" v-bind:class="{'mobile': $mq.mobile}">
            <img class="icon" src="../../assets/img/buttcoin.svg" alt="buttcoin">
            <span>100</span>
          </div>

        </div>

        <template v-if="$mq.mobile">
            <nav class="overlay" v-bind:class="{ 'visible': overlayVisible }">
                <a href="/" class="close" @click.prevent="overlayVisible = ! overlayVisible">
                    <img src="../../assets/img/close.svg" alt="X">
                </a>

                <template v-if="! $auth.check()">
                    <a class="nav" href="https://twitter.com/pasql/status/928638640368037888" target="_blank">get invite</a>

                    <router-link class="nav" to="/login">log in</router-link>
                </template>

                <template v-if="$auth.check()">
                    <router-link class="nav avatar" v-if="$auth.user()" :to="{ name: 'user-stream', params: {
                        username: $auth.user().username
                    }}">
                        <img v-bind:src="this.gravatar()" alt="avatar">
                    </router-link>

                    <router-link class="nav username" v-if="$auth.user()" :to="{ name: 'user-stream', params: {
                        username: $auth.user().username
                    }}">
                        @{{$auth.user().username}}
                    </router-link>
                    <router-link class="nav" to="/settings">settings</router-link>
                    <a class="nav" href="/" @click.prevent="logout">log out</a>
                </template>

                <a class="nav" href="https://twitter.com/screenhole">twitter</a>
                <router-link class="nav" to="/wtf">manual</router-link>
            </nav>

            <nav class="pages">
                <a href="/" class="close">
                    <img src="../../assets/img/burger.svg" alt="menu" @click.prevent="overlayVisible = ! overlayVisible">
                </a>
            </nav>
        </template>

        <nav class="pages" v-if="! $mq.mobile">
            <a href="https://twitter.com/screenhole">twitter</a>
            <router-link to="/wtf">manual</router-link>

            <template v-if="! $auth.check()">
                <a href="https://twitter.com/pasql/status/928638640368037888" target="_blank">get invite</a>

                <router-link to="/login">log in</router-link>
            </template>

            <template v-if="$auth.check()">
                <div class="dropdown" v-bind:class="{ on: showDropdown }" v-shortkey="['esc']" @shortkey="dismissDropdown">
                  <ul>
                    <li>
                        <router-link v-if="$auth.user()" :to="{ name: 'user-stream', params: {
                            username: $auth.user().username
                        }}">
                            @{{$auth.user().username}}
                        </router-link>
                    </li>
                    <li><router-link to="/settings">settings</router-link></li>
                    <li><a href="/" @click.prevent="logout">log out</a></li>
                  </ul>
                </div>

                <a href="/" class="avatar" @click.prevent="showDropdown = !showDropdown">
                    <img v-bind:src="this.gravatar()" alt="avatar">
                </a>
            </template>
        </nav>
    </header>
</template>

<script>
import { EventBus } from '@/event-bus.js';

export default {
    data () {
        return {
            overlayVisible: false,
            showDropdown: false,
        };
    },

    watch: {
        '$route': function(to, from){
            this.overlayVisible = false;
            this.showDropdown = false;
        }
    },

    methods: {
        gravatar: function() {
            // gravatar requires the default URL to be public, so use staging host in dev
            var origin = (document.location.hostname == "localhost") ? "https://staging.screenhole.net" : document.location.origin;

            return 'https://www.gravatar.com/avatar/' + this.$auth.user().gravatar_hash
                + '?d=' + encodeURIComponent(origin + require('../../assets/img/default-avatar.png'));
        },

        dismissDropdown: function() {
            this.showDropdown = false;
        },

        toggleChomments: function() {
            EventBus.$emit('chomments.toggle');
        },

        logout: function() {
            this.$auth.logout({
                makeRequest: false,
                success: function () {
                },
                error: function () {
                },
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~resources";

header {
    display: flex;
    justify-content: space-between;
    background-color: #000;
    width: 100%;
    padding: 20px;
    padding-top: 18px;
    border-bottom: 1px solid $grey-warm;

    &.mobile {
        padding-left: 10px;

    }


    .left {
      display: flex;
      align-self: flex-start;
      justify-content: space-between;
      width: 100%;

      .logo {
        display: block;
        width: 200px;
      }

      .buttcoin {
        display: flex;
        height: 25px;
        color: white;

        .icon {
          width: 25px;
        }
        span {
          font-size: 16px;
          display: block;
          margin-top: 4px;
          margin-left: 5px;
          color: #ffd655;

        }
      }
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        z-index: $z-layer-Burger;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;

        &, & * {
            transition: all 200ms ease;
        }

        &.visible {
            visibility: visible;
            opacity: 1;

            .nav {
                transform: translateY(0)
            }
        }

        .close {
            position: absolute;
            right: 0;
            top: 0;
            padding: 22px;
        }

        .nav {
            display: block;
            color: #fff;
            font-size: 24px;
            padding: 1.5vh;
            margin: 1.5vh;

            transform: translateY(25px);

            &.avatar {
                margin: 0;
                padding: 0;

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                }
            }

            &.username {
                margin-top: 0;
                margin-bottom: 4vh;
                color: $purple;
            }
        }
    }

    .pages {
        display: flex;

        a {
            color: $purple;
            margin-left: 50px;
            text-decoration: none;
            margin-top: 3px;
            display: flex;

            &:hover {
              color: $bright-green;
            }
            &.router-link-active {
                color: white;
            }
        }

        .avatar  {
            margin-left: 30px;

            img {
                width: 35px;
                height: 35px;
                margin-top: -9px;
                border-radius: 1000px;
            }
        }

        .dropdown {
            z-index: $z-layer-PageHeader;
            position: absolute;
            top: 55px;
            right: 10px;
            background-color: $purple;
            border-radius: 5px;
            padding: 0;
            margin: 0;
            box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.75);

            opacity: 0;
            visibility: hidden;
            transform: translateY(-5px);

            transition: all 400ms ease;

            &.on {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            &::after {
                content: '';
                position: absolute;
                top: -8px;
                right: 20px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 7.5px 10px 7.5px;
                border-color: transparent transparent $purple transparent;
            }

            ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
                padding: 15px;
                text-align: right;

                li {
                    display: block;

                    a {
                        opacity: 0.8;
                        color: white;
                        margin: 0;
                        display: block;
                        transition: all 0.2s ease;

                        &:hover {
                            opacity: 1;
                            text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45);
                            transform: translate(0,-1px);
                        }
                    }
                }

                li + li {
                    margin-top: 1em;
                }
            }
        }
    }
}
</style>
