<template>
    <div class="form centered">
        <form v-on:submit.prevent="submit">
            <h1 class="title">Register</h1>

            <input class="input" type="email" name="email" v-validate="'required|email'" placeholder="email" v-model="auth.email">
            <div class="error" v-if="errors.has('email')">{{ errors.first('email') }}</div>

            <input class="input" type="text" name="username" v-validate="'required'" placeholder="username" v-model="auth.username">
            <div class="error" v-if="errors.has('username')">{{ errors.first('username') }}</div>

            <input class="input" type="password" name="password" v-validate="'required'" placeholder="password" v-model="auth.password">
            <div class="error" v-if="errors.has('password')">{{ errors.first('password') }}</div>

            <input class="input" type="input" name="code" v-validate="'required'" placeholder="invite code" v-model="auth.code">
            <div class="error" v-if="errors.has('code')">{{ errors.first('code') }}</div>

            <button class="button" type="submit">GO!</button>
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
                email: '',
                username: '',
                password: '',
                code: '',
            },

            jwt: '',
            terminal: '',
        };
    },
    methods: {
        submit: function() {
            this.$validator.validateAll().then((valid) => {
                if (! valid) return;

                this.$auth.register({
                    data: { auth: this.auth },
                    autoLogin: true,
                    rememberMe: true,
                    success: function (response) {
                        console.log('success', response);
                        this.jwt = response.data.jwt;
                        this.showTerminalJWT();
                    },
                    error: function (response) {
                        console.log('error', response);
                        this.terminal = "Could not register.";
                    }
                });
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
