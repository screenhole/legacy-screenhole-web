<template>
    <div id="app">
        <header>
            <img src="./assets/img/logo.svg" alt="SCREENHOLE!">
        </header>

        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" scoped>
header {
    z-index: 10;
    background-color: black;
    position: fixed;
    height: 60px;
    width: 100%;

    img {
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
