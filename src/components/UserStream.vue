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
                </router-link>
            </div>
        </div>

        <infinite-loading @infinite="infiniteHandler">
            <div slot="spinner">
                loading...
            </div>
            <p slot="no-more"></p>
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

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
    },
}
</script>

<style lang="scss" scoped>
.stream {
    display: flex;
    padding: 150px 100px 100px 0;
    justify-content: center;
    flex-direction: column;

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
            }
        }

        .content {
            max-width: 1000px;
            flex-grow: 1;
        }

        img {
            display: inline-block;
            max-width: 100%;
            border-radius: 3px;
            box-shadow: 0px 0px 50px rgba(0,0,0,0.8);
        }
    }
}
</style>