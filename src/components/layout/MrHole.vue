<template>
    <div class="mr-hole">
        <div class="bubble">
            <span>Cram some 'shots in my hole!</span>
        </div>
        <img class="cutie" src="../../assets/img/mr-hole.svg" alt="MR. HOLE">
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

.mr-hole {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: $z-layer-MrHole;

    .cutie {
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
        box-shadow: 0px 3px 31px -8px rgba(0,0,0,0.75);

        a {
            color: $purple;
            text-decoration: underline;
            transition: all 0.2s;
            display: inline-block;

            &:hover {
                transform: translateY(-2px);
                text-decoration: none;
                color: #f438be;
            }
        }

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
}
</style>
