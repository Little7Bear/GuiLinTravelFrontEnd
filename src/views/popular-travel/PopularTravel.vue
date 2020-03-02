<template>
  <div class='popular-travel'>
    <TravelCard  v-for="(item, index) in cards" :key="index"/>
  </div>
</template>

<script>
import TravelCard from './TravelCard'

export default {
  components: {
    TravelCard
  },

  data () {
    return {
      cards: [20]
    }
  },

  methods: {

  }
}

</script>

<style lang='scss' scoped>
  // .popular-travel {

  // }

</style>
