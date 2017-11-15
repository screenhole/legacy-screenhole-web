<template>
    <div class="stream">
        <div class="grab" v-for="grab in grabs" v-if="grabs && grabs.length">
            <div class="content">
                <div class="meta">
                    <router-link v-if="grab.user" :to="{ name: 'user-stream', params: {
                        username: grab.user.username
                        }}">
                        {{grab.user.username}}
                    </router-link>
                </div>
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
            <p slot="no-more">fin</p>
            <p slot="no-results"></p>
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
@import "~resources";
.stream {
    display: flex;
    padding: 150px 50px 100px 50px;
    justify-content: center;
    flex-direction: column;
    background-color: black;
    margin: 0 auto;

    .grab {
        display: flex;
        justify-content: center;
        flex-direction: row;
        padding-bottom: 100px;

        .meta {

            a {
                color: $purple;
                padding-bottom: 20px;
                display: inline-block;
                transition: all 0.2s ease;

                &:hover{
                    color: white;
                }
            }

        }

        .content {
            max-width: 1200px;
            flex-grow: 1;
            position: relative;
        }

        img {
            display: inline-block;
            max-width: 100%;
            border-radius: 5px;
            transition: all 0.2s ease;
            max-height: 80vh;
            border: 1px solid rgba(255,255,255,0.1);

            &:hover {
                transform: scale(1.01);
            }

            &:active {
                transform: scale(0.98);
            }
        }
    }
}
</style>
