<template>
    <div class="stream">
        <div class="grab" v-for="grab in grabs" v-if="grabs && grabs.length">
            <div class="meta">
                <router-link v-if="grab.user" :to="{ name: 'user-stream', params: {
                    username: grab.user.username
                }}">
                    {{grab.user.username}}
                </router-link>
            </div>
            <div class="content">
                <router-link v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                    username: grab.user.username,
                    grab_id: grab.id
                }}">
                  <img :src="grab.image_public_url" />
                  <div class="shadow"></div>
                </router-link>
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
            grabs: []
        };
    },
    methods: {
        infiniteHandler($state) {
            this.$http.get("/shots", {
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
    mounted(){
        var self = this;

        this.cable = ActionCable.createConsumer(this.$http.defaults.baseURL.replace('http', 'ws') + '/cable');

        this.cable.subscriptions.create(
            "ShotsChannel",
            {
                received: function(data) {
                    self.grabs.unshift(data.shot);
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
.stream {
    display: flex;
    padding: 150px 100px 100px 0;
    justify-content: center;
    flex-direction: column;
    background-color: black;

    .grab {
        display: flex;
        justify-content: center;
        flex-direction: row;
        padding-bottom: 100px;

        .meta {
            width: 175px;
            padding-right: 25px;
            color: #00dc76;
            text-align: right;
            flex-shrink: 0;

            a {
                color: inherit;
                text-shadow: -1px 1px #6A3FEE;
                display: block;
                transition: all 0.2s ease;

                &:hover {
                    transform: translate(0,-2px) scale(1.1);
                    color: white;
                    text-shadow: -1px 3px #6A3FEE;
                }
            }


        }

        .content {
            max-width: 1000px;
            flex-grow: 1;
            position: relative;
        }

        img {
            display: inline-block;
            max-width: 100%;
            border-radius: 5px;
            transition: all 0.2s ease;

            &:hover {
                transform: scale(1.01);
            }

            &:active {
                transform: scale(0.98);
            }
        }
        //todo: make shading the same width as img
        // .shadow {
        //     position: absolute;
        //     width: 100%;
        //     height: 100%;
        //     box-shadow: inset 1px 1px 1px 0 rgba(255,255,255,0.1);
        //     border-radius: 5px;
        //     top: 0;
        //     left: 0;
        // }
    }
}
</style>
