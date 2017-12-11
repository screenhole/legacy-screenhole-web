<template>

  <div class="main">

    <div class="profile" v-bind:class="{'mobile': $mq.mobile}">
      <avatar :user="user" class="avatar"></avatar>

      <div class="info">
        <h1>Pasquale D'Silva</h1>
        <h2 class="username">@pasquale</h2>

        <section class="bio">
          <p>Working on <a href="#">screenhole</a> &amp; other projects at <a href="#">Thinko</a></p>

          <p><a href="#">@pasql</a> on twitter.</p>
        </section>

      </div>

      <div class="stats" v-bind:class="{'mobile': $mq.mobile}">
        <span class="number">203</span>
        <span class="numberLabel">Grabs</span>
      </div>

    </div>

    <div class="stream" v-bind:class="{'mobile': $mq.mobile}">
      <grab
      v-for="(grab, index) in grabs"
      v-bind:key="grab.id"
      v-bind:grab="grab"
      v-on:remove="grabs.splice(index, 1)"
      />

      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <div slot="spinner">
          <div id="loader"></div>
        </div>
        <p slot="no-more">fin</p>
        <p slot="no-results"></p>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import ActionCable from 'actioncable';

import Grab from '@/components/Grab';
import Avatar from '@/components/Avatar';

export default {
    data () {
        return {
            user: '',
            page: 1,
            grabs: [],
        };
    },

    methods: {
        infiniteHandler($state) {
            // load user, if first pass
            if (! this.user) {
                this.$http.get("/users/" + this.$route.params.username).then((response) => {
                    this.user = response.data.user;
                    $state.loaded();
                }).catch((response) => {
                    console.log('api error', response)
                    this.$router.push('/');
                });
                return;
            }

            // start pagination loop
            this.$http.get("/users/" + this.user.id + "/shots", {
                params: {
                    page: this.page,
                }
            }).then((response) => {
                var data = response.data;

                this.grabs = this.grabs.concat(data.shots);

                if (data.meta.next_page) {
                    this.page = data.meta.next_page;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
    },

    beforeRouteUpdate(to, from, next) {
        // blow away old data
        this.user = '';
        this.page = 1;
        this.grabs = [];

        // fetch the new user
        this.$http.get("/users/" + to.params.username).then((response) => {
            // store user, refresh infinite loader
            this.user = response.data.user;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            next();
        }).catch((err) => {
            this.$router.push('/');
        });
    },

    created(){
        // not rerun when going between same components

        this.$cable.subscriptions.create(
            "ShotsChannel",
            {
                received: (data) => {
                    if (data.shot.user.id == this.user.id) {
                        this.grabs.unshift(data.shot);
                    }
                }
            }
        );
    },

    components: {
        InfiniteLoading,
        Avatar,

        Grab,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";
.main {
  clear: both;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100%;

  .profile {
    padding: 50px;
    border-bottom: 1px solid $grey-warm;

    // background-color: red;
    display: flex;
    justify-content: center;
    &.mobile {
      padding: 50px 5px;
    }
    .avatar {
      display: inline-block;
      float: left;
      width: 100px;
      height: 100px;
      margin-right: 25px;
    }

    .info {
      width: 50%;
      h1 {
        font-size: 30px;
        color: white;
        display: block;
        line-height: 30px;
        margin: 10px 0;
      }

      .username {
        margin: 0;
        color: $grey-warm;
        font-weight: normal;
      }

      .bio {
        max-width: 500px;
        // background-color: red;
        color:#868091;

        a {
          color: $purple;
        }
      }
    }

    .stats {
      width: 50%;
      background-color: blue;
      display: flex;
      align-items: flex-start;
      &.mobile {
        // margin-left: 100px;
      }

      .number {

        color: white;
        font-size: 50px;
        display: block;
        clear: both;
        text-align: center;

      }
      .numberLabel {
        color: $grey-warm;
        text-transform: uppercase;
        font-size: 20px;
        text-align: center;
        display: block;
      }
    }

  }

}

.stream {
    display: flex;
    padding: 50px 50px 100px 50px;
    justify-content: center;
    flex-direction: column;
    min-height: 100%;

    &.mobile {
        padding: 25px 5px 100px 5px;
    }
}
</style>
