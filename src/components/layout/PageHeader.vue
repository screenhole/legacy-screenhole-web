<template>
    <header class="main">
        <router-link class="logo" to="/" exact>
            <img src="../../assets/img/logo.svg" alt="SCREENHOLE!">
        </router-link>

        <nav class="pages">
            <span v-if="$auth.check()">
                <router-link v-if="$auth.user()" :to="{ name: 'user-stream', params: {
                    username: $auth.user().username
                }}">
                    {{$auth.user().username}}
                </router-link>

                <a href="/" @click.prevent="logout">log out</a>
            </span>
            <span v-if="! $auth.check()">
                <router-link to="/login">log in</router-link>
            </span>

            <a href="https://www.facebook.com/groups/screenhole" target="_blank">talk</a>
            <a href="https://screenhole.net/pasquale/~9B5spw">wtf?</a>
            <a href="https://twitter.com/screenhole">twitter</a>
        </nav>
    </header>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    methods: {
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

.main {
    display: flex;
    justify-content: space-between;
    z-index: 10;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    padding: 20px;
    padding-top: 18px;

    .logo {
        display: flex;
    }

    .pages {
        display: flex;

        a {
            color: $purple;
            // font-weight: bold;
            margin-left: 50px;
            text-decoration: none;
            display: flex;

            &:hover {
              color: $bright-green;
            }
            &.router-link-active {
                color: white;
            }
        }
    }
}
</style>
