<template>
    <div class="centeredForm">
        <form id="login" v-on:submit.prevent="edit">
            <h1>Edit User</h1>

            <input type="email" name="email" v-validate="'email'" placeholder="email" v-model="auth.email">
            <div class="error" v-if="errors.has('email')">{{ errors.first('email') }}</div>

            <input type="text" name="username" v-validate="" placeholder="username" v-model="auth.username">
            <div class="error" v-if="errors.has('username')">{{ errors.first('username') }}</div>

            <input type="password" name="password" v-validate="" placeholder="password" v-model="auth.password">
            <div class="error" v-if="errors.has('password')">{{ errors.first('password') }}</div>
            <div class="error" v-if="! errors.has('password') && ! (this.auth.password || this.auth.password_confirmation)">Leave blank to not change.</div>

            <input type="password" name="password_confirmation" v-validate="'confirmed:password'" placeholder="password (again)" v-model="auth.password_confirmation" data-vv-as="password" v-if="this.auth.password || this.auth.password_confirmation">
            <div class="error" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</div>

            <button type="submit">GO!</button>
        </form>

        <div v-if="terminal" v-bind:class="{ flash: terminal }">
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
                email: this.$auth.user().email,
                username: this.$auth.user().username,
                password: '',
                password_confirmation: '',
            },

            terminal: '',
        };
    },
    methods: {
        edit: function() {
            this.$validator.validateAll().then((valid) => {
                if (! valid) return;

                // clone, skipping nulls
                var data = { auth: {} }
                if (this.auth.email) data.auth.email = this.auth.email;
                if (this.auth.username) data.auth.username = this.auth.username;
                if (this.auth.password) data.auth.password = this.auth.password;
                if (this.auth.password_confirmation) data.auth.password_confirmation = this.auth.password_confirmation;

                this.$http.post("/users/current", data).then((response) => {
                    console.log('success', response);
                    this.$auth.user(response.data.user);
                    this.terminal = "Cool!";
                }, response => {
                    console.log('error', response);
                    this.terminal = "Could not save.";
                });
            });
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

    .error {
        padding: 10px 0 0 0;
        color: $grey-cool;
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

        &::placeholder {
            color: $grey-cool;
        }

        color: #fff;
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