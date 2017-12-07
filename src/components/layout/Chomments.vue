<template>
    <aside>
        <form class="input" v-on:submit.prevent="sendMessage" v-if="$auth.check()">
            <input class="message" placeholder="Type some chomments" v-model="message" ref="messageInput">
        </form>

        <div class="items">
            <div class="item" :class="item.variant" v-for="item in chomments" v-if="chomments && chomments.length">
                <div class="meta">
                    <avatar :user="item.user"></avatar>
                </div>
                <div class="content">
                    <router-link class="username" v-if="item.user" :to="{ name: 'user-stream', params: {
                            username: item.user.username
                        }}">
                        {{item.user.username}}
                    </router-link>

                    <br>

                    <template v-if="item.variant == 'voice_memo'">
                        &ldquo;{{item.message}}&rdquo;
                    </template>
                    <template v-else>
                        {{item.message}}
                    </template>
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                <div slot="spinner">
                    <div id="loader"></div>
                </div>
                <p slot="no-more">fin</p>
                <p slot="no-results">fin</p>
            </infinite-loading>
        </div>
    </aside>
</template>

<script>
import { EventBus } from '@/event-bus.js';
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
        this.$cable.subscriptions.create(
            "ChommentsChannel",
            {
                received: (data) => {
                    this.chomments.unshift(data.chomment);
                }
            }
        );

        EventBus.$on('chomments.reset', () => {
            this.chomments = [];
            this.page = 1;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });

        EventBus.$on('chomments.toggle', () => {
            this.visible = ! this.visible;

            if (this.$refs.messageInput) {
                if (this.visible) {
                    this.$refs.messageInput.focus();
                } else {
                    this.$refs.messageInput.blur();
                }
            }
        });
    },

    components: {
        Avatar,
        InfiniteLoading,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";

aside {
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: column;

    background: #000;
    border-right: 1px solid $grey-warm;
    color: #fff;
    padding: 10px;

    .input {
        height: 50px;
        margin-bottom: 10px;

        .message {
            height: 100%;
            width: 100%;
            color: #fff;
            border: 0;
            border-bottom: 1px solid #222;
            padding: 5px 15px;
            background-color: black;

            // fix for -webkit-overflow-scrolling making inputs disappear on mobile
            transform: translateZ(0px);

            &:focus {
              outline: none;
              background-color: #111;
            }
        }
    }

    .items {
        max-width: 100%;

        &::-webkit-scrollbar {
            display: none;
        }

        .item {
            display: flex;
            flex-direction: row;
            align-items: top;
            margin: 10px;
            padding: 10px 0;
            color: #868091;
            font-size: 15px;
            line-height: 20px;
            max-width: 100%;

            &:first-child {
                padding-top: 0;
            }

            .meta {
                width: 45px;
                padding-right: 10px;
                flex-shrink: 0;

                .avatar {
                    display: block;
                    width: 40px;
                    height: 40px;
                }
            }

            &.voice_memo {
                .avatar {
                    position: relative;

                    &:after {
                        position: absolute;
                        left: -5px;
                        bottom: -5px;
                        background: $purple;
                        width: 20px;
                        height: 20px;
                        content: "m";
                        color: #fff;
                        font-size: 10px;
                        text-align: center;
                        border-radius: 5px;
                    }
                }
            }

            .content {
                flex-grow: 1;
                max-width: calc(100% - 45px);
                word-wrap: break-word;

                .username {
                    color: #ccc;
                    // padding-bottom: 0.5em;
                    display: inline-block;
                    transition: all 0.2s ease;
                    border-bottom: 1px solid rgba(0,0,0,0);

                    &:hover {
                        color: white;
                        border-bottom: 1px solid $purple;
                    }
                }
            }
        }
    }
}
</style>
