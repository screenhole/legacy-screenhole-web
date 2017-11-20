<template>
    <grab
        v-bind:key="grab.id"
        v-bind:grab="grab"
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

    mounted(){
        this.$http.get("/shots/" + this.$route.params.grab_id).then((response) => {
            this.grab = response.data.shot;
        });
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
}
</style>