<template>
    <div class="mr-hole offscreen">
        <div ref="character" class="character">
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/event-bus.js';

export default {
    data () {
        return {
        };
    },

    mounted: function(){
        if (this.$refs.character) {
            this.character = this.$lottie.loadAnimation({
                container: this.$refs.character,
                path: require('../../assets/animation/mr-hole/idle.json'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: "character",
            });
        }
    },

    methods: {
        jump() {
            EventBus.$emit('scrollToTop');
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~resources";

.mr-hole {
    position: fixed;
    bottom: -50px;
    right: -50px;
    z-index: $z-layer-MrHole;
    pointer-events: none;

    transition: all 0.3s ease;

    .character {
        width: 200px;
    }

    &.offscreen {
        transform: translateY(100px);
    }
}
</style>
