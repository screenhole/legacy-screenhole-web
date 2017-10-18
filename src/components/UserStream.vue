<template>
    <div class="stream">
        <div class="grab" v-for="grab in grabs" v-if="grabs && grabs.length">
            <div class="meta">
                <router-link v-if="grab.user" :to="{ name: 'user-stream', params: {
                    username: grab.user.username
                }}">
                    {{grab.user.username}}
                </router-link>
            </div>
            <div class="content">
                <router-link v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                    username: grab.user.username,
                    grab_id: grab.id
                }}">
                  <img :src="grab.image_public_url" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: '',
            grabs: [],
        };
    },
    mounted(){
        var self = this;

        this.$http.get("/users/" + this.$route.params.username).then((response) => {
            self.user = response.data.user;

            this.$http.get("/users/" + self.user.id + "/shots").then((response) => {
                this.grabs = response.data.shots;
            });
        });
    }
}
</script>

<style lang="scss" scoped>
.stream {
    display: flex;
    padding: 150px 100px 100px 0;
    justify-content: center;
    flex-direction: column;

    .grab {
        display: flex;
        justify-content: center;
        flex-direction: row;
        padding-bottom: 100px;

        .meta {
            width: 175px;
            padding-right: 25px;
            color: #00dc76;
            text-align: right;
            flex-shrink: 0;

            a {
                color: inherit;
            }
        }

        .content {
            max-width: 1000px;
            flex-grow: 1;
        }

        img {
            display: inline-block;
            max-width: 100%;
            border-radius: 3px;
            box-shadow: 0px 0px 50px rgba(0,0,0,0.8);
        }
    }
}
</style>