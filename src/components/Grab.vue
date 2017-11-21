<template>
    <div class="grab">
        <div class="content">
            <div class="meta">
                <router-link  class="permalink" v-if="grab.user" :to="{ name: 'user-stream', params: {
                    username: grab.user.username
                    }}">
                    <avatar :user="grab.user"></avatar>
                    <span class="user">{{grab.user.username}}</span>
                </router-link>
            </div>
            <router-link v-if="grab.user" :to="{ name: 'grab-permalink', params: {
                username: grab.user.username,
                grab_id: grab.id
            }}">
              <img :src="grab.image_public_url" />
              <div class="shadow"></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar';

export default {
    props: [ 'grab' ],

    components: {
        Avatar,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";
.grab {
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 50px 0;

    .content {
        max-width: 1200px;
        flex-grow: 1;
        position: relative;

        .permalink {
            &:hover {
                .user {
                    color: $purple;
                    background-color: white;

                    &:after {
                        border-color: transparent white transparent transparent;
                    }
                }
            }
        }
        .meta {
            margin-bottom: 10px;
            border-radius: 1000px;
            display: inline-block;

            .avatar {
                display: inline-block;
                margin: 0;
                float: left;
            }

            .user {
                background-color: $purple;
                padding: 5px 10px;
                border-radius: 100px;
                display: inline-block;
                margin-top: 5px;
                margin-left: 10px;
                color: white;
                transition: all 0.2s ease;
                float: left;

                &:after {
                    content: '';
                    position: absolute;
                    top: 14px;
                    left: 38px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 5px 10px 5px 0;
                    border-color: transparent $purple transparent transparent;
                    transition: all 0.2s ease;
                }
                &:hover {
                    color: $purple;
                    background-color: white;

                    &:after {
                        border-color: transparent white transparent transparent;
                    }
                }
            }

        }

    }

    img {
        clear: both;
        display: block;
        max-width: 100%;
        border-radius: 5px;
        transition: all 0.1s ease;
        max-height: 80vh;
        border: 1px solid rgba(255,255,255,0.1);

        &:hover {
            // border: 1px solid $purple;
            box-shadow: 0px 0px 0px 5px $purple;
        }

    }
}
</style>
