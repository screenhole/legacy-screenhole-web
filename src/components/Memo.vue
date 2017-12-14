<template>
    <div class="memo" v-if="! memo.pending">
        <avatar :user="memo.user" />

        <div class="bubble">
            <div class="message">
                <span class="username">{{memo.user.username}}:&nbsp;</span>

                {{memo.message}}
            </div>

            <audio-player :sources="audioSources" :html5="true"></audio-player>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import AudioPlayer from '@/components/AudioPlayer';

export default {
    props: {
        'memo': {
            type: Object,
            required: true,
        },
    },

    methods: {
    },

    computed: {
        audioSources: function() {
            return [ this.memo.media_public_url ]
        },

        owned_by_current_user: function() {
            return this.$auth.check()
                && this.memo.user
                && this.$auth.user().id == this.memo.user.id
        },
    },

    components: {
        Avatar,
        AudioPlayer,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";
.memo {
    display: flex;
    justify-content: left;

    margin-top: 20px;

    & + .memo {
        margin-bttom: 20px;
    }

    .avatar {
        width: 35px;
        height: 35px;
    }

    .bubble {
        margin-left: 10px;
        max-width: 80%;
        background: #6ade77;
        border-radius: 25px;
        display: flex;

        .message {
            margin: 15px 20px;
            color: #fff;
            font-size: 18px;
            align-self: center;
            text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);

            .username {
                color: #000;
                text-shadow: none;
            }
        }

        .audioPlayer {
            margin: 10px;
            width: 35px;
            height: 35px;
            align-self: flex-end;
        }
    }
}
</style>
