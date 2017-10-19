<template>
    <section id="app">
        <page-header></page-header>

        <router-view/>

        <mr-hole></mr-hole>
    </section>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import MrHole from '@/components/layout/MrHole'

export default {
    name: 'app',

    components: {
        PageHeader,
        MrHole,
    }
}
</script>

<style lang="sass">
    // GLOBAL STYLES
    @import "~resources"

    @import "~normalize.css"

    *, *:after, *:before
        box-sizing: border-box;

    a
        text-decoration: none;

    html, body
        background-color: #191919;
        font-family: Poppins, sans-serif;
</style>
