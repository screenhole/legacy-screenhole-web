<template>
    <div class="chomments">
        <div class="items" ref="scroller" v-chat-scroll="{always: false}">
            <infinite-loading @infinite="infiniteHandler" direction="top">
                <div slot="spinner">
                    <div id="loader"></div>
                </div>
                <p slot="no-more">fin</p>
                <p slot="no-results"></p>
            </infinite-loading>

            <div class="item" v-for="item in chomments" v-if="chomments && chomments.length">
                <div class="meta">
                    <router-link v-if="item.user" :to="{ name: 'user-stream', params: {
                        username: item.user.username
                    }}">
                        {{item.user.username}}
                    </router-link>
                </div>
                <div class="content">
                    {{item.message}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ActionCable from 'actioncable';

export default {
    data () {
        return {
            page: 1,
            chomments: [],
        };
    },

    methods: {
        infiniteHandler($state) {
            // start pagination loop
            this.$http.get("/chomments", {
                params: {
                    page: this.page,
                }
            }).then((response) => {
                var data = response.data;

                // flip it and push to top
                this.chomments = data.chomments.reverse().concat(this.chomments);

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
                    self.chomments.push(data.chomment);
                }
            }
        );
    },

    components: {
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
    width: 300px;
    height: calc(100% - 60px);
    background: #ccc;
    z-index: $z-layer-Chomments;

    .items {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        overflow-y: auto;
        max-height: 100%;

        .item {
            border-top: 1px solid blue;
            padding: 10px;
        }
    }
}
</style>