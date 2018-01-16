<template>
    <div class="grab">
        <div class="content">
            <div class="meta" v-bind:class="{'mobile': $mq.mobile}">
                <router-link class="permalink" v-if="grab.user" :to="{ name: 'user-stream', params: {
                    username: grab.user.username
                }}">
                    <avatar tag="span" :user="grab.user"></avatar>
                    <span class="user">{{grab.user.username}}</span>
                </router-link>

                <div class="actions">
                    <a class="button" href="#" @click.prevent="voiceMemo">
                        <img class="icon" src="../assets/img/telephone.svg" alt="Call Screenhole">
                        <span class="count">{{voiceMemoCount || '&nbsp;'}}</span>
                    </a>
                    <a class="button" href="#" v-if="buttonStickers && ! ownedByCurrentUser" @click.prevent="toggleStickersTray">
                        <img class="icon" src="../assets/img/eyeball.svg" alt="Stickers">
                    </a>
                    <a class="button" href="#" v-if="buttonDelete && ownedByCurrentUser" @click.prevent="deleteGrab">
                        <img class="icon" src="../assets/img/trash.svg" alt="Can it!">
                    </a>
                </div>
            </div>
            <router-link class="media" v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                username: grab.user.username,
                grab_id: grab.id
            }}">
                <div class="stickerStage" ref="stickerStage">
                    <sticker
                        v-for="(sticker, index) in stickers"
                        v-bind:key="sticker.id"
                        v-bind:sticker="sticker"
                    />
                </div>
                <img class="grab_image" :src="grab.image_public_url" v-bind:class="{'mobile': $mq.mobile}"/>
            </router-link>

            <memo
                v-if="showMemos"
                v-for="(memo, index) in memos"
                v-bind:key="memo.id"
                v-bind:memo="memo"
            />
        </div>

        <div class="stickersTray" ref="stickersTray" v-if="buttonStickers && ! ownedByCurrentUser" v-bind:class="{'mobile': $mq.mobile}">
            <div class="sticker">
                <div class="art draggable" ref="stickerChuckle" data-sticker="chuckle">
                    <div class="handle"></div>
                </div>
                <div class="price">100</div>
            </div>
        </div>
    </div>
</template>

<script>
import ActionCable from 'actioncable';

import Avatar from '@/components/Avatar';
import Memo from '@/components/Memo';
import Sticker from '@/components/Sticker';

export default {
    props: {
        'grab': {
            type: Object,
            required: true,
        },
        'show-memos': {
            'default': false,
        },
        'button-delete': {
            'default': false,
        },
        'button-stickers': {
            'default': false,
        },
        'button-call': {
            'default': false,
        },
    },

    data () {
        return {
            // 'metadata': {},
            animeStates: {
                visible: {
                    bottom: '20px',
                    opacity: 1,
                },
                offscreen: {
                    bottom: '-50px',
                    opacity: 0,
                }
            },
            'stickers': [],
            'memos': [],
        }
    },

    methods: {
        voiceMemo: function() {
            if (! this.showMemos) {
                return this.$router.push({ name: 'grab-permalink', params: {
                    username: this.grab.user.username,
                    grab_id: this.grab.id
                }})
            }

            if (! this.$auth.check()) {
                return alert("Log in to leave a voice memo!");
            }

            this.$http.post("/grabs/" + this.grab.id + '/memos', {
                memo: {
                    'variant': 'voice',
                }
            })
            .then(function(res){
                alert("Call 1-810-420-8008 and enter " + res.data.memo.calling_code);
            }.bind(this))
            .catch(function(err){
                alert(err);
            })
        },

        toggleStickersTray: function() {
            if (this.stickersTrayVisible) {
                this.$anime({
                    targets: this.$refs.stickersTray,
                    bottom: this.animeStates.offscreen.bottom,
                    opacity: this.animeStates.offscreen.opacity,
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            } else {
                this.$anime({
                    targets: this.$refs.stickersTray,
                    bottom: this.animeStates.visible.bottom,
                    opacity: this.animeStates.visible.opacity,
                    duration: 500,
                    easing: 'easeOutExpo'
                });                
            }

            this.stickersTrayVisible = ! this.stickersTrayVisible;
        },

        deleteGrab: function() {
            if (! confirm('Are you sure you want to delete this grab?')) return;

            return this.$http.delete("/grabs/" + this.grab.id)
            .then(function(){
                this.$router.push('/');
            }.bind(this))
            .catch(function(err){
                alert(err);
            })
        },

        dropSticker: function(x, y, sticker) {
            this.stickers.push({ x: x, y: y })

            console.log('sticker at:', x, y, sticker)
        },
    },

    computed: {
        voiceMemoCount: function() {
            return Object.values(this.grab.memos || []).reduce(function(count, memo) {
                return count + (memo.pending ? 0 : 1);
            }, 0)
        },

        ownedByCurrentUser: function() {
            return this.$auth.check()
                && this.grab.user
                && this.$auth.user().id == this.grab.user.id
        },
    },

    mounted(){
        this.memos = this.grab.memos;

        this.$refs.stickersTray.style.bottom = this.animeStates.offscreen.bottom;
        this.$refs.stickersTray.style.opacity = this.animeStates.offscreen.opacity;

        this.$interact('.draggable').draggable({
            inertia: true,

            allowFrom: '.handle',

            // restrict: {
            //     restriction: 'parent',
            //     endOnly: true,
            // },

            onmove: (event) => {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },

            // onend: function (event) {
            //     console.log('draggable.onend');

            //     event.target.setAttribute('data-x', 0);
            //     event.target.setAttribute('data-y', 0);
            //     event.target.style.transform = 'translate(0px, 0px)';
            // }
        });

        this.$interact('.media').dropzone({
            accept: '.draggable',

            // ondragenter: function (event) {
            //     var draggableElement = event.relatedTarget,
            //         dropzoneElement = event.target;
            // },

            // ondropmove: function (event) {
            //     console.log(event);
            // },

            ondrop: (event) => {
                var target = event.relatedTarget;

                console.log('dropzone.ondrop');

                var rect = target.getBoundingClientRect();

                // TOOD: where does magic number 10 come from?
                this.dropSticker(rect.x, rect.y - (rect.height * 0.5) - 10, target.getAttribute('data-sticker'));

                target.setAttribute('data-x', 0);
                target.setAttribute('data-y', 0);
                target.style.transform = 'translate(0px, 0px)';
            }
        });

        if (this.$refs.stickerChuckle) {
            this.$lottie.loadAnimation({
                container: this.$refs.stickerChuckle,
                path: require('../assets/animation/stickers/chuckle.json'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: "stickerChuckle",
            });
        }

        // this.$http.get(this.grab.image_public_url + ';metadata.json').then((response) => {
        //     this.metadata = response.data;
        // });

        this.$cable.subscriptions.create(
            "MemosChannel",
            {
                received: (data) => {
                    if (data.memo.grab.id != this.grab.id) return;

                    var found = false;

                    for (var i=0; i < this.memos.length; i++) {
                        if (this.memos[i].id == data.memo.id) {
                            this.$set(this.memos, i, data.memo);
                            found = true;
                            break;
                        }
                    }

                    if (! found) {
                        this.grab.memos.unshift(data.memo);
                    }
                }
            }
        );
    },

    components: {
        Avatar,
        Memo,
        Sticker,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";
.grab {
    display: flex;
    justify-content: center;
    flex-direction: row;

    & + .grab {
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .content {
        max-width: 1200px;
        flex-grow: 1;

        .permalink {
            display: flex;
            align-items: start;

            &:hover {
                .user {
                    background-color: transparent;
                    color: white;
                    border-color: white;

                    &:after {
                        border-color: transparent white transparent transparent;
                    }
                }
            }
        }

        .meta {
            margin-bottom: 10px;
            border-radius: 1000px;
            display: flex;
            align-items: center;

            .actions {
                margin-top: 5px;
                display: flex;
                align-items: center;

                .button {
                    display: flex;
                    align-items: center;
                    margin-left: 10px;

                    .icon {
                        border-radius: 0;
                        border: 0;
                        transition: all 0.2 ease;
                    }

                    .count {
                        color: $purple;
                        font-size: 18px;
                        padding: 10px 5px;
                    }

                    &:hover {
                        border: 0 !important;
                        transform: translateY(-2px);
                    }
                }
            }

            &.mobile {
                .avatar {
                    width: 35px;
                    height: 35px;
                }
            }

            .avatar {
                width: 35px;
                height: 35px;
                display: inline-block;
                margin: 0;
            }

            .user {
                padding: 5px 10px;
                border-radius: 100px;
                border: 2px solid $grey-warm;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                color: white;
                transition: all 0.2s ease;

                &:hover {
                    background-color: transparent;
                    color: white;
                    border-color: white;

                    &:after {
                        border-color: transparent white transparent transparent;
                    }
                }
            }
        }

        .media {
            display: inline-block;

            .grab_image {
                clear: both;
                display: inline-block;
                max-width: 100%;
                border-radius: 5px;
                transition: all 0.1s ease;
                max-height: 80vh;
                margin-bottom: 120px;
                border: 1px solid rgba(255,255,255,0.1);

                &.mobile {
                    max-height: 100%;
                }

                &:hover {
                    // border: 1px solid $purple;
                    box-shadow: 0px 0px 0px 5px $purple;
                }
            }

            .stickerStage {
                .sticker {
                }
            }
        }
    }

    .stickersTray {
        position: fixed;
        bottom: 20px;
        left: 400px;
        right: 20px;
        background: #000;
        border: 2px solid $purple;
        border-radius: 5px;
        display: flex;
        justify-content: space-evenly;
        z-index: $z-layer-StickerTray;

        .sticker {
            touch-action: none;

            .art {
                position: relative;
                width: 100px;
                height: 100px;

                .handle {
                    position: absolute;
                    top: 25px;
                    left: 25px;
                    height: 50px;
                    width: 50px;
                    border-radius: 100px;
                }
            }

            .price {
                color: gold;
                margin: 0 0 10px 0;
                text-align: center;
                text-indent: -5px;

                &:before {
                    content: url('../assets/img/buttcoin.svg');
                    width: 0.8em;
                    height: auto;
                    display: inline-block;
                }
            }
        }

        &.mobile {
            left: 20px;
        }
    }
}
</style>
