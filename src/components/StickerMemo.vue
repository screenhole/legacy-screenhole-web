<template>
    <div class="sticker" :style="{ left: sticker.meta.x + '%', top: sticker.meta.y + '%' }">
        <div class="art" ref="art"></div>
    </div>
</template>

<script>
export default {
    props: {
        'sticker': {
            type: Object,
            required: true,
        },
    },

    // methods: {
    // },

    mounted: function() {
        this.$lottie.loadAnimation({
            container: this.$refs.art,
            path: require('../assets/animation/stickers/' + this.sticker.meta.name + '.json'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        if (false) {
            // TODO: spawned animation
        } else {
            this.$anime.timeline().add({
                targets: this.$refs.art,
                scale: 1.3,
                duration: 0,
            })
            .add({
                targets: this.$refs.art,
                scale: 0.7,
                duration: 200,
            })
            .add({
                targets: this.$refs.art,
                scale: 1,
                duration: 500,
            });
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";

.sticker {
    position: absolute;
    width: 100px;
    height: 100px;
    touch-action: none;
    pointer-events: none;

    .art {
        position: relative;
        width: 100px;
        height: 100px;
    }
}
</style>
