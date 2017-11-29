<template>
    <header class="splitscreen-Top" v-bind:class="{'mobile': $mq.mobile}">
        <router-link class="logo" to="/" exact>
            <img src="../../assets/img/logo.svg" alt="SCREENHOLE!">
        </router-link>

        <nav class="pages" v-if="! $mq.mobile">
            <a href="/" @click.prevent="toggleChomments">chomment</a>
            <a href="https://twitter.com/screenhole">twitter</a>
            <router-link to="/wtf">wtf?</router-link>

            <template v-if="! $auth.check()">
                <a href="https://twitter.com/pasql/status/928638640368037888" target="_blank">get invite</a>

                <router-link to="/login">log in</router-link>
            </template>

            <template v-if="$auth.check()">
                <div class="dropdown" v-bind:class="{ on: showDropdown }">
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
            showDropdown: false,
        };
    },

    methods: {
        gravatar: function() {
            // gravatar requires the default URL to be public, so use staging host in dev
            var origin = (document.location.hostname == "localhost") ? "https://staging.screenhole.net" : document.location.origin;

            return 'https://www.gravatar.com/avatar/' + this.$auth.user().gravatar_hash
                + '?d=' + encodeURIComponent(origin + require('../../assets/img/default-avatar.png'));
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
        height: 120px;

        .logo {
            img {
                width: 30vw + 15;
                padding: 0;
                margin-left: 3vw;
                margin-top: 10px;
            }
        }
    }

    .logo {
        display: flex;
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
