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
                    <a class="button" href="#" v-if="buttonDelete && ownedByCurrentUser" @click.prevent="deleteGrab">
                        <img class="icon" src="../assets/img/trash.svg" alt="Can it!">
                    </a>
                </div>
            </div>
            <router-link v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                username: grab.user.username,
                grab_id: grab.id
            }}">
              <img class="grab_image" :src="grab.image_public_url" v-bind:class="{'mobile': $mq.mobile}"/>
              <div class="shadow"></div>
            </router-link>

            <memo
                v-if="showMemos"
                v-for="(memo, index) in memos"
                v-bind:key="memo.id"
                v-bind:memo="memo"
            />
        </div>
    </div>
</template>

<script>
import ActionCable from 'actioncable';

import Avatar from '@/components/Avatar';
import Memo from '@/components/Memo';

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
        'button-call': {
            'default': false,
        },
    },

    data () {
        return {
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

            this.$http.post("/shots/" + this.grab.id + '/memos', {
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

        deleteGrab: function() {
            if (! confirm('Are you sure you want to delete this grab?')) return;

            return this.$http.delete("/shots/" + this.grab.id)
            .then(function(){
                this.$router.push('/');
            }.bind(this))
            .catch(function(err){
                alert(err);
            })
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

        this.$cable.subscriptions.create(
            "MemosChannel",
            {
                received: (data) => {
                    if (data.memo.shot.id != this.grab.id) return;

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

    }

    .grab_image {
        clear: both;
        display: block;
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
</style>
