<template>
    <section id="app">
        <header>
            <a href="/"><img src="./assets/img/logo.svg" alt="SCREENHOLE!" class="logo"></a>
        </header>

        <router-view/>

        <img id="mr-hole" src="./assets/img/mr-hole.svg" alt="MR. HOLE">
    </section>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
    // set up bulma
    // http://bulma.io/documentation/overview/customize/
    @import '~bulma/sass/utilities/initial-variables';

    $family-sans-serif: "Poppins"

    @import '~bulma';

    html, body
        background-color: #191919;
</style>

<style lang="scss">
    #mr-hole {
        position: fixed;
        bottom: 0;
        right: 25px;
        width: 150px;
        display: block;
    }
</style

<style lang="scss" scoped>
header {
    z-index: 10;
    background-color: #000;
    position: fixed;
    height: 60px;
    width: 100%;

    .logo {
        margin-top: 20px;
        margin-left: 20px;
    }

    .login {
        color: #fff;
        margin-left: 50px;
        text-decoration: none;
        display: inline-block;
        position: relative;
        top: -5px;
    }
}
</style>
