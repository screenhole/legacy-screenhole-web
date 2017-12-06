<template>
    <div class="audioPlayer">
        <button class="button play" @click="togglePlayback" v-if="! playing "></button>
        <button class="button stop" @click="stop" v-if="playing "></button>
    </div>
</template>

<script>
    import VueHowler from 'vue-howler'

    export default {
        mixins: [ VueHowler ]
    }
</script>

<style lang="scss" scoped>
@import "~resources";

.button {
    display: inline-block;
    background: black;
    border-radius: 1000px;
    border: none;

    width: 100%;
    height: 100%;

    color: white;

    &:focus {
        outline: none;
    }

    &.play {
        background: center no-repeat black url('../assets/img/player-button-play.svg');
    }

    &.stop {
        background: center no-repeat black url('../assets/img/player-button-pause.svg');
    }
}

</style>
