<template>
    <div class="form centered">
        <form class="center" v-on:submit.prevent="submit">
            <h1 class="title">Log in</h1>

            <input class="input" type="text" name="username" v-validate="'required'" placeholder="username" v-model="auth.username">
            <div class="error" v-if="errors.has('username')">{{ errors.first('username') }}</div>

            <input class="input" type="password" name="password" v-validate="'required'" placeholder="password" v-model="auth.password">
            <div class="error" v-if="errors.has('password')">{{ errors.first('password') }}</div>

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
                username: '',
                password: '',
            },

            jwt: '',
            terminal: '',
        };
    },
    methods: {
        submit: function() {
            this.$validator.validateAll().then((valid) => {
                if (! valid) return;

                this.$auth.login({
                    data: { auth: this.auth },
                    rememberMe: true,
                    success: function (response) {
                        console.log('success', response);
                        this.jwt = response.data.jwt;
                        this.showTerminalJWT();
                    },
                    error: function (response) {
                        this.terminal = "Invalid login. Try again.";
                    }
                });
            });
        },
        showTerminalJWT: function () {
            window.location = 'screenhole:///jwt/' + this.jwt;
            this.terminal = 'defaults write com.thinko.screenhole.macos "jwt" "' + this.jwt + '"';
        },
    }
}
</script>
