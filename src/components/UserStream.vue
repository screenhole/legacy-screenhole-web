<template>

  <div class="main">

    <div class="profile" v-bind:class="{'mobile': $mq.mobile}">


      <div class="left">
        <avatar :size="500" :user="user" class="avatar"></avatar>

        <div class="text">
          <h1>{{user.name || user.username}}</h1>
          <h2 class="username">@{{user.username}}</h2>

        </div>

      </div>

      <div class="right" v-bind:class="{'mobile': $mq.mobile}">

        <section class="stat">
          <span class="number">{{stats.grabs}}</span>
          <span class="numberLabel">Grabs</span>
        </section>
      </div>

    </div>

    <div class="profileFooter" v-bind:class="{'mobile': $mq.mobile}">
        <section class="bio" v-if="user.bio">
            {{user.bio}}
        </section>

        <!-- <section class="profileControls" v-if="$auth.check() && $auth.user().username == user.username">
            <router-link to="/settings">Edit Profile</router-link>
        </section> -->
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
            stats: {}
        };
    },

    methods: {
        infiniteHandler($state) {
            // load user, if first pass
            if (! this.user) {
                this.$http.get("/users/" + this.$route.params.username).then((response) => {
                    this.user = response.data.user;
                    this.stats = this.user.stats;
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
        this.stats = {};

        // fetch the new user
        this.$http.get("/users/" + to.params.username).then((response) => {
            // store user, refresh infinite loader
            this.user = response.data.user;
            this.stats = this.user.stats;
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
    background-color: pink;
    padding: 50px 50px 0 50px;
    border-bottom: 1px solid $grey-warm;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    &.mobile {
      padding: 50px 10px 0 10px;

      .avatar {
        min-width: 60px;
        height: 60px;
      }

    }

    .avatar {
      display: block;
      min-width: 100px;
      height: 100px;
      margin-right: 25px;
    }

    .left {
    background-color: green;
      flex-grow: 2;
      max-width: 800px;
      display: flex;

      .text {
        padding-right: 25px;
        display: block;

        h1 {
          font-size: 30px;
          color: white;
          display: block;
          line-height: 30px;
          margin: 10px 0;
        }

        .profileControls {
            margin: 10px 0;
            font-size: 14px;
            text-transform: uppercase;

            a {
                color: $purple;
            }
        }

        .username {
          margin: 0;
          color: $grey-warm;
          font-weight: normal;
        }

      }
    }

    .right {
      background-color: yellow;
      flex-grow: 1;
      max-width: 400px;
      display: flex;
      align-items: flex-start;
      flex-direction: row-reverse;

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

  .profileFooter {
      display: flex;
      background-color: red;
      justify-content: center;
      align-items: flex-start;

      &.mobile {
        .bio {
          margin-top: 10px;
          padding-right: 10px;
          padding-left: 10px;
        }
      }
      .bio {
        background-color: orange;
          flex-grow: 1;
          max-width: 1200px;
          display: flex;
          padding-left: 130px;
          padding-right: 50px;
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
