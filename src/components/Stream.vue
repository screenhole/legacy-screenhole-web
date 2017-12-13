<template>
    <div class="stream" v-bind:class="{'mobile': $mq.mobile}" v-shortkey="{up: ['k'], down: ['j']}" @shortkey="setCurrent">
        <grab
            v-for="(grab, index) in grabs"
            v-bind:key="grab.id"
            v-bind:grab="grab"
            v-on:remove="grabs.splice(index, 1)"
        />

        <infinite-loading @infinite="infiniteHandler">
            <div slot="spinner">
                <div id="loader"></div>
            </div>
            <p slot="no-more">fin</p>
            <p slot="no-results"></p>
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

import Grab from '@/components/Grab';

export default {
    data () {
        return {
            current: null,
            page: 1,
            grabs: []
        };
    },

    methods: {
        setCurrent(event) {
            this.getCurrent();

            var pos = this.$parent.$refs.middleColumn.scrollTop;

            switch (event.srcKey) {
                case 'up':
                    if (this.current.previousElementSibling) {
                        pos = this.current.previousElementSibling.offsetTop || 0;
                    }

                    break;
                case 'down':
                    if (this.current.nextElementSibling) {
                        pos = this.current.nextElementSibling.offsetTop || 0;
                    }

                    break;
            }

            // this.$parent.$refs.middleColumn.scrollTop = pos;

            this.$anime({
                targets: this.$parent.$refs.middleColumn,
                scrollTop: pos,
                duration: 300,
                easing: 'easeOutQuad'
            });
        },

        getCurrent() {
            var els = this.$el.querySelectorAll(".grab");
            var current, top, min = Number.MAX_VALUE;

            for (var i=0; i < els.length; i++) {
                top = Math.abs(els[i].getBoundingClientRect().top);
                if (top < min) {
                    min = top;
                    current = els[i];
                }
            }

            if (current) {
                this.current = current;
            }
        },

        infiniteHandler($state) {
            this.$http.get("/shots", {
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

    mounted(){
        this.$cable.subscriptions.create(
            "ShotsChannel",
            {
                received: (data) => {
                    this.grabs.unshift(data.shot);
                }
            }
        );
    },

    components: {
        InfiniteLoading,

        Grab,
    },
}
</script>

<style lang="scss" scoped>
@import "~resources";

.stream {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    display: flex;
    min-height: 100%;
    padding: 50px 50px 100px 50px;
    justify-content: center;
    flex-direction: column;

    &.mobile {
        padding: 25px 5px 100px 5px;
    }
}
</style>
