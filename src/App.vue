<template>
    <div id="app">
        <header>
            <img src="./assets/img/logo.svg" alt="SCREENHOLE!" class="logo">
        </header>

        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
    html, body {
        background-color: #191919;
        font-family: 'Poppins', sans-serif;
    }
</style>

<style lang="scss" scoped>
header {
    z-index: 10;
    background-color: black;
    position: fixed;
    height: 60px;
    width: 100%;

    .logo {
        margin-top: 20px;
        margin-left: 20px;
    }

    .login {
        color: white;
        margin-left: 50px;
        text-decoration: none;
        display: inline-block;
        position: relative;
        top: -5px;
    }
}

</style>
