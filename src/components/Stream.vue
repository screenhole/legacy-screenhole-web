<template>
    <div class="stream">
        <div class="grab" v-for="grab in grabs" v-if="grabs && grabs.length">
            <div class="meta">
                <router-link v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                    username: grab.user.username,
                    grab_id: grab.id
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
const ActionCable = require('actioncable');

export default {
    data () {
        return {
            grabs: []
        };
    },
    mounted(){
        var self = this;

        this.cable = ActionCable.createConsumer(this.$http.defaults.baseURL.replace('http', 'ws') + '/cable');

        this.cable.subscriptions.create(
            "ShotsChannel",
            {
                received: function(data) {
                    self.grabs.unshift(data.shot);
                }
            }
        );

        this.$http.get("/shots").then((response) => {
            this.grabs = response.data;
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
    background-color: #212121;

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
