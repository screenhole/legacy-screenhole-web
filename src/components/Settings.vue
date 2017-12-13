<template>
    <div class="form centered">
        <form class="center" v-on:submit.prevent="submit">
            <h1 class="title">Edit User</h1>

            <input class="input" type="email" name="email" v-validate="'email'" placeholder="email" v-model="auth.email">
            <div class="error" v-if="errors.has('email')">{{ errors.first('email') }}</div>

            <input class="input" type="text" name="username" autocorrect="off" autocapitalize="none" v-validate="" placeholder="username" v-model="auth.username">
            <div class="error" v-if="errors.has('username')">{{ errors.first('username') }}</div>

            <input class="input" type="text" name="name" placeholder="name" v-model="auth.name">
            <div class="error" v-if="errors.has('name')">{{ errors.first('name') }}</div>

            <input class="input" type="text" name="bio" placeholder="bio" v-model="auth.bio">
            <div class="error" v-if="errors.has('bio')">{{ errors.first('bio') }}</div>

            <input class="input" type="password" name="password" autocorrect="off" autocapitalize="none" v-validate="" placeholder="new password" v-model="auth.password">
            <div class="error" v-if="errors.has('password')">{{ errors.first('password') }}</div>
            <div class="error" v-if="! errors.has('password') && ! (this.auth.password || this.auth.password_confirmation)">Leave blank to not change.</div>

            <input class="input" type="password" name="password_confirmation" autocorrect="off" autocapitalize="none" v-validate="'confirmed:password'" placeholder="new password (again)" v-model="auth.password_confirmation" data-vv-as="password" v-if="this.auth.password || this.auth.password_confirmation">
            <div class="error" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</div>

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
                name: this.$auth.user().name,
                bio: this.$auth.user().bio,
                email: this.$auth.user().email,
                username: this.$auth.user().username,
                password: '',
                password_confirmation: '',
            },

            terminal: '',
        };
    },
    methods: {
        submit: function() {
            this.$validator.validateAll().then((valid) => {
                if (! valid) return;

                // clone, skipping nulls
                var data = { auth: {} }
                if (this.auth.name) data.auth.name = this.auth.name;
                if (this.auth.bio) data.auth.bio = this.auth.bio;
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
