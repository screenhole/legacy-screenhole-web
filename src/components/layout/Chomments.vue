<template>
    <div class="chomments" v-if="visible">
        <template v-if="$auth.check()">
            <form class="input" v-on:submit.prevent="sendMessage">
                <input v-model="message">
            </form>
        </template>

        <div class="items" v-bind:class="{ 'with-input': $auth.check() }" ref="scroller">
            <div class="item" v-for="item in chomments" v-if="chomments && chomments.length">
                <div class="meta">
                    <avatar :user="item.user"></avatar>
                </div>
                <div class="content">
                    {{item.message}}
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler">
                <div slot="spinner">
                    <div id="loader"></div>
                </div>
                <p slot="no-more">fin</p>
                <p slot="no-results">fin</p>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ActionCable from 'actioncable';

import Avatar from '@/components/Avatar'

export default {
    data () {
        return {
            visible: true,
            page: 1,
            message: "",
            chomments: [],
        };
    },

    methods: {
        sendMessage() {
            var message = this.message;
            this.message = "";

            this.$http.post("/chomments", {
                "chomment": { "message": message }
            }).then((response) => {

            });
        },

        infiniteHandler($state) {
            // start pagination loop
            this.$http.get("/chomments", {
                params: {
                    page: this.page,
                }
            }).then((response) => {
                var data = response.data;

                // flip it and push to top
                this.chomments = this.chomments.concat(data.chomments);

                if (data.meta.next_page) {
                    this.page = data.meta.next_page;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
    },

    mounted(){
        var self = this;

        this.cable = ActionCable.createConsumer(this.$http.defaults.baseURL.replace('http', 'ws') + '/cable');

        this.cable.subscriptions.create(
            "ChommentsChannel",
            {
                received: function(data) {
                    self.chomments.unshift(data.chomment);
                }
            }
        );
    },

    components: {
        Avatar,
        InfiniteLoading,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";    

.chomments {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    width: 300px;
    background: #000;
    color: #fff;
    z-index: $z-layer-Chomments;

    .input {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 50px;

        input {
            height: 100%;
            width: 100%;
            background: #000;
            color: #fff;
        }
    }

    .items {
        height: 100%;
        overflow-y: auto;

        &.with-input {
            padding-top: 50px;
        }

        // * { outline: 1px solid gold}

        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px;
            padding-top: 10px;
            border-top: 1px solid $grey-cool;

            .meta {
                width: 45px;
                padding-right: 10px;
                flex-shrink: 0;

                img {
                    max-width: 100%;
                    border-radius: 1000px;
                }
            }

            .content {
                flex-grow: 1;
            }
        }
    }
}
</style>