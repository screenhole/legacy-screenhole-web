<template>
    <div class="sticker" :style="{ left: sticker.x + '%', top: sticker.y + '%' }">
        <div class="handle"></div>
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
            path: require('../assets/animation/stickers/chuckle.json'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            name: "stickerChuckle",
        });
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
