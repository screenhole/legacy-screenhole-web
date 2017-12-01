<template>
    <div class="stream" v-bind:class="{'mobile': $mq.mobile}">
        <grab
            v-for="(grab, index) in grabs"
            v-bind:key="grab.id"
            v-bind:grab="grab"
            v-on:remove="grabs.splice(index, 1)"
        />

        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
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
import ActionCable from 'actioncable';

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
            // load user, if first pass
            if (! this.user) {
                this.$http.get("/users/" + this.$route.params.username).then((response) => {
                    this.user = response.data.user;
                    $state.loaded();
                }).catch(function(response){
                    console.log('api error', response)
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

    beforeRouteUpdate(to, from, next) {
        // blow away old data
        this.user = '';
        this.page = 1;
        this.grabs = [];

        // fetch the new user
        this.$http.get("/users/" + to.params.username).then((response) => {
            // store user, refresh infinite loader
            this.user = response.data.user;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            next();
        }).catch(function(response){
            console.log('api error', response)
        });
    },
    
    created(){
        // not rerun when going between same components

        this.cable = ActionCable.createConsumer(this.$http.defaults.baseURL.replace('http', 'ws') + '/cable');

        this.cable.subscriptions.create(
            "ShotsChannel",
            {
                received: function(data) {
                    if (data.shot.user.id == this.user.id) {
                        this.grabs.unshift(data.shot);
                    }
                }.bind(this)
            }
        );
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
    padding: 0 50px 100px 50px;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;

    &.mobile {
        padding: 25px 5px 100px 5px;
    }
}
</style>