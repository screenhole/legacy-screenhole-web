<template>
    <grab
        :key="grab.id"
        :grab="grab"
        :class="{'mobile': $mq.mobile}"
        :show-voice-memos="true"
        :show-sticker-memos="true"
        :button-delete="true"
        :button-report="true"
        :button-block="true"
    />
</template>

<script>
import Grab from '@/components/Grab';

export default {
    data: function () {
        return {
            grab: {}
        };
    },

    methods: {
        fetchData(grab_id) {
            // TODO: validate that the user in the route is correct, but allow "grab" still
            return this.$http.get("/grabs/" + grab_id).then((response) => {
                this.grab = response.data.grab;
            }).catch((err) => {
                this.$router.push('/');
            });
        }
    },

    beforeRouteUpdate(to, from, next) {
        // reset
        this.grab = {};

        // reload
        this.fetchData(to.params.grab_id).then(() => {
            next();
        });
    },

    created(){
        this.fetchData(this.$route.params.grab_id);
    },

    components: {
        Grab,
    },
}
</script>

<style lang="scss" scoped>
.grab {
    display: flex;
    padding: 50px;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;

    &.mobile {
        padding: 25px 5px;
    }
}
</style>