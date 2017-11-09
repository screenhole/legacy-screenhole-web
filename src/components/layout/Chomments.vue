<template>
    <div class="chomments">
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

        <infinite-loading @infinite="infiniteHandler">
            <div slot="spinner">
                <div id="loader"></div>
            </div>
            <p slot="no-more"></p>
        </infinite-loading>
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
.chomments {
    position: fixed;
    top: 60px;
    right: 0;
    width: 100px;
    height: 100%;
    background: #ccc;
}
</style>