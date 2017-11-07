<template>
    <header class="main">
        <router-link class="logo" to="/" exact>
            <img src="../../assets/img/logo.svg" alt="SCREENHOLE!">
        </router-link>

        <nav class="pages">
            <template v-if="$auth.check()">
                <router-link v-if="$auth.user()" :to="{ name: 'user-stream', params: {
                    username: $auth.user().username
                }}">
                    {{$auth.user().username}}
                </router-link>

                <router-link to="/settings">settings</router-link>
                <a href="/" @click.prevent="logout">log out</a>
            </template>
            <template v-if="! $auth.check()">
                <router-link to="/login">log in</router-link>
            </template>

            <a href="https://www.facebook.com/groups/screenhole" target="_blank">talk</a>
            <a href="/wtf">wtf?</a>
            <a href="https://twitter.com/screenhole">twitter</a>
            <a href="#" class="avatar"><img src="../../assets/img/default-avatar.png" alt=""></a>

            <div class="dropdown">
              <ul>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Edit Profile</a></li>
                <li><a href="#">Log Out</a></li>
              </ul>
            </div>

        </nav>
    </header>
</template>

<script>
export default {
    data () {
        return {
        };
    },

    methods: {
        logout: function() {
            this.$auth.logout({
                makeRequest: false,
                success: function () {
                },
                error: function () {
                },
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~resources";

.main {
    display: flex;
    justify-content: space-between;
    z-index: 10;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    padding: 20px;
    padding-top: 18px;
    border-bottom: 1px solid $grey-warm;

    .logo {
        display: flex;
    }

    .pages {
        display: flex;

        a {
            color: $purple;
            margin-left: 50px;
            text-decoration: none;
            margin-top: 3px;
            display: flex;

            &:hover {
              color: $bright-green;
            }
            &.router-link-active {
                color: white;
            }
        }

        .avatar img {
            width: 35px;
            height: 35px;
            margin-top: -9px;
            border-radius: 1000px;
        }

        .dropdown {
          position: absolute;
          top: 55px;
          right: 10px;
          background-color: $purple;
          border-radius: 5px;
          padding: 0;
          margin: 0;
          box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.75);

          &::after {
            content: '';
            position: absolute;
            top: -8px;
            right: 20px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 7.5px 10px 7.5px;
            border-color: transparent transparent $purple transparent;
          }

          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
            padding: 15px;
            text-align: right;

            li {
              display: block;

              a {
                opacity: 0.8;
                color: white;
                margin: 0;
                display: block;
                transition: all 0.2s ease;

                &:hover {
                  opacity: 1;
                  text-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45);
                  transform: translate(0,-1px);
                }
              }
            }

            li + li {
              margin-top: 1em;
            }
          }
        }
    }
}
</style>
