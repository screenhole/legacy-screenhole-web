<template>
    <div class="stream">
        <div class="grab" v-for="grab in grabs">
            <div class="meta">
                {{grab.user.username}}
            </div>
            <div class="content">
                <img :src="grab.image_public_url" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            grabs: []
        };
    },
    mounted (){
        this.grabs = [
            {
                "id": 1,
                "created_at": "2017-10-10T19:50:54.472Z",
                "image_public_url": "https:\/\/screenhole-staging.s3.amazonaws.com\/1507665054.png",
                "user": {
                    "id": 1,
                    "username": "jacob",
                    "created_at": "2017-10-10T19:48:45.758Z"
                }
            },
            {
                "id": 2,
                "created_at": "2017-10-10T19:56:56.869Z",
                "image_public_url": "https:\/\/screenhole-staging.s3.amazonaws.com\/1507665416.png",
                "user": {
                    "id": 1,
                    "username": "jacob",
                    "created_at": "2017-10-10T19:48:45.758Z"
                }
            },
            {
                "id": 3,
                "created_at": "2017-10-10T19:57:00.757Z",
                "image_public_url": "https:\/\/screenhole-staging.s3.amazonaws.com\/1507665420.png",
                "user": {
                    "id": 1,
                    "username": "jacob",
                    "created_at": "2017-10-10T19:48:45.758Z"
                }
            }
        ];

        // this.$http.get(API_BASE + "/shots").then((response) => {
        //     this.shots = response.body;
        // });
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