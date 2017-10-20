<template>
    <div class="centeredForm">
        <form id="login" v-on:submit.prevent="register">
            <h1>Register</h1>

            <input type="email" placeholder="email" v-model="auth.email">
            <input type="text" placeholder="username" v-model="auth.username">
            <input type="password" placeholder="password" v-model="auth.password">

            <button type="submit">GO!</button>
        </form>

        <div v-if="terminal" v-bind:class="{ flash: terminal }" v-clipboard:copy="terminal">
            <pre>{{terminal}}</pre>
        </div>
    </div>
</template>

<script>
// TODO: hide mr hole
export default {
    data () {
        return {
            auth: {
                email: '',
                username: '',
                password: '',
            },

            jwt: '',
            terminal: '',
        };
    },
    methods: {
        register: function() {
            if (! this.auth.email || ! this.auth.username || ! this.auth.password) {
                return;
            }

            this.$auth.register({
                data: { auth: this.auth },
                autoLogin: true,
                rememberMe: true,
                success: function (response) {
                    console.log('success ' + this.context);
                    this.jwt = response.data.jwt;
                    this.showTerminalJWT();
                },
                error: function (response) {
                    console.log('error ' + this.context);
                    this.terminal = res.data;
                }
            });
        },
        showTerminalJWT: function () {
            if (this.jwt) {
                window.location = 'screenhole:///jwt/' + this.jwt;
                this.terminal = 'defaults write com.thinko.screenhole.macos "jwt" "' + this.jwt + '"';
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~resources";

.centeredForm {
    position: absolute;
    top: 0;
    left: 0;
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

    input {
        width: 300px;
        display: block;
        height: 50px;
        padding: 0;
        font-size: 25px;
        border: 0;
        border-bottom: 2px solid $grey-cool;
        background-color: transparent;
        transition: all 0.2s ease;

        &, &::placeholder {
            color: $grey-cool;
        }

        &:focus {
            color: #fff;
            border-color: #fff;
            outline: none;
        }
    }

    button {
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
        margin: 0;
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