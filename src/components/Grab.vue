<template>
    <div class="grab" v-bind:class="{'with-tray': stickersTrayVisible }">
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
                        <img class="icon" src="../assets/img/sticker.svg" alt="Stickers">
                    </a>
                    <a class="button" href="#" v-if="buttonDelete && ownedByCurrentUser" @click.prevent="deleteGrab">
                        <img class="icon" src="../assets/img/trash.svg" alt="Can it!">
                    </a>
                </div>
            </div>
            <router-link class="media dropzone" v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                username: grab.user.username,
                grab_id: grab.id
            }}">
                <sticker
                    v-for="(sticker, index) in stickers"
                    v-bind:key="sticker.id"
                    v-bind:sticker="sticker"
                />

                <img class="grab_image" :src="grab.image_public_url" v-bind:class="{'mobile': $mq.mobile}"/>
            </router-link>

            <memo
                v-if="showMemos"
                v-for="(memo, index) in memos"
                v-bind:key="memo.id"
                v-bind:memo="memo"
            />
        </div>

        <div class="stickersTray" ref="stickersTray" touch-action="none" v-if="buttonStickers && ! ownedByCurrentUser" v-bind:class="{'mobile': $mq.mobile}">
            <div class="sticker">
                <div class="art draggable" ref="stickerChuckle" data-sticker="chuckle">
                    <div class="handle"></div>
                </div>
                <div class="spacer"></div>
                <div class="price">100</div>
            </div>

            <div class="sticker">
                <div class="art draggable" ref="stickerConfuzzle" data-sticker="confuzzle">
                    <div class="handle"></div>
                </div>
                <div class="spacer"></div>
                <div class="price">100</div>
            </div>

            <div class="sticker">
                <div class="art draggable" ref="stickerPablo" data-sticker="pablo">
                    <div class="handle"></div>
                </div>
                <div class="spacer"></div>
                <div class="price">200</div>
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
            stickersTrayVisible: false,

            drag: {
                running: false,
                sticker: null,
                target: null,
                rect: {},
                origin: {
                    x: 0,
                    y: 0,
                },
            },

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
            'stickers': [
                { id: '1', name: 'chuckle', x: 10, y: 10 },
                { id: '2', name: 'confuzzle', x: 20, y: 20 },
            ],
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

        onPointerDown: function(event) {
            if (! event.target.classList.contains("handle")) return;
            if (! event.target.parentNode.classList.contains("draggable")) return;

            this.drag.running = true;
            this.drag.target = event.target.parentNode;
            this.drag.rect = this.drag.target.getBoundingClientRect();
            this.drag.sticker = this.drag.target.getAttribute('data-sticker');
            this.drag.origin = {
                x: event.clientX,
                y: event.clientY,
            };

            this.drag.target.classList.add("dragRunning");
        },

        onPointerUp: function(event) {
            if (! this.drag.running) return;

            // TODO: move / make more useful
            function Rect (x, y, w, h) {
                this.x = x;
                this.y = y;
                this.width = w;
                this.height = h;

                this.contains = function (x, y) {
                    return this.x <= x && x <= this.x + this.width &&
                           this.y <= y && y <= this.y + this.height;
                }

                this.toPercent = function(x, y) {
                    return {
                        x: ((x - this.x) / this.width) * 100,
                        y: ((y - this.y) / this.height) * 100,
                    };
                }
            }

            var dropzone = this.$el.querySelector(".dropzone");
            var rect = dropzone.getBoundingClientRect();

            if (! rect.width) rect.width = dropzone.offsetWidth;
            if (! rect.height) rect.height = dropzone.offsetHeight;

            var dropzone = new Rect(rect.x, rect.y, rect.width, rect.height);

            alert(event.clientX + ' ' + event.clientY + ' ' + rect.x + ' ' + rect.y + ' ' + rect.width + ' ' + rect.height)

            var inDropzone = dropzone.contains(event.clientX, event.clientY);

            alert(inDropzone)

            // TODO: check for drops on tray
            if (inDropzone) {
                var percent = dropzone.toPercent(event.clientX - (this.drag.rect.width * 0.5), event.clientY - (this.drag.rect.height * 0.5));

                this.dropSticker(percent.x, percent.y, this.drag.sticker);

                this.drag.target.style.left = 0;
                this.drag.target.style.top = 0;
            } else {
                this.$anime({
                    targets: this.drag.target,
                    top: 0,
                    left: 0,
                    duration: 250,
                    easing: 'easeOutExpo'
                });
            }

            this.drag.target.classList.remove("dragRunning");

            this.drag.running = false;
        },

        onPointerMove: function(event) {
            if (! this.drag.running) return;

            this.drag.target.style.left = (event.clientX - this.drag.origin.x) + 'px';
            this.drag.target.style.top = (event.clientY - this.drag.origin.y) + 'px';
        },

        dropSticker: function(x, y, sticker) {
            alert('dropSticker: ' + x + ', ' + y + ' ' + sticker)

            this.stickers.push({ name: sticker, x: x, y: y });
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

    beforeDestroy: function() {
        if (this.$refs.stickersTray) {
            document.removeEventListener('pointerdown', this.onPointerDown);
            document.removeEventListener('pointerup', this.onPointerUp);
            document.removeEventListener('pointermove', this.onPointerMove);
        }
    },

    mounted: function(){
        this.memos = this.grab.memos;

        if (this.$refs.stickersTray) {
            this.$refs.stickersTray.style.bottom = this.animeStates.offscreen.bottom;
            this.$refs.stickersTray.style.opacity = this.animeStates.offscreen.opacity;

            // TODO: only attach once per page
            document.addEventListener('pointerdown', this.onPointerDown);
            document.addEventListener('pointerup', this.onPointerUp);
            document.addEventListener('pointermove', this.onPointerMove);
        }

        // TODO: make dynamic

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

        if (this.$refs.stickerConfuzzle) {
            this.$lottie.loadAnimation({
                container: this.$refs.stickerConfuzzle,
                path: require('../assets/animation/stickers/confuzzle.json'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: "stickerConfuzzle",
            });
        }

        if (this.$refs.stickerPablo) {
            this.$lottie.loadAnimation({
                container: this.$refs.stickerPablo,
                path: require('../assets/animation/stickers/pablo.json'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: "stickerPablo",
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

    &.with-tray {
        padding-bottom: 180px;
    }

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
            position: relative;

            .grab_image {
                clear: both;
                display: inline-block;
                max-width: 100%;
                border-radius: 5px;
                transition: all 0.1s ease;
                max-height: 80vh;
                border: 1px solid rgba(255,255,255,0.1);

                &.mobile {
                    max-height: 100%;
                }

                &:hover {
                    // border: 1px solid $purple;
                    box-shadow: 0px 0px 0px 5px $purple;
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
        touch-action: none;

        .sticker {
            position: relative;

            .spacer {
                height: 100px;
                width: 100px;
            }

            .art {
                position: absolute;
                top: 0;
                left: 0;
                width: 100px;
                height: 100px;
                transition: transform 0.2s ease;

                &.dragRunning {
                    transform: scale(1.3);
                }

                .handle {
                    position: absolute;
                    top: 25px;
                    left: 25px;
                    height: 50px;
                    width: 50px;
                    border-radius: 100px;
                    // box-shadow: 0px 0px 0px 5px gold;
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
