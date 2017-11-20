<template>
    <div class="stream">
        <grab
            v-for="(grab, index) in grabs"
            v-bind:key="grab.id"
            v-bind:grab="grab"
            v-on:remove="grabs.splice(index, 1)"
        />

        <infinite-loading @infinite="infiniteHandler">
            <div slot="spinner">
                <div id="loader"></div>
            </div>
            <p slot="no-more">fin</p>
            <p slot="no-results"></p>
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import Grab from '@/components/Grab';

export default {
    data () {
        return {
            user: '',
            page: 1,
            grabs: [],
        };
    },

    methods: {
        infiniteHandler($state) {
            // load user
            if (! this.user) {
                this.$http.get("/users/" + this.$route.params.username).then((response) => {
                    this.user = response.data.user;
                    $state.loaded();
                });
                return;
            }

            // start pagination loop
            this.$http.get("/users/" + this.user.id + "/shots", {
                params: {
                    page: this.page,
                }
            }).then((response) => {
                var data = response.data;

                this.grabs = this.grabs.concat(data.shots);

                if (data.meta.next_page) {
                    this.page = data.meta.next_page;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
    },

    components: {
        InfiniteLoading,

        Grab,
    },
}
</script>

<style lang="scss" scoped>
.stream {
    display: flex;
    padding: 50px 50px 100px 50px;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
}
</style>