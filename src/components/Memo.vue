<template>
    <div class="memo" v-if="! memo.pending">
        <avatar :user="memo.user" />

        <div class="message">
            {{memo.message}}
        </div>

        <audio controls :src="memo.media_path" />
    </div>
</template>

<script>
import Avatar from '@/components/Avatar';

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
        owned_by_current_user: function() {
            return this.$auth.check()
                && this.memo.user
                && this.$auth.user().id == this.memo.user.id
        },
    },

    components: {
        Avatar,
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
        width: 50px;
        height: 50px;
    }

    .message {
        margin-left: 10px;
        max-width: 80%;
        background: #FCD674;
        border-radius: 15px;
        padding: 15px;
    }
}
</style>
