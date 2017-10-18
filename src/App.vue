<template>
    <section id="app">
        <page-header></page-header>

        <router-view/>

        <img id="mr-hole" src="./assets/img/mr-hole.svg" alt="MR. HOLE">
    </section>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
    name: 'app',
    components: {
        PageHeader
    }
}
</script>

<style lang="sass">
    // @import "~resources"

    @import "~normalize.css"
    @import "~milligram"

    html, body
        background-color: #191919;
        font-family: Poppins, sans-serif;
</style>

<style lang="scss">
    #mr-hole {
        position: fixed;
        bottom: 0;
        right: 25px;
        width: 150px;
        display: block;
    }
</style>
