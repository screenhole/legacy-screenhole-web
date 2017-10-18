<template>
    <section id="app">
        <header class="main">
            <router-link class="logo" to="/" exact><img src="./assets/img/logo.svg" alt="SCREENHOLE!"></router-link>

            <nav class="pages">
                <router-link to="/login">log in</router-link>
                <a href="https://www.facebook.com/groups/screenhole" target="_blank">talk</a>
                <a href="https://screenhole.net/pasquale/~9B5spw">wtf?</a>
                <a href="https://twitter.com/screenhole">twitter</a>
            </nav>
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
    @import "~resources"

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

<style lang="scss">
header.main {
    display: flex;
    justify-content: space-between;
    z-index: 10;
    background-color: #000;
    position: fixed;
    height: 60px;
    width: 100%;
    padding: 20px;
    padding-top: 18px;

    .logo {
        display: flex;
    }

    nav.pages {
        display: flex;

        a {
            color: #6A40EE; // todo: $purple variable
            // font-weight: bold;
            margin-left: 50px;
            text-decoration: none;
            display: flex;

            &:hover {
              color: #3ae06e; // todo: $bright-green
            }
            &.router-link-active {
                color: white;
            }
        }
    }
}
</style>
