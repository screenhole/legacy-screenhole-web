<template>
    <div class="centeredForm">
        <div id="login">
            <h1>Log in</h1>
            <input type="text" v-model="username">
            <button class="submit" v-on:click="getUserToken">GO!</button>

            <div v-bind:class="{ flash: terminal }">
                <pre>{{terminal}}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    mounted (){

    }
}
</script>

<style lang="scss" scoped>
.centeredForm {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        color: white;
        margin-bottom: 25px;
        font-weight: bold;
    }

    input {
        width: 300px;
        display: block;
        height: 50px;
        padding: 0;
        border: 0;
        // border-bottom: 2px solid $grey-cool;
        background-color: transparent;
        transition: all 0.2s ease;
        &:focus {
            color: white;
            border-color: white;
            outline: none;
        }
    }

    .submit {
        width: 300px;
        height: 50px;
        margin-top: 25px;
        padding: 0;
        border: 0;
        background: center no-repeat transparent url("../assets/img/form-button.svg");
        background-size: 300px 50px;
        // color: $purple;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.2s ease;

        &:active {
            transform: scale(0.95) translate(0, 2px);
            outline: none;
        }

        &:focus {
            outline: none;
        }
    }

    @keyframes slideup {
        from {bottom: -200px;}
        to {bottom: 0;}
    }

    @keyframes slidedown {
        from {bottom: 0;}
        to {bottom: -200px;}
    }

    .flash {
        color: white;
        position: fixed;
        width: 100%;
        padding: 25px;
        bottom: 0;
        left: 0;
        // background-color: $purple;
        animation-name: slideup;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
    }


    #login {
        width: 300px;
        padding-bottom: 20vh; // offset height for optics
    }
}
</style>