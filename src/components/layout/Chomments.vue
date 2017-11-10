<template>
    <div class="chomments" ref="scroller">
        <infinite-loading @infinite="infiniteHandler" direction="top">
            <div slot="spinner">
                <div id="loader"></div>
            </div>
            <p slot="no-more">fin</p>
            <p slot="no-results"></p>
        </infinite-loading>

        <div class="message" v-for="line in chomments" v-if="chomments && chomments.length">
            <div class="meta">
                <router-link v-if="line.user" :to="{ name: 'user-stream', params: {
                    username: line.user.username
                }}">
                    {{line.user.username}}
                </router-link>
            </div>
            <div class="content">
                {{line.message}}
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
            height: 0,
            chomments: [],
        };
    },

    watch: {
        height: function(curr, old) {
            this.$refs.scroller.scrollTop = curr - old;
        }
    },

    methods: {
        infiniteHandler($state) {
            this.height = this.$refs.scroller.scrollHeight;

            // start pagination loop
            this.$http.get("/chomments", {
                params: {
                    page: this.page,
                }
            }).then((response) => {
                var data = response.data;

                // flip it and push to top
                this.chomments = data.chomments.reverse().concat(this.chomments);

                // if (this.$refs.scroller.scrollTop < this.$refs.scroller.scrollHeight) {
                //     this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight;
                // }

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
    overflow: auto;
}
</style>