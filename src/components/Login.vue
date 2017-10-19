<template>
    <div class="centeredForm">
        <form id="login" v-on:submit.prevent="submitLogin">
            <h1>Log in</h1>

            <input type="text" placeholder="mr-hole" v-model="username">
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
            username: '',
            jwt: '',
            terminal: '',
        };
    },
    methods: {
        submitLogin: function() {
            if (! this.username) {
                return;
            }

            this.$http.post("/user_token", {
                auth: {
                    username: this.username,
                    password: "football",
                }
            }).then((response) => {
                // success, show JWT
                this.jwt = response.data.jwt;
                this.showTerminalJWT();
            }, response => {
                // error. try registering
                this.$http.post("/users", {
                    auth: {
                        username: this.username,
                        password: "football",
                    }
                }).then((response) => {
                    // register succes. try getting token again.

                    this.$http.post("/user_token", {
                        auth: {
                            username: this.username,
                            password: "football",
                        }
                    }).then((response) => {
                        // success, show JWT
                        this.jwt = response.data.jwt;
                        this.showTerminalJWT();
                    }, response => {
                        // failure. show the error.
                        this.terminal = 'oops, ' + this.username + '. bad login.';
                    });
                }, response => {
                    // register failure. show the error.
                    this.terminal = 'oops, ' + this.username + '. bad login.';
                });
            });
        },
        showTerminalJWT: function () {
            this.terminal = 'defaults write com.thinko.screenhole.macos "jwt" "' + this.jwt + '"';
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