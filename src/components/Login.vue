<template>
    <div class="centeredForm">
        <form class="login" v-on:submit.prevent="submitLogin">
            <h1>Login</h1>

            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <input class="input" type="text" placeholder="mr-hole" v-model="username">
                </div>
            </div>
            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <button class="button">Login</button>
                </div>
            </div>
        </form>

        <div v-if="terminal" v-bind:class="{ flash: terminal }">
            <pre>{{terminal}}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            jwt: '',
            terminal: '',
        };
    },
    methods: {
        submitLogin: function() {
            this.showTerminal();
        },
        showTerminal: function () {
            this.jwt = 'aaaa.bbbb.cccc';
            this.terminal = 'defaults write com.thinko.screenhole.macos "jwt" "' + this.jwt + '"';
        },
    }
}
</script>

<style lang="sass">
#mr-hole
    display: none;
</style>

<style lang="scss" scoped>
@import "~resources";

.centeredForm {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        color: white;
        margin-bottom: 25px;
        font-size: 50px;
        font-weight: bold;
    }

    // input {
    //     width: 300px;
    //     display: block;
    //     height: 50px;
    //     padding: 0;
    //     border: 0;
    //     border-bottom: 2px solid $grey-cool;
    //     background-color: transparent;
    //     transition: all 0.2s ease;
    //     &:focus {
    //         color: #fff;
    //         border-color: #fff;
    //         outline: none;
    //     }
    // }

    .submit {
        width: 300px;
        height: 50px;
        margin-top: 25px;
        padding: 0;
        border: 0;
        background: center no-repeat transparent url("../assets/img/form-button.svg");
        background-size: 300px 50px;
        color: $purple;
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

    .flash, .flash pre {
        color: #fff;
        position: fixed;
        width: 100%;
        padding: 25px;
        bottom: 0;
        left: 0;
        background-color: $purple;
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