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

    metaInfo () {
        return {
            meta: [
                // Twitter
                { name: 'twitter:image', content: this.grab.image_public_url },
                // Facebook / Open Graph
                { name: 'og:image', content: this.grab.image_public_url },
            ],
        }
    },

    mounted(){
        this.$http.get("/shots/" + this.$route.params.grab_id).then((response) => {
            this.grab = response.data.shot;

            // refresh the data in data head
            this.$emit('updateHead');
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