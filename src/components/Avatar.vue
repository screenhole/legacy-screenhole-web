<template>
    <router-link class="avatar" v-bind:class="{'mobile': $mq.mobile}" v-if="user" :to="{ name: 'user-stream', params: {
        username: user.username
    }}">
        <img v-bind:src="this.gravatar()" v-bind:alt="user.username">
    </router-link>
</template>

<script>
export default {
    props: [ 'user' ],

    methods: {
        gravatar: function() {
            // gravatar requires the default URL to be public, so use staging host in dev
            var origin = (document.location.hostname == "localhost") ? "https://staging.screenhole.net" : document.location.origin;

            return 'https://www.gravatar.com/avatar/' + this.user.gravatar_hash
                + '?d=' + encodeURIComponent(origin + require('../assets/img/default-avatar.png'));
        },
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";

.avatar  {
    width: 35px;
    height: 35px;

    &.mobile {
        width: 10vw;
        height: 10vw;

        img {
            border-radius: 1000px;
        }
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 35px;
    }
}
</style>
