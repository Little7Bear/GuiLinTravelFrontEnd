<template>
  <div class="home">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <h1>HelloWorld</h1>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Home',
    components: {}
  }

</script>

<style lang="scss" scoped>
  .home {
    .logo {
      width: 300px;
    }
  }

</style>
