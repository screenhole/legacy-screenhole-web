<template>
    <div>
        <div class="bubble">
            <span>Cram screenshots into my hole!</span>
        </div>
        <img id="mr-hole" src="../../assets/img/mr-hole.svg" alt="MR. HOLE">
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
}
</script>

<style lang="scss" scoped>
    @import "~resources";
    #mr-hole {
        position: fixed;
        bottom: 10px;
        right: 25px;
        width: 100px;
        display: block;
        transition: all 0.2s;
    }
    .bubble {
        position: fixed;
        bottom: 90px;
        right: 25px;
        max-width: 250px;
        padding: 15px;
        border-radius: 5px;
        background-color: $bright-green;
        font-size: 80%;
        line-height: 150%;

        &:after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: -6px;
            right: 50px;
            border-style: solid;
            border-width: 10px 5px 0 5px;
            border-color: $bright-green transparent transparent transparent;
        }
    }


</style>
